import React, { useState } from 'react';
import { Container, Toolbar, CssBaseline, AppBar, IconButton, Typography } from '@material-ui/core';
import ErrorBoundary from './components/ErrorBoundary';
import Router from './components/Router';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useStyles } from './styles';
import logo from './logo.png';
import HideOnScroll from './components/HideOnScroll';
import { Link, withRouter } from 'react-router-dom';
import { useKeycloak } from "@react-keycloak/web";

function App(props) {
  const classes = useStyles();
  const [userName, setUserName] = useState(null);
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

  const { keycloak, initialized } = useKeycloak();
  
  if (initialized && !keycloak.authenticated) {
    keycloak.login({
      scope: 'openid'
    });
  }

  if (initialized && keycloak.authenticated && !userName) {
    setUserName(() => keycloak.tokenParsed.name);
    localStorage.setItem('user', keycloak.tokenParsed.name);
  }

  const handleLogOut = () => {
    keycloak.logout();
  };

  return (
    <ErrorBoundary>
      <ThemeProvider theme={darkTheme}>
        <HideOnScroll {...props}>
          <div>
            <AppBar>
              <Toolbar className={classes.toolBar}>
                <Link to="/">
                  <img alt="logo" src={logo} className={classes.logo} />
                </Link>
                <span className={classes.buttonGroup}>
                  <IconButton onClick={handleThemeChange}>
                    {darkState ? <Brightness7Icon /> : <Brightness4Icon />}
                  </IconButton>
                  {userName ? (
                    <>
                      <Typography className={classes.userName}>{userName}</Typography>
                      <IconButton onClick={handleLogOut}>
                        <ExitToAppIcon />
                      </IconButton>
                    </>
                  ) : null}
                </span>
              </Toolbar>
            </AppBar>
          </div>
        </HideOnScroll>
        <div className={classes.root}>
          <CssBaseline />
          <Container component="main" className={classes.main}>
            <Router />
          </Container>
          <footer className={classes.footer}>
            <Container maxWidth="sm">
              <Typography variant="body2" align="center">
                Support:{' '}
                <a href="mailto:js.rb@nixs.com?subject=Mail from CV builder">js.rb@nixs.com</a>
              </Typography>
            </Container>
          </footer>
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default withRouter(App);

App.propTypes = {
  props: PropTypes.object,
  history: PropTypes.object,
};
