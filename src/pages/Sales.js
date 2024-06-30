// Sales.js
import React from 'react';
import { Typography, Container } from '@mui/material';
import { useSanityData } from '../hooks/useSanityData';
import Carousel from '../components/Carousel';
import BrandLogos from '../components/BrandLogos';
import Services from '../components/Services';

const Sales = () => {
    const { data: salesData, loading, error } = useSanityData('*[_type == "sales"][0]');

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <Container maxWidth="lg" sx={{ padding: '24px' }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Seasonal Sales
            </Typography>
            <Typography variant="body1" gutterBottom>
                List of bags for sale and related information.
            </Typography>
            {salesData && <Carousel images={salesData.carouselImages} />}
            {salesData && <BrandLogos logos={salesData.brandLogos} />}
            {salesData && <Services services={salesData.services} />}
        </Container>
    );
};

export default Sales;
