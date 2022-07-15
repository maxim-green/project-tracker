import { privateRoutes, publicRoutes } from 'routes/index';
import { Routes, Route } from 'react-router';
import React, { FC } from 'react';

const AppRouter: FC = () => {
  const auth = true;
  return (
    auth
      ? (
        <Routes>
          {privateRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.component}
            />
          ))}
        </Routes>
      )
      : (
        <Routes>
          {publicRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.component}
            />
          ))}
        </Routes>
      )
  );
};

export default AppRouter;
