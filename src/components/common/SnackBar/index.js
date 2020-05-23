import React from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

export const SnackBarComponent = ({ timeout, severity, message, onClose }) => (
  <Snackbar
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    open
    autoHideDuration={timeout}
    onClose={onClose}
  >
    <Alert severity={severity} variant="filled" onClose={onClose}>
      {message}
    </Alert>
  </Snackbar>
);
