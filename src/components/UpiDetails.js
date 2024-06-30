import React from 'react';
import { Typography, Box, Grid } from '@mui/material';
import { useSanityData } from '../hooks/useSanityData';
import { urlFor } from '../sanityClient';

const UpiDetails = () => {
    const { data: upiData, loading, error } = useSanityData('*[_type == "upiDetails"][0]');

    if (loading) return <Typography variant="body1">Loading UPI details...</Typography>;
    if (error) return <Typography variant="body1">Error fetching UPI details</Typography>;

    return (
        <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h5" gutterBottom>
                    Pay Here
                </Typography>
                {upiData.qrCodeImage && (
                    <img
                        src={urlFor(upiData.qrCodeImage).width(150).height(150).url()} // Adjust width and height
                        alt="UPI QR Code"
                        style={{ maxWidth: '100%', height: 'auto' }} // Ensure image fits container
                    />
                )}
                <Typography variant="body1" gutterBottom>
                    {upiData.upiId}
                </Typography>
            </Box>
        </Grid>
    );
};

export default UpiDetails;
