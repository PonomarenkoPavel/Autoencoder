import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { TRAIN_NN_URL } from 'constants/api';
import { CreateNNComponent } from 'components/CreateNNComponent';
import { getEmptyLayerParameters } from 'helpers/layers';
import { addLayersParameters } from 'modules/layers/actions';
import { useValidate } from 'helpers/validations';
import { createModels } from 'modules/models/actions';
import { validationRules } from './validationRules';

const defaultLayersNumber = 3;
const delaultLayers = {
  1: {
    units: 192,
    act: 'relu',
  },
  2: {
    units: 128,
    act: 'relu',
  },
  3: {
    units: 64,
    act: 'linear',
  },
};

export const CreateNN = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [layersNumber, setLayersNumber] = useState(defaultLayersNumber);
  const [layers, setLayers] = useState(delaultLayers);
  const [currentLayer, setCurrentLayer] = useState(null);
  const { errors, validateField, validateFields } = useValidate(
    validationRules
  );

  const goToTrain = useCallback(() => {
    dispatch(addLayersParameters(layers));
    dispatch(createModels(layers));
    history.push(TRAIN_NN_URL);
  }, [history, dispatch, layers]);

  const editLayersNumber = useCallback(
    ({ target }) => setLayersNumber(target.value),
    [setLayersNumber]
  );

  const setEmptyLayers = useCallback(() => {
    const layersObject = {};
    if (validateFields({ layersNumber })) {
      for (let i = 0; i < layersNumber; i += 1) {
        const layerId = i + 1;
        layersObject[layerId] = getEmptyLayerParameters(layerId);
      }
      setLayers(layersObject);
    }
  }, [layersNumber, setLayers, validateFields]);

  const editTableRow = useCallback(
    ({ currentTarget, detail }) => {
      const {
        tagName,
        dataset: { id: layerId },
      } = currentTarget;
      if (detail === 2 && tagName === 'TR' && !currentLayer) {
        setCurrentLayer(layerId);
      }
    },
    [setCurrentLayer, currentLayer]
  );

  const editLayerParam = useCallback(
    ({ target }) => {
      const field = target.name || target.id;
      const { value } = target;
      if (field && currentLayer) {
        setLayers((prevState) => ({
          ...prevState,
          [currentLayer]: {
            ...prevState[currentLayer],
            [field]: value,
          },
        }));
      }
    },
    [setLayers, currentLayer]
  );

  const onBlur = useCallback(
    ({ relatedTarget, currentTarget }) => {
      const { tagName } = relatedTarget || {};
      if (
        !currentTarget.contains(relatedTarget) &&
        tagName !== 'LI' &&
        currentLayer &&
        validateFields(layers[currentLayer])
      ) {
        setCurrentLayer(null);
      }
    },
    [setCurrentLayer, validateFields, currentLayer, layers]
  );

  return (
    <CreateNNComponent
      goToTrain={goToTrain}
      layers={layers}
      layersNumber={layersNumber}
      editLayersNumber={editLayersNumber}
      setEmptyLayers={setEmptyLayers}
      currentLayer={currentLayer}
      editLayerParam={editLayerParam}
      onBlur={onBlur}
      editTableRow={editTableRow}
      errors={errors}
      validateField={validateField}
    />
  );
};
