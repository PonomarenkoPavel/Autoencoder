import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { SnackBar } from 'containers/common/SnackBar';
import { useStyles } from './styles';
import { Routes } from './components/Routes';

function App() {
  const styles = useStyles();

  return (
    <>
      <SnackBar />
      <div className={styles.wrapper}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
