import React, { useEffect } from 'react';
import { Container } from '@material-ui/core';
import ErrorBoundary from './components/ErrorBoundary';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Home from './components/Home/Home';

function App() {
  useEffect(() => {
    window.addEventListener('beforeunload', function (e) {
      e.preventDefault();
      e.returnValue = 'Close without saving?';
      window.onunload = function () {
        localStorage.clear();
      };
      return undefined;
    });
  }, []);
  return (
    <Router>
      <ErrorBoundary>
        <Container>
          <Switch>
            <Route exact path="/" component={Home} />
            <Redirect to="/" />
          </Switch>
        </Container>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
