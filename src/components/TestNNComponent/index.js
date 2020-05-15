import React from 'react';
import { 
  Container,
  Typography, 
  Button,
  Grid,
} from '@material-ui/core';
import { useStyles } from './styles';

export const TestNNComponent = () => {
  const styles = useStyles();

  return (
    <Container className={styles.section} maxWidth={false}>
        <Typography component="h2" variant="h5" paragraph>
          Проверка работы нейронной сети
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" fullWidth>Проверить</Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography component="h2" variant="h6" paragraph>
              Начальные изображения
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography component="h2" variant="h6" paragraph>
              После НС
            </Typography>
          </Grid>
        </Grid>
    </Container>
  );
}