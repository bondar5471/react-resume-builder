import React, { useState, useMemo, createContext } from 'react';
import { Switch } from 'react-router-dom';
import SignIn from '../SignIn';
import Home from '../Home';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import GitLabExplorer from '../GitLabExplorer';

function AppRouter() {
  const [user, setUser] = useState(null);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  const UserContext = createContext(null);
  return (
    <UserContext.Provider value={value}>
      <Switch>
        <PublicRoute restricted={true} component={SignIn} path="/" exact />
        <PrivateRoute component={Home} path="/home" exact />
        <PrivateRoute component={GitLabExplorer} path="/git_explorer/:path?" exact />
      </Switch>
    </UserContext.Provider>
  );
}

export default AppRouter;
