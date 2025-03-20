import React from 'react';
import { Box, Typography, Container, Link, Grid, Divider } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 1,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[900],
        color: 'white',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              PharmTrack Pro
            </Typography>
            <Typography variant="body2" color="inherit">
              A comprehensive solution for pharmaceutical inventory management and supply chain tracking.
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <EmailIcon sx={{ mr: 1, fontSize: 20 }} />
              <Link href="jyosuresh15@gmail.com" color="inherit" underline="hover">
                support@pharmtrackpro.com
              </Link>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <PhoneIcon sx={{ mr: 1, fontSize: 20 }} />
              <Typography variant="body2">
                +91 95763 46364
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationOnIcon sx={{ mr: 1, fontSize: 20 }} />
              <Typography variant="body2">
                123 Pharmacy St, Medical District, CA 90210
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Link href="https://www.linkedin.com/in/ashanthika-raja/" color="inherit">
                <FacebookIcon />
              </Link>
              <Link href="https://www.linkedin.com/in/ashanthika-raja/" color="inherit">
                <TwitterIcon />
              </Link>
              <Link href="https://www.linkedin.com/in/ashanthika-raja/" color="inherit">
                <LinkedInIcon />
              </Link>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.12)' }} />
        
        <Typography variant="body2" color="inherit" align="center">
          {'Copyright © '}
          <Link color="inherit" href="https://www.linkedin.com/in/ashanthika-raja/">
            PharmTrack Pro
          </Link>{' '}
          {new Date().getFullYear()}
          {'. All rights reserved.'}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;