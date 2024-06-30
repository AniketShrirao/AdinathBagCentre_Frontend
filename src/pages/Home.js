import React from 'react';
import { Container, Typography, Grid, Divider } from '@mui/material';
import Carousel from '../components/Carousel';
import Services from '../components/Services';
import UpiDetails from '../components/UpiDetails'; // Import the new UpiDetails component
import { useSanityData } from '../hooks/useSanityData';

function Home() {
    const { data: salesData } = useSanityData('*[_type == "sales"][0]');

    return (
        <Container maxWidth="lg" sx={{ padding: '24px' }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Welcome to Adinath Bag Centre
            </Typography>
            <Typography variant="body1" gutterBottom>
                Explore a wide range of stylish bags at Adinath Bag Centre. Whether you're looking
                for backpacks, travel bags, or trendy handbags, we've got you covered.
            </Typography>
            <Divider sx={{ my: 4 }} />
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h5" gutterBottom>
                        Contact Details
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        <strong>Owner:</strong> Mr. Adinath Bagwala
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        <strong>Phone:</strong> +91 9876543210
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        <strong>Address:</strong> 123, Bag Street, Bagtown, Bagland
                    </Typography>
                    <Typography variant="body1">
                        Visit us today to discover the perfect bag for every occasion!
                    </Typography>
                </Grid>
                <UpiDetails /> {/* Render the UpiDetails component here */}
            </Grid>
            <Divider sx={{ my: 4 }} />
            {salesData && <Carousel images={salesData.carouselImages} />}
            {salesData && <Services services={salesData.services} />}
        </Container>
    );
}

export default Home;
