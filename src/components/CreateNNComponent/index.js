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
  Container,
} from '@material-ui/core';
import { SelectComponent } from 'components/common/Select';
import { useStyles } from './styles';

const CommentRow = React.memo(({ colSpan, children }) => {
  const styles = useStyles();

  return (
    <TableRow className={styles.yellowTableRow}>
      <TableCell align="center" colSpan={colSpan}>
        <Typography variant="body2">{children}</Typography>
      </TableCell>
    </TableRow>
  );
});

const EditedRow = React.memo(({ parameters, editLayerParam }) => {
  const styles = useStyles();
  const activationFunction = [
    {
      value: 'relu',
      text: 'relu',
    },
    {
      value: 'sigm',
      text: 'sigm',
    },
  ];

  return (
    <>
      <TableCell padding="none" className={styles.padding}>
        <TextField
          label="Количество нейронов"
          variant="outlined"
          name="utils"
          id="utils"
          defaultValue={parameters.utils}
          onBlur={editLayerParam}
          size="small"
          fullWidth
          className={styles.background}
        />
      </TableCell>
      <TableCell padding="none" className={styles.padding}>
        <SelectComponent
          label="Функция активации"
          name="act"
          id="act"
          labelId="activation-function"
          values={activationFunction}
          defaultValue={parameters.act}
          onBlur={editLayerParam}
          size="small"
          fullWidth
          className={styles.background}
        />
      </TableCell>
    </>
  );
});

const SimpleTableRow = React.memo(
  ({
    layerId,
    editLayerParam,
    currentLayer,
    parameters,
    onBlur,
    editTableRow,
  }) => {
    const styles = useStyles();

    return (
      <TableRow
        hover
        onClick={editTableRow}
        onBlur={onBlur}
        data-id={layerId}
        className={currentLayer === layerId ? styles.edit : ''}
        tabIndex="0"
      >
        <TableCell scope="row">{layerId}</TableCell>
        {currentLayer === layerId ? (
          <EditedRow parameters={parameters} editLayerParam={editLayerParam} />
        ) : (
          <>
            <TableCell data-id={layerId} data-field="utils">
              {parameters.utils}
            </TableCell>
            <TableCell data-id={layerId} data-field="act">
              {parameters.act}
            </TableCell>
          </>
        )}
      </TableRow>
    );
  }
);

export const CreateNNComponent = React.memo(
  ({
    goToTrain,
    layersNumber,
    editLayersNumber,
    layers,
    setEmptyLayers,
    currentLayer,
    editLayerParam,
    onBlur,
    goBack,
    editTableRow,
  }) => {
    const styles = useStyles();

    return (
      <div className={styles.wrapper}>
        <Typography component="h1" variant="h4" paragraph>
          Настройка слоев нейронной сети
        </Typography>
        <Container maxWidth="md" className={styles.container}>
          <form noValidate autoComplete="off" className={styles.form}>
            <TextField
              label="Количество слоев"
              variant="outlined"
              defaultValue={layersNumber}
              onBlur={editLayersNumber}
              size="small"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={setEmptyLayers}
            >
              Создать заготовленные слои
            </Button>
          </form>
          <TableContainer className={styles.table}>
            <Table aria-label="layers">
              <TableHead>
                <TableRow>
                  <TableCell>Номер слоя</TableCell>
                  <TableCell>Количество нейронов</TableCell>
                  <TableCell>Фунция активации</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <CommentRow colSpan={3}>
                  Для изменения параметров слоя два раза нажмите на него
                </CommentRow>
                {Object.entries(layers).map(([layerId, parameters]) => (
                  <SimpleTableRow
                    key={layerId}
                    layerId={layerId}
                    parameters={parameters}
                    currentLayer={currentLayer}
                    editLayerParam={editLayerParam}
                    onBlur={onBlur}
                    editTableRow={editTableRow}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className={styles.buttons}>
            <Button variant="contained" color="secondary" onClick={goBack}>
              На главную
            </Button>
            <Button variant="contained" color="primary" onClick={goToTrain}>
              Создать нейронную сеть
            </Button>
          </div>
        </Container>
      </div>
    );
  }
);
