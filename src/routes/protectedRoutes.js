import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import tokenStorage from '../services/tokenStorage';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '../components/appBar';
import Drawer from '../components/drawer';
import Toolbar from '@mui/material/Toolbar';

function Protected({ children }) {
    const token = tokenStorage.getToken()
    const [open, setOpen] = useState(true)

    if (!token) {
        return <Navigate to="/login" replace />
    }
    const defaultTheme = createTheme();

    return <>
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar open={open} setOpen={setOpen} />
                <Drawer open={open} setOpen={setOpen} />
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    {children}

                </Box>
            </Box>
        </ThemeProvider>
    </>
}
export default Protected