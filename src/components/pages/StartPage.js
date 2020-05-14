import React from 'react';
import { Button, Typography } from '@material-ui/core';
import { useStyles } from './styles';

export const StartPage = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <div className={styles.description}>
        <Typography variant="h3" component="h1">
          Добро пожаловать
        </Typography>
      </div>
      <div className={styles.buttons}>
        <Button variant="contained" color="primary" size="large">Создать новую нейронную сеть</Button>
        <Button variant="contained" size="large" disabled>Загрузить готовую нейронную сеть</Button>
      </div>
    </div>
  );
};