import { useContext, useEffect } from 'react'
import AuthContext from '../auth'


import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

const pages = ['Playlists', 'Song Catalog'];
const settings = ['Login', 'CreateAccount'];
const altSettings = ['Edit Account', 'Logout'];

export default function Navbar() {

    const {getLoggedIn} = useContext(AuthContext);
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = React.useState(getLoggedIn());
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    };

    const handleHomeClick = () => {
        navigate('/');
    }

    const handlePlaylistsClick = () => {
        navigate('/playlists');
    }

    const handleSongCatalogClick = () => {
        navigate('/songs');
    }

    return (
    <AppBar position="static">
        <Container maxWidth="xl">
        <Toolbar disableGutters sx = {{gap: '10vw'}}>
            <HomeIcon sx={{ '&:hover': { cursor: 'pointer' }, display: { xs: 'none', md: 'flex'}, mr: 1 }} onClick={handleHomeClick} />
            <Typography
            noWrap
            component="h6"
            sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
            }}
            >
            Playlister App
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                >
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{ display: { xs: 'block', md: 'none' } }}
                >
                    {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                        <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                    </MenuItem>
                    ))}
                </Menu>
                </Box>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                    <Button
                    key={page}
                    onClick={page === 'Playlists' ? handlePlaylistsClick : handleSongCatalogClick}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                    {page}
                    </Button>
                ))}
            </Box>

            <Box sx={{ flexGrow: 10 }}>

            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {
                !isLoggedIn ?
                (altSettings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                )))
                :
                (settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                )))
                }
            </Menu>
            </Box>
        </Toolbar>
        </Container>
    </AppBar>
  );
}