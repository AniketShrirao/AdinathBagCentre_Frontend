// src/components/Header.js
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, useMediaQuery } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [anchorEl, setAnchorEl] = useState(null);
    const { currentUser, logout } = useAuth();

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Adinath Bag Centre
                </Typography>
                {isMobile ? (
                    <>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={handleMenuOpen}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem component={Link} to="/" onClick={handleMenuClose}>Home</MenuItem>
                            <MenuItem component={Link} to="/dashboard" onClick={handleMenuClose}>Dashboard</MenuItem>
                            <MenuItem component={Link} to="/sales" onClick={handleMenuClose}>Sales</MenuItem>
                            <MenuItem component={Link} to="/register-bag" onClick={handleMenuClose}>Register Bag</MenuItem>
                            <MenuItem component={Link} to="/notifications" onClick={handleMenuClose}>Notifications</MenuItem>
                            {currentUser ? (
                                <>
                                    <MenuItem component={Link} to="/admin">
                                        Admin Panel
                                    </MenuItem>
                                    <MenuItem onClick={logout}>
                                        Logout
                                    </MenuItem>
                                </>
                            ) : (
                                <MenuItem component={Link} to="/login">
                                    Login
                                </MenuItem>
                            )}
                        </Menu>
                    </>
                ) : (
                    <>
                        <Button color="inherit" component={Link} to="/">Home</Button>
                        <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
                        <Button color="inherit" component={Link} to="/sales">Sales</Button>
                        <Button color="inherit" component={Link} to="/register-bag">Register Bag</Button>
                        <Button color="inherit" component={Link} to="/notifications">Notifications</Button>
                        {currentUser ? (
                            <>
                                <Button color="inherit" component={Link} to="/admin">
                                    Admin Panel
                                </Button>
                                <Button color="inherit" onClick={logout}>
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <Button color="inherit" component={Link} to="/login">
                                Login
                            </Button>
                        )}
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
