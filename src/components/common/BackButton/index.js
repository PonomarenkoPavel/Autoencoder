import React from 'react';
import { IconButton } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
/**
 * Button is used to redirect to the previous page
 */
export const BackButtonComponent = ({ handleClick }) => (
  <IconButton aria-label="back" onClick={handleClick}>
    <ArrowBack />
  </IconButton>
);
