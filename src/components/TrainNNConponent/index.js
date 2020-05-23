import React from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
} from '@material-ui/core';
import { useStyles } from './styles';

export const TrainNNComponent = ({
  testSampleSize = '',
  trainSampleSize = '',
  dataSize = 0,
  editSampleSize,
  editLearningOption,
  batchSize = '',
  epochs = '',
  trainNN,
}) => {
  const styles = useStyles();

  return (
    <>
      <Container className={styles.section} maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography component="h2" variant="h5">
              Настройка данных для обучения
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} container>
            <Typography
              component="span"
              variant="subtitle1"
              color="textPrimary"
              className={styles.text}
            >
              Всего доступно {dataSize} элементов
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Размер тестовой выборки"
              id="test"
              variant="outlined"
              value={testSampleSize}
              onChange={editSampleSize}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Размер тренировочной выборки"
              variant="outlined"
              id="train"
              value={trainSampleSize}
              onChange={editSampleSize}
              fullWidth
            />
          </Grid>
        </Grid>
      </Container>
      <Container className={styles.section} maxWidth={false}>
        <Typography component="h2" variant="h5" paragraph>
          Настройка параметров обучения
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Количество эпох"
              id="epochs"
              onChange={editLearningOption}
              value={epochs}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Размер партии (batch)"
              id="batchSize"
              onChange={editLearningOption}
              variant="outlined"
              value={batchSize}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} container>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={trainNN}
            >
              Обучить нейронную сеть
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
