// src/components/BagForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import { registerBag } from '../app/features/bags/bagsSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const BagForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [bagDetails, setBagDetails] = useState({ customerName: '', description: '', customerPhone: '' });

    const handleChange = (e) => {
        setBagDetails({ ...bagDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(registerBag(bagDetails)); // Ensure `registerBag` action is correctly implemented in `bagsSlice.js`
            toast.success('Bag registered successfully');
            setBagDetails({ customerName: '', description: '', customerPhone: '' });
            navigate('/dashboard'); // Redirect to the dashboard
        } catch (error) {
            toast.error('Error registering bag');
            console.error('Error registering bag:', error);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
                Customer Details
            </Typography>
            <Box sx={{ mt: 4 }}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Customer Name"
                        name="customerName"
                        value={bagDetails.customerName}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        value={bagDetails.description}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Customer Phone"
                        name="customerPhone"
                        value={bagDetails.customerPhone}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <Box sx={{ mt: 2 }}>
                        <Button type="submit" variant="contained" color="primary">
                            Register Bag
                        </Button>
                    </Box>
                </form>
            </Box>
        </Container>
    );
};

export default BagForm;
