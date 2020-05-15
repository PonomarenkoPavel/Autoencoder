import React from 'react';
import { 
  Container,
  Typography, 
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from '@material-ui/core';
import { useStyles } from './styles';

export const TrainNNComponent = () => {
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
          <Grid item xs={12} md={7}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="demo-simple-select-outlined-label">Данные для обучения</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                label="Данные для обучения"
              >
                <MenuItem value='MNIST'>NMIST</MenuItem>
                <MenuItem disabled>Свои данные</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={5} container>
            <Button variant="contained" color="primary" fullWidth>Загрузить данные для обучения</Button>
          </Grid>
          <Grid item xs={12} sm={4} container>
            <Typography component="span" variant="subtitle1" color="textPrimary" className={styles.text}>
              Всего доступно 123 элементов
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="Размер тестовой выборки" variant="outlined" fullWidth/>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="Размер тренировочной выборки" variant="outlined" fullWidth/>
          </Grid>
        </Grid>
    </Container>
    <Container className={styles.section} maxWidth={false}>
        <Typography component="h2" variant="h5" paragraph>
          Настройка параметров обучения
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField label="Количество эпох" variant="outlined" fullWidth/>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField label="Другой параметр(тоже важен)" variant="outlined" fullWidth/>
          </Grid>
          <Grid item xs={12} sm={6} md={4} container>
            <Button variant="contained" color="primary" fullWidth>Обучить нейронную сеть</Button>
          </Grid>
        </Grid>
    </Container>
  </>
  );
}