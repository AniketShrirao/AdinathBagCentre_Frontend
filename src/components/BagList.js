// src/components/BagList.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, List, ListItem, ListItemText, Button, Divider, TextField, Grid } from '@mui/material';
import { fetchBags, updateBagStatus, selectAllBags } from '../app/features/bags/bagsSlice';

const BagList = () => {
    const dispatch = useDispatch();
    const bags = useSelector(selectAllBags);

    const [formState, setFormState] = useState({});

    useEffect(() => {
        dispatch(fetchBags());
    }, [dispatch]);

    const handleStatusUpdate = (bagId) => {
        const { price, description } = formState[bagId] || {};
        if (!price) {
            setFormState(prevState => ({
                ...prevState,
                [bagId]: {
                    ...prevState[bagId],
                    priceError: 'Price is required.',
                }
            }));
            return;
        }

        dispatch(updateBagStatus({ id: bagId, status: 'repaired', price, description }));
        setFormState(prevState => ({
            ...prevState,
            [bagId]: {
                ...prevState[bagId],
                priceError: '',
            }
        }));
    };

    const handleInputChange = (bagId, field, value) => {
        setFormState(prevState => ({
            ...prevState,
            [bagId]: {
                ...prevState[bagId],
                [field]: value,
                [`${field}Error`]: field === 'price' && !value ? 'Price is required.' : '',
            }
        }));
    };

    const formatDateTime = (dateString) => {
        const options = { timeZone: 'Asia/Kolkata', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return new Date(dateString).toLocaleString('en-IN', options);
    };

    return (
        <Container maxWidth="lg" sx={{ padding: '24px' }}>
            <Typography variant="h5" gutterBottom>
                Bag List Dashboard
            </Typography>
            {bags.length === 0 ? (
                <Typography variant="body1">No bags have come for repairing yet.</Typography>
            ) : (
                <List>
                    {bags.map((bag) => (
                        <React.Fragment key={bag._id}>
                            <ListItem sx={{ padding: '24px' }}>
                                <Grid container spacing={2} alignItems="flex-end">
                                    <Grid item xs={12} sm={3}>
                                        <ListItemText
                                            primary={`Customer Name: ${bag.customerName}`}
                                            secondary={`Customer Number: ${bag.customerPhone}`}
                                        />
                                        <Typography variant="body2">
                                            Bag Received: {formatDateTime(bag.bagReceivedDate)}
                                        </Typography>
                                        {bag.status === 'repaired' && (
                                            <Typography variant="body2">
                                                Bag Repaired: {formatDateTime(bag.bagRepairedDate)}
                                            </Typography>
                                        )}
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        {bag.status === 'repaired' || bag.description !== '' ? (
                                            <Typography>{formState[bag._id]?.description || bag.description}</Typography>
                                        ) : (
                                            <TextField
                                                label="Description"
                                                variant="outlined"
                                                fullWidth
                                                value={formState[bag._id]?.description || bag.description}
                                                onChange={(event) => handleInputChange(bag._id, 'description', event.target.value)}
                                            />
                                        )}
                                    </Grid>
                                    <Grid item xs={6} sm={2}>
                                        {bag.status === 'repaired' ? (
                                            <Typography>{formState[bag._id]?.price || bag.price}</Typography>
                                        ) : (
                                            <TextField
                                                label="Price"
                                                variant="outlined"
                                                fullWidth
                                                value={formState[bag._id]?.price || ''}
                                                onChange={(event) => handleInputChange(bag._id, 'price', event.target.value)}
                                                error={!!formState[bag._id]?.priceError}
                                                helperText={formState[bag._id]?.priceError}
                                                required
                                            />
                                        )}
                                    </Grid>
                                    <Grid item xs={6} sm={2}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            disabled={bag.status === 'repaired'}
                                            onClick={() => handleStatusUpdate(bag._id)}
                                            fullWidth
                                        >
                                            {bag.status === 'repaired' ? 'Repaired' : 'Mark as Repaired'}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <Divider />
                        </React.Fragment>
                    ))}
                </List>
            )}
        </Container>
    );
};

export default BagList;
