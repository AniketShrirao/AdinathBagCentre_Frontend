// src/components/AdminPanel.js
import React from 'react';
import { Container, Typography } from '@mui/material';
import PdfReport from './PdfReport'; // Assuming PdfReport component from previous steps

const AdminPanel = () => {
    return (
        <Container maxWidth="lg" sx={{ padding: '24px' }}>
            <Typography variant="h4" gutterBottom>
                Admin Panel
            </Typography>
            <PdfReport />
        </Container>
    );
};

export default AdminPanel;
