import React from 'react';
import { CircularProgress, Backdrop } from '@material-ui/core';
import { useStyles } from './styles';

export const Loader = () => {
  const styles = useStyles();

  return (
    <Backdrop className={styles.loader} open>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
