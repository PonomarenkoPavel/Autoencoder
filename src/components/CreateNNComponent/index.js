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
import { HeaderComponent } from 'components/common/Header';
import { activationFunctions } from 'constants/layers';
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

const EditedRow = React.memo(
  ({ parameters, editLayerParam, validateField, errors }) => {
    const styles = useStyles();

    return (
      <>
        <TableCell className={styles.padding}>
          <TextField
            label="Количество нейронов"
            variant="outlined"
            name="units"
            id="units"
            value={parameters.units}
            onChange={editLayerParam}
            onBlur={validateField}
            size="small"
            fullWidth
            className={styles.background}
            error={!!errors.units}
            helperText={errors.units}
          />
        </TableCell>
        <TableCell className={styles.padding}>
          <SelectComponent
            label="Функция активации"
            name="act"
            id="act"
            labelId="activation-function"
            values={activationFunctions}
            value={parameters.act}
            onChange={editLayerParam}
            onBlur={validateField}
            size="small"
            fullWidth
            error={!!errors.act}
            helperText={errors.act}
          />
        </TableCell>
      </>
    );
  }
);

const SimpleTableHead = React.memo(() => (
  <TableHead>
    <TableRow>
      <TableCell>Номер слоя</TableCell>
      <TableCell>Количество нейронов</TableCell>
      <TableCell>Фунция активации</TableCell>
    </TableRow>
  </TableHead>
));

const SimpleTableRow = React.memo(
  ({
    layerId,
    editLayerParam,
    currentLayer,
    parameters,
    onBlur,
    editTableRow,
    validateField,
    errors,
  }) => {
    const styles = useStyles();

    return (
      <TableRow
        hover
        onClick={editTableRow}
        onBlur={onBlur}
        data-id={layerId}
        className={currentLayer === layerId ? styles.editedRow : ''}
        tabIndex="0"
      >
        <TableCell scope="row">{layerId}</TableCell>
        {currentLayer === layerId ? (
          <EditedRow
            parameters={parameters}
            editLayerParam={editLayerParam}
            validateField={validateField}
            errors={errors}
          />
        ) : (
          <>
            <TableCell data-id={layerId} data-field="units">
              {parameters.units}
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
/**
 * TODO добавить выбор bias и разреженность
 */
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
    editTableRow,
    errors,
    validateField,
  }) => {
    const styles = useStyles();

    return (
      <>
        <HeaderComponent text="Настройка слоев нейронной сети" />
        <Container maxWidth="md" className={styles.container}>
          <form noValidate autoComplete="off" className={styles.form}>
            <TextField
              id="layersNumber"
              label="Количество слоев"
              variant="outlined"
              value={layersNumber}
              onChange={editLayersNumber}
              onBlur={validateField}
              error={!!errors.layersNumber}
              helperText={errors.layersNumber}
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
              <SimpleTableHead />
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
                    validateField={validateField}
                    errors={errors}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button variant="contained" color="primary" onClick={goToTrain}>
            Создать нейронную сеть
          </Button>
        </Container>
      </>
    );
  }
);
