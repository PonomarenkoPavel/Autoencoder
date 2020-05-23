import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NNComponent } from 'components/NNComponent';
import { NUM_MNIST_DATASET_ELEMENTS } from 'constants/data';
import { createAutoencoder } from 'helpers/models';
import { selectLayersOptions } from 'modules/layers/selectors';
import { addModels, trainModel } from 'modules/models/actions';
import { selectDataStatus } from 'modules/data/selectors';
import { STATUS_LOADING } from 'constants/status';
import { Loader } from 'components/common/Loader';

/**
 * TODO
 * два раза делается запрос картинок. нужно поправить
 */
export const TrainNN = () => {
  const [sampleSizes, setSampleSizes] = useState({});
  const [learningOptions, setLearningOptions] = useState({});
  const layersOptions = useSelector(selectLayersOptions);
  const dispatch = useDispatch();
  const dataStatus = useSelector(selectDataStatus);
  useEffect(() => {
    if (layersOptions.length) {
      const models = createAutoencoder(layersOptions);
      dispatch(addModels(models));
    }
  }, [layersOptions, dispatch]);
  const editSampleSize = useCallback(
    ({ target }) => {
      const field = target.id || target.name;
      const { value } = target;
      setSampleSizes((prevState) => ({ ...prevState, [field]: value }));
    },
    [setSampleSizes]
  );
  const editLearningOption = useCallback(
    ({ target }) => {
      const field = target.id || target.name;
      const { value } = target;
      setLearningOptions((prevState) => ({ ...prevState, [field]: value }));
    },
    [setLearningOptions]
  );
  const trainNN = useCallback(() => {
    dispatch(trainModel({ sampleSizes, learningOptions }));
  }, [dispatch, sampleSizes, learningOptions]);
  return (
    <>
      <NNComponent
        dataSize={NUM_MNIST_DATASET_ELEMENTS}
        sampleSizes={sampleSizes}
        editSampleSize={editSampleSize}
        learningOptions={learningOptions}
        editLearningOption={editLearningOption}
        trainNN={trainNN}
      />
      {dataStatus === STATUS_LOADING && <Loader />}
    </>
  );
};
