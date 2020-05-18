import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TRAIN_NN_URL, ROOT } from 'constants/api';
import { CreateNNComponent } from 'components/CreateNNComponent';
import { getEmptyLayerParameters } from 'helpers/layers';

export const CreateNN = () => {
  const history = useHistory();
  const [layersNumber, setLayersNumber] = useState('');
  const [layers, setLayers] = useState({});
  const [currentLayer, setCurrentLayer] = useState(null);

  const goToTrain = useCallback(() => {
    history.push(TRAIN_NN_URL);
  }, [history]);

  const goBack = useCallback(() => {
    history.push(ROOT);
  }, [history]);

  const editLayersNumber = useCallback(
    ({ target }) => setLayersNumber(target.value),
    [setLayersNumber]
  );

  const setEmptyLayers = useCallback(() => {
    const layersObject = {};
    for (let i = 0; i < layersNumber; i += 1) {
      const layerId = i + 1;
      layersObject[layerId] = getEmptyLayerParameters(layerId);
    }
    setLayers(layersObject);
  }, [layersNumber, setLayers]);

  const editTableRow = useCallback(
    ({ currentTarget, detail }) => {
      const {
        tagName,
        dataset: { id: layerId },
      } = currentTarget;
      if (detail === 2 && tagName === 'TR') {
        setCurrentLayer(layerId);
      }
    },
    [setCurrentLayer]
  );

  const editLayerParam = useCallback(
    ({ target }) => {
      const field = target.name || target.id;
      const { value } = target;
      console.log('vale', value, 'field', field, 'id', currentLayer);
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
      if (!currentTarget.contains(relatedTarget) && tagName !== 'LI') {
        setCurrentLayer(null);
      }
    },
    [setCurrentLayer]
  );
  return (
    <CreateNNComponent
      goToTrain={goToTrain}
      goBack={goBack}
      layers={layers}
      layersNumber={layersNumber}
      editLayersNumber={editLayersNumber}
      setEmptyLayers={setEmptyLayers}
      currentLayer={currentLayer}
      editLayerParam={editLayerParam}
      onBlur={onBlur}
      editTableRow={editTableRow}
    />
  );
};
