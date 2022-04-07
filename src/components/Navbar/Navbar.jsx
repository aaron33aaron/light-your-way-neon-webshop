import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';

import logo from '../../assets/logo5.PNG'
import useStyles from './styles';

import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ totalItems }) => {
    const classes = useStyles();
    // Const location used to figure out what page were on in order to display cart or not
    const location = useLocation();

    // Used to style the title link
    const linkStyle = {
        textDecoration: 'none' // <-------- use this
      };

  return (
  <>
    <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
            <Typography component={Link} to="/" style={linkStyle} variant="h6" className={classes.appBar} color="inherit">
                <img src={logo} alt="Light Your Way" height="25px" className={classes.image}/>
                Light Your Way
            </Typography>
            <div className={classes.grow} />
            {location.pathname === '/' && (
            <div className={classes.button}>
                <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
                    <Badge badgeContent={totalItems} color="secondary">
                        <ShoppingCart />
                    </Badge>
                </IconButton>
            </div> )}
        </Toolbar>
    </AppBar>
  </>
  )
};

export default Navbar;
