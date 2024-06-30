import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Header from './components/Header';
import Home from './pages/Home';
import BagList from './components/BagList';
import Sales from './pages/Sales';
import BagForm from './components/BagForm';
import Notification from './components/Notification';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<BagList />} />
              <Route path="/sales" element={<Sales />} />
              <Route path="/register-bag" element={<BagForm />} />
              <Route path="/notifications" element={<Notification />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<PrivateRoute />}>
                <Route path="/admin" element={<AdminPanel />} />
              </Route>
            </Routes>
          </Router>
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;
