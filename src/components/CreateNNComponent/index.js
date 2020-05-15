import React from 'react';
import { 
  Typography, 
  TextField,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import { useStyles } from './styles';

function createData(name, calories, fat) {
  return { name, calories, fat };
}

const rows = [
  createData('1 слой', 159, 'Relu'),
  createData('2 слой', 159, 'Relu'),
  createData('3 слой', 159, 'Relu'),
  createData('4 слой', 159, 'Relu'),
  createData('5 слой', 159, 'Relu'),
];

export const CreateNNComponent = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Typography component="h1" variant="h4">
        Создать нейронную сеть
      </Typography>
      <form noValidate autoComplete="off" className={styles.form}>
        <TextField label="Количество слоев" variant="outlined"/>
        <TextField label="Количество входов" variant="outlined"/>
        <Button variant="contained" color="primary" >Создать заготовленные слои</Button>
      </form>
      <TableContainer className={styles.table}>
        <Table aria-label="layers">
          <TableHead>
            <TableRow>
              <TableCell>Номер слоя</TableCell>
              <TableCell align="right">Количество нейронов</TableCell>
              <TableCell align="right">Фунция активации</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name} hover>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" color="primary" >Создать нейронную сеть</Button>
    </div>
  );
};