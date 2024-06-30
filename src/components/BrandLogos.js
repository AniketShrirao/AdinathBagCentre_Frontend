// BrandLogos.js
import React from 'react';
import { Grid, Typography } from '@mui/material';
import { urlFor } from '../sanityClient';

const BrandLogos = ({ logos }) => (
    <div>
        <Typography variant="h5" component="h2" gutterBottom>
            Our Associated Brands
        </Typography>
        <Grid container spacing={2} sx={{ my: 4 }}>
            {logos.map((logo, index) => (
                <Grid item xs={6} sm={3} key={index}>
                    <img src={urlFor(logo)} alt={logo.alt} style={{ width: '100%' }} />
                </Grid>
            ))}
        </Grid>
    </div>
);

export default BrandLogos;
