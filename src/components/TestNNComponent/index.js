import React from 'react';
import {
  Container,
  Typography,
  Button,
  Grid,
  TextField,
} from '@material-ui/core';
import { HeaderComponent } from 'components/common/Header';
import { useStyles } from './styles';

export const TestNNComponent = ({
  imageNumber,
  editImageNumber,
  errors,
  validateField,
  testNN,
}) => {
  const styles = useStyles();

  return (
    <>
      <HeaderComponent text="Тестирование нейронной сети" />
      <Container maxWidth="md" className={styles.container}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <form noValidate autoComplete="off" className={styles.form}>
              <TextField
                id="imageNumber"
                label="Количество картинок"
                variant="outlined"
                value={imageNumber}
                onChange={editImageNumber}
                onBlur={validateField}
                error={!!errors.imageNumber}
                helperText={errors.imageNumber}
                size="small"
              />
              <Button variant="contained" color="primary" onClick={testNN}>
                Показать результат
              </Button>
            </form>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            id="initImage" /* ref={initImageContainer} */
          >
            <Typography component="h2" variant="h6" paragraph>
              Начальные изображения
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            id="predsImage" /* ref={predsImageContainer} */
          >
            <Typography component="h2" variant="h6" paragraph>
              После Автоэнкодера
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
