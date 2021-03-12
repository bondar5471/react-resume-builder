import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Slide from '@material-ui/core/Slide';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import { IconButton, Typography } from '@material-ui/core';
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
  const mainPrimaryColor = darkState ? '#724b4b' : '#39C3FC';
  const mainSecondaryColor = darkState ? '#ca3e47' : '#ee4540';
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
  });
  const handleThemeChange = () => {
    setDarkState(!darkState);
    localStorage.setItem('darkTheme', !JSON.parse(darkState));
  };

  const handleLogOut = () => {
    localStorage.clear();
    props.history.push('/');
  };

  const userName = localStorage.getItem('user');
  return (
    <ThemeProvider theme={darkTheme}>
      <HideOnScroll {...props}>
        <div className={classes.root}>
          <AppBar>
            <Toolbar className={classes.toolBar}>
              <img alt="logo" src={logo} className={classes.logo} />
              <span className={classes.buttonGroup}>
                <IconButton onClick={handleThemeChange}>
                  {darkState ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
                <Typography className={classes.userName}>{userName}</Typography>
                <IconButton onClick={handleLogOut}>
                  <ExitToAppIcon />
                </IconButton>
              </span>
            </Toolbar>
          </AppBar>
        </div>
      </HideOnScroll>
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
