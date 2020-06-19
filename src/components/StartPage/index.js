import React from 'react';
import PropTypes from 'prop-types';
import { Button, Typography } from '@material-ui/core';
import { useStyles } from './styles';

export const StartPageComponent = ({ createNN }) => {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <Typography variant="h3" component="h1" paragraph>
        Добро пожаловать
      </Typography>
      <div className={styles.buttons}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={createNN}
        >
          Создать новую нейронную сеть
        </Button>
        <Button variant="contained" size="large" disabled>
          Загрузить готовую нейронную сеть
        </Button>
      </div>
    </div>
  );
};

StartPageComponent.propTypes = {
  createNN: PropTypes.func.isRequired,
};
