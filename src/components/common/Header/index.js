import React from 'react';
import { Typography } from '@material-ui/core';
import { BackButton } from 'containers/common/BackButton';
import { useStyles } from './styles';

export const HeaderComponent = ({ text = '' }) => {
  const styles = useStyles();

  return (
    <div className={styles.header}>
      <BackButton />
      <Typography component="h1" variant="h4">
        {text}
      </Typography>
    </div>
  );
};
