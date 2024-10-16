import { AppBar, Box, Toolbar, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import Menu from '@mui/icons-material/MenuRounded';
import LOGO from '../../assets/logo.png';
import { useState } from 'react';
import Style from './navStyle';
import { Close } from "@mui/icons-material";


const style = Style();
const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleReload = () => {
        window.location.replace('/');
    };

    const drawer = (
        <Box sx={style.drawer}>
            <Box sx={{
                width: '100%', 
                textAlign: 'right',
                marginTop: '0.7rem',
            }}>
                <Close sx={{
                    fontSize: '30px',
                    cursor: 'pointer',
                    transition: '0.3s ease',
                    '&:hover': {
                        transform: 'scale(1.1)',
                    }
                }}
                onClick={handleDrawerToggle}
                />
            </Box>
            <List>
                {['Home', 'About', 'Gallery', 'College', 'Year Book', 'Bright Minds'].map((text, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton
                            onClick={() => {
                                const route = text.toLowerCase().trim() === 'home' ? '' : text.toLowerCase().replace(/\s+/g, ''); // Remove spaces
                                window.location.replace(`/${route}`);
                            }}
                        >

                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );


    return (
        <>
            <AppBar position="fixed" sx={style.appBar}>
                <Toolbar sx={style.toolbar}>
                    <Box sx={style.logo} onClick={handleReload}>
                        <img style={style.logoImg} src={LOGO} alt="BCA" />
                    </Box>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={style.navlist}>
                        {['Home', 'About', 'Gallery', 'College'].map((text, index) => (
                            <ListItem key={index} onClick={() => {
                                const route = text.toLowerCase().trim() === 'home' ? '' : text.toLowerCase().replace(/\s+/g, ''); // Remove spaces
                                window.location.replace(`/${route}`);
                            }}>
                                {text}
                            </ListItem>
                        ))}
                    </Box>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="end"
                        onClick={handleDrawerToggle}
                    >
                        <Menu />
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* Drawer for mobile navigation (coming from right) */}
            <Drawer
                anchor="right" // Changed anchor to right
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }} // Improves performance on mobile
                sx={{ 
                    '& .MuiDrawer-paper': {
                        padding: '1rem 5% 1rem 1%',
                        overflowX: 'hidden',
                        boxSizing: 'border-box',
                        maxWidth: 280,
                        width: '80%',
                        backgroundColor: 'rgba(237,237,237,0.1)',
                        backdropFilter: 'blur(12px)',

                        // Scrollbar styling
                        '&::-webkit-scrollbar': {
                            width: '5px',
                            background: 'var(--bg)',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: '#2D2D2D', 
                            borderRadius: '10px',
                        },
                        '&::-webkit-scrollbar-thumb:hover': {
                            background: '#424141ce',
                        },
                    },
                }}
            >
                {drawer}
            </Drawer>
        </>
    );
};

export default Navbar;
