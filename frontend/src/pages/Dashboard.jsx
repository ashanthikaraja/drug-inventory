import React, { useState, useEffect } from 'react';
import { Typography, Box, Grid, Card, CardContent, CircularProgress } from '@mui/material';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import orderService from '../api/orderService';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalDrugs: 0,
    activeOrders: 0,
    suppliers: 0
  });
  const [orderData, setOrderData] = useState([]);
  const [inventoryStatus, setInventoryStatus] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch orders
        const ordersResponse = await orderService.getAllOrders();
        const orders = ordersResponse.results || ordersResponse;
        
        // Get stats
        const activeOrders = orders.filter(order => order.status !== 'Delivered' && order.status !== 'Cancelled').length;
        
        // Simulate API calls for other data (replace with actual API calls)
        const drugsResponse = await fetch('/api/drugs/').then(res => res.json()).catch(() => ({ count: 150 }));
        const suppliersResponse = await fetch('/api/suppliers/').then(res => res.json()).catch(() => ({ count: 10 }));
        
        setStats({
          totalDrugs: drugsResponse.count || 150,
          activeOrders: activeOrders,
          suppliers: suppliersResponse.count || 10
        });
        
        // Process order data for monthly trend
        const monthlyData = processMonthlyOrderData(orders);
        setOrderData(monthlyData);
        
        // Simulate inventory status data (replace with actual data)
        setInventoryStatus([
          { name: 'In Stock', value: 120 },
          { name: 'Low Stock', value: 20 },
          { name: 'Out of Stock', value: 10 }
        ]);
        
        // Recent activity
        const recent = orders
          .sort((a, b) => new Date(b.ordered_at) - new Date(a.ordered_at))
          .slice(0, 5)
          .map(order => ({
            id: order.id,
            date: new Date(order.ordered_at).toLocaleDateString(),
            status: order.status,
            value: order.total_cost
          }));
        setRecentActivity(recent);
        
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);
  
  // Helper function to process order data by month
  const processMonthlyOrderData = (orders) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentDate = new Date();
    const monthlyData = [];
    
    // Create last 6 months of data
    for (let i = 5; i >= 0; i--) {
      const month = new Date(currentDate);
      month.setMonth(currentDate.getMonth() - i);
      const monthName = months[month.getMonth()];
      
      const ordersInMonth = orders.filter(order => {
        const orderDate = new Date(order.ordered_at);
        return orderDate.getMonth() === month.getMonth() && 
               orderDate.getFullYear() === month.getFullYear();
      });
      
      monthlyData.push({
        name: monthName,
        orders: ordersInMonth.length,
        value: ordersInMonth.reduce((sum, order) => sum + (parseFloat(order.total_cost) || 0), 0)
      });
    }
    
    return monthlyData;
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
        Pharmacy Inventory Dashboard
      </Typography>
      
      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ borderRadius: 2, boxShadow: 3, bgcolor: '#f5f9ff' }}>
            <CardContent>
              <Typography variant="h6" color="textSecondary">Total Drugs</Typography>
              <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#0059b3' }}>{stats.totalDrugs}</Typography>
              <Typography variant="body2" color="textSecondary">items in inventory</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ borderRadius: 2, boxShadow: 3, bgcolor: '#f5fff7' }}>
            <CardContent>
              <Typography variant="h6" color="textSecondary">Active Orders</Typography>
              <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#00a152' }}>{stats.activeOrders}</Typography>
              <Typography variant="body2" color="textSecondary">orders in process</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ borderRadius: 2, boxShadow: 3, bgcolor: '#fff8f5' }}>
            <CardContent>
              <Typography variant="h6" color="textSecondary">Suppliers</Typography>
              <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#c25e00' }}>{stats.suppliers}</Typography>
              <Typography variant="body2" color="textSecondary">active partners</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Charts */}
      <Grid container spacing={3}>
        {/* Monthly Order Trend */}
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 2, boxShadow: 3, p: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Monthly Order Trend</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={orderData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line 
                    yAxisId="left" 
                    type="monotone" 
                    dataKey="orders" 
                    stroke="#8884d8" 
                    activeDot={{ r: 8 }} 
                    name="Order Count"
                  />
                  <Line 
                    yAxisId="right" 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#82ca9d" 
                    name="Order Value (₹)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Inventory Status */}
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 2, boxShadow: 3, p: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Inventory Status</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={inventoryStatus}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {inventoryStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Recent Activity */}
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 2, boxShadow: 3, p: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Recent Order Activity</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart 
                  data={recentActivity}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="id" label={{ value: 'Order ID', position: 'insideBottom', offset: -5 }} />
                  <YAxis label={{ value: 'Amount (₹)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value, name, props) => [`$${value}`, 'Order Value']} />
                  <Legend />
                  <Bar dataKey="value" name="Order Value" fill="#8884d8">
                    {recentActivity.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={
                          entry.status === 'Delivered' ? '#00C49F' :
                          entry.status === 'Shipped' ? '#0088FE' :
                          entry.status === 'Pending' ? '#FFBB28' : '#FF8042'
                        } 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;