import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NNComponent } from 'components/NNComponent';
import { NUM_MNIST_DATASET_ELEMENTS } from 'constants/data';
import { trainModel } from 'modules/models/actions';
import { selectDataStatus } from 'modules/data/selectors';
import { STATUS_LOADING } from 'constants/status';
import { Loader } from 'components/common/Loader';
import { stopTrainingCallback } from 'helpers/callbacks';
import { selectIsTrainingStatus } from 'modules/models/selectors';
import { useValidate } from 'helpers/validations';
import { fetchData } from 'modules/data/actions';
import { useHistory } from 'react-router-dom';
import { TEST_NN_URL } from 'constants/api';
import { validationRules } from './validationRules';

const defaultSampleSizes = {
  train: 5500,
  test: 1000,
};

const defaultLearningOptions = {
  batchSize: 250,
  epochs: 50,
};

export const TrainNN = () => {
  const [sampleSizes, setSampleSizes] = useState(defaultSampleSizes);
  const [learningOptions, setLearningOptions] = useState(
    defaultLearningOptions
  );
  const { errors, validateField, validateFields } = useValidate(
    validationRules
  );
  const { updateState, stopTraining } = useMemo(
    () => stopTrainingCallback(),
    []
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const dataStatus = useSelector(selectDataStatus);
  const isTraining = useSelector(selectIsTrainingStatus);
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
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
  const handleClick = useCallback(() => {
    updateState(true);
  }, [updateState]);
  const trainNN = useCallback(() => {
    if (validateFields({ ...sampleSizes, ...learningOptions })) {
      dispatch(trainModel({ sampleSizes, learningOptions, stopTraining }));
    }
  }, [dispatch, sampleSizes, learningOptions, stopTraining, validateFields]);
  const goToTest = useCallback(() => {
    history.push(TEST_NN_URL);
  }, [history]);
  const isLoading = dataStatus === STATUS_LOADING;

  return (
    <>
      <NNComponent
        dataSize={NUM_MNIST_DATASET_ELEMENTS}
        sampleSizes={sampleSizes}
        editSampleSize={editSampleSize}
        learningOptions={learningOptions}
        editLearningOption={editLearningOption}
        trainNN={trainNN}
        handleClick={handleClick}
        isTraining={isTraining}
        errors={errors}
        validateField={validateField}
        goToTest={goToTest}
      />
      {isLoading && <Loader />}
    </>
  );
};
