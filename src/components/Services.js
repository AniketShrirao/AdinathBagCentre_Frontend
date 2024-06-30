// Services.js
import React from 'react';
import { Typography, Grid, Box } from '@mui/material';

const Services = ({ services }) => (
    <div>
        <Typography variant="h5" component="h2" gutterBottom>
            Other Services
        </Typography>
        <Grid container spacing={4} sx={{ my: 4 }}>
            {services.map((service, index) => (
                <Grid item xs={12} sm={4} key={index}>
                    <Box sx={{ p: 2, border: '1px solid #ddd', borderRadius: '8px' }}>
                        <Typography variant="h6" component="h3">
                            {service.title}
                        </Typography>
                        <Typography variant="body2">{service.description}</Typography>
                    </Box>
                </Grid>
            ))}
        </Grid>
    </div>

);

export default Services;
