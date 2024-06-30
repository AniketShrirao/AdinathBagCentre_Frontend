// src/components/Notification.js
import React from 'react';
import { Container, Typography } from '@mui/material';

const Notification = () => {
    return (
        <Container maxWidth="lg" sx={{ padding: '24px' }}>
            <Typography variant="h5" gutterBottom>
                Notifications
            </Typography>
            <Typography variant="body1">
                Notification content goes here.
            </Typography>
        </Container>
    );
};

export default Notification;
