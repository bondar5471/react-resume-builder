import React from 'react';
import { Container } from '@material-ui/core';
import ErrorBoundary from './components/ErrorBoundary';
import Router from './components/Router';

function App() {
  return (
    <ErrorBoundary>
      <Container>
        <Router />
      </Container>
    </ErrorBoundary>
  );
}

export default App;
