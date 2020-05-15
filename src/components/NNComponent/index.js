import React from 'react';
import { 
  Typography, 
  Grid,
} from '@material-ui/core';
import { useStyles } from './styles';
import { TrainNNComponent } from '../TrainNNConponent';
import { TestNNComponent } from '../TestNNComponent';

export const NNComponent = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Typography component="h1" variant="h4">
        Обучение и тестирование нейронной сети
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={7}>
          <TrainNNComponent />
        </Grid>
      </Grid>
      <TestNNComponent />
    </div>
  );
}