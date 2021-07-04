import React, { useCallback, useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

interface Props {
  children: React.ReactElement;
}

function ElevationScroll(props: Props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles((theme) => ({
  toolbar: {
    ...theme.mixins.toolbar,
  },
  tabContainer: { marginLeft: 'auto' },
  button: {
    borderRadius: 50,
    margin: '0 25px',
  },
}));

export default function Header() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const links = [
    {
      to: '/',
      label: 'Home',
    },
    {
      to: '/services',
      label: 'Services',
      onMouseOver: (e: any) => openMenu(e.currentTarget),
    },
    {
      to: '/revolution',
      label: 'The Revolution',
    },
    {
      to: '/about',
      label: 'About us',
    },
    {
      to: '/contact',
      label: 'Contact us',
    },
  ];

  useEffect(() => {
    const currentLinkIndex = links.findIndex((link) => location.pathname === link.to);
    if (currentLinkIndex === -1) {
      return;
    }
    setValue(currentLinkIndex);
  }, []);

  const openMenu = useCallback((element) => {
    setAnchorEl(element);
    setOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    setAnchorEl(null);
    setOpen(false);
  }, []);

  return (
    <>
      <ElevationScroll>
        <AppBar>
          <Toolbar>
            <span>LingVuDev</span>
            <Tabs
              className={`${classes.tabContainer} ${classes.toolbar}`}
              value={value}
              onChange={(e, value) => setValue(value)}
            >
              {links.map((link, index) => (
                <Tab key={index} className={`${classes.toolbar}`} component={Link} {...link} />
              ))}
            </Tabs>
            <Button className={classes.button} variant="contained" color="secondary">
              Free Estimate
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={closeMenu}
              MenuListProps={{ onMouseLeave: closeMenu }}
            >
              <MenuItem
                onClick={() => {
                  closeMenu();
                  setValue(1);
                }}
                component={Link}
                to="/services"
              >
                Services
              </MenuItem>
              <MenuItem
                onClick={() => {
                  closeMenu();
                  setValue(1);
                }}
                component={Link}
                to="/customsoftware"
              >
                Custom Software Development
              </MenuItem>
              <MenuItem
                onClick={() => {
                  closeMenu();
                  setValue(1);
                }}
                component={Link}
                to="/websites"
              >
                Web Development
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbar}></div>
    </>
  );
}
