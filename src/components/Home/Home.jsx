import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Slide from '@material-ui/core/Slide';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import { deepOrange } from '@material-ui/core/colors';
import { IconButton } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import UploadResumeComponent from '../UploadResumeComponent';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { useStyles } from './styles';
import logo from '../../logo.png';

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function HideAppBar(props) {
  const classes = useStyles();
  const [darkState, setDarkState] = useState(JSON.parse(localStorage.getItem('darkTheme')));
  const palletType = darkState ? 'dark' : 'light';
  const mainPrimaryColor = darkState ? '#424242' : '#f1f3f8';
  const mainSecondaryColor = darkState ? '#ee6f57' : deepOrange[900];
  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
      primary: {
        main: mainPrimaryColor,
      },
      secondary: {
        main: mainSecondaryColor,
      },
    },
    typography: {
      fontFamily: 'Lato',
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontSize: 15,
    },
  });
  const handleThemeChange = () => {
    setDarkState(!darkState);
    localStorage.setItem('darkTheme', !JSON.parse(darkState));
  };

  const handleLogOut = () => {
    localStorage.removeItem('token');
    props.history.push('/');
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <HideOnScroll {...props}>
        <div className={classes.root}>
          <AppBar>
            <Toolbar className={classes.toolBar}>
              <img alt="logo" src={logo} className={classes.logo} />
              <IconButton onClick={handleThemeChange} className={classes.globalStyleButton}>
                {darkState ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
              <IconButton onClick={handleLogOut}>
                <ExitToAppIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </div>
      </HideOnScroll>
      <Toolbar />
      <Container>
        <Box my={2}>
          <UploadResumeComponent />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

HideAppBar.propTypes = {
  props: PropTypes.object,
  history: PropTypes.object,
};
