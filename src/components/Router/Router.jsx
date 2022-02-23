import React, { useState, useMemo, createContext } from 'react';
import { Switch } from 'react-router-dom';
import Home from '../Home';
import PrivateRoute from './PrivateRoute';
import GitLabExplorer from '../GitLabExplorer';
import ReorderBlock from '../ReorderBlock';

function AppRouter() {
  const [user, setUser] = useState(null);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  const UserContext = createContext(null);
  return (
    <UserContext.Provider value={value}>
      <Switch>
        <PrivateRoute component={Home} path="/" exact />
        <PrivateRoute component={GitLabExplorer} path="/gitlab/:path?/:path?/:path?/:path?/:path?" />
        <PrivateRoute component={ReorderBlock} path="/reorder-block" />
      </Switch>
    </UserContext.Provider>
  );
}

export default AppRouter;
