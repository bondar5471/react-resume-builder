import React, { useState, useMemo, createContext } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import SignIn from '../SignIn';
import Home from '../Home';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

function AppRouter() {
  const [user, setUser] = useState(null);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  const UserContext = createContext(null);
  return (
    <BrowserRouter>
      <UserContext.Provider value={value}>
        <Switch>
          <PublicRoute restricted={true} component={SignIn} path="/" exact />

          <PrivateRoute component={Home} path="/home" exact />
        </Switch>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default AppRouter;
