import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography, Icon } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';

import logo from '../../assets/logo5.PNG'
import useStyles from './styles';

const Navbar = () => {
    const classes = useStyles();

  return (
  <>
    <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
            <Typography variant="h6" className={classes.appBar} color="inherit">
                <img src={logo} alt="Light Your Way" height="25px" className={classes.image}/>
                Light Your Way
            </Typography>
            <div className={classes.grow} />
            <div className={classes.button}>
                <IconButton aria-label="Show cart items" color="inherit">
                    <Badge badgeContent={2} color="secondary">
                        <ShoppingCart />
                    </Badge>
                </IconButton>
            </div>
        </Toolbar>
    </AppBar>
  </>
  )
};

export default Navbar;
