import React from 'react';
import { Container } from '@material-ui/core';
import ErrorBoundary from './components/ErrorBoundary';
import Router from './components/Router';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './styles';

function App() {
  const classes = useStyles();
  return (
    <ErrorBoundary>
      <div className={classes.root}>
        <CssBaseline />
        <Container component="main" className={classes.main}>
          <Router />
        </Container>
        <footer className={classes.footer}>
          <Container maxWidth="sm">
            <Typography variant="body2" align="center">
              Support: bondar54711745@gmail.com
            </Typography>
          </Container>
        </footer>
      </div>
    </ErrorBoundary>
  );
}

export default App;
