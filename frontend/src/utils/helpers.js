export const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };
  
  export const formatCurrency = (amount) => {
    return `$${Number(amount).toFixed(2)}`;
  };