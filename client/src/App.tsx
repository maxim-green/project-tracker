import React from 'react';
import AppLayout from 'layout/AppLayout';
import classes from 'App.module.scss';
import AppRouter from 'routes/AppRouter';

interface IApp {
  x?: number;
}

const App: React.FC<IApp> = () => (
  <div className={classes.app}>
    <AppLayout>
      <AppRouter />
    </AppLayout>
  </div>
);

export default App;
