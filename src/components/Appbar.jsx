import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAuthContext } from '../context/auth.context';
import { useNavigate } from 'react-router-dom';
import { deleteUserAccount, signOutUser } from '../database/auth';
import { Badge, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getProducts } from '../store/firebase.services';
import SearchBar from './SearchBar';

export default function MenuAppBar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { isLoggedIn, currentUser } = useAuthContext();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const products = useSelector(state => state.cart);
    const badgeContent = products.length > 0 ? products.length : 0;

    React.useEffect(() => {
        if (isLoggedIn) {
            dispatch(getProducts(currentUser.uid));
        }
    }, [isLoggedIn, currentUser])

    async function handleLogoutUser() {
        try {
            const confirmation = window.confirm('Are you sure you want to logout?');

            if (!confirmation) return;

            await signOutUser();
            toast.success('Logout Successfully.')
        } catch (error) {
            toast.error("Couldn't logout user. Please try again after some time.");
        }
    }

    async function handleDeleteUser() {
        try {
            const res = await deleteUserAccount();
            if (res?.status === 'success') {
                console.log('account deleted');
            } else {
                console.log('error occurred');
            }
        } catch (error) {
            console.error(error);
        }
    }

    function handleMenu (event) {
        setAnchorEl(event.currentTarget);
    };

    function handleClose () {
        setAnchorEl(null);
    };

    return (
        <>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h6" component="div">
                            Buy Busy
                        </Typography>
                        <Button
                            onClick={() => navigate('/')}
                            sx={{ my: 2, color: 'white', display: 'block', ml: 2 }}
                        >
                            Home
                        </Button> 
                        </Box>
                        <SearchBar/>
                    <IconButton size="large" aria-label="show 4 new mails" color="inherit" onClick={() => navigate('/cart')}>
                        <Badge badgeContent={badgeContent} color="error">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        {isLoggedIn && <MenuItem onClick={handleLogoutUser}>Logout</MenuItem>}
                        {!isLoggedIn && <MenuItem onClick={() => navigate('/sign-in')}>Login</MenuItem>}
                        <MenuItem onClick={handleDeleteUser}>Delete My Account</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        </Box>
    <ToastContainer/>
    </>
    );
}
