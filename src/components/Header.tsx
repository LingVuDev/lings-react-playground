import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

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
  const location = useLocation();
  const links = [
    {
      to: '/',
      label: 'Home',
    },
    {
      to: '/services',
      label: 'Services',
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
    setValue(currentLinkIndex);
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
              {links.map((link) => (
                <Tab className={`${classes.toolbar}`} component={Link} {...link} />
              ))}
            </Tabs>
            <Button className={classes.button} variant="contained" color="secondary">
              Free Estimate
            </Button>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbar}></div>
    </>
  );
}
