import { TRAIN_MODEL } from 'modules/models/actions';
import { setDataStatus } from 'modules/data/actions';
import { call, takeLatest, put, select } from 'redux-saga/effects';
import {
  fetchMNISTData,
  getIndices,
  getTrainTestData,
  getDataBatch,
} from 'helpers/data';
import { STATUS_LOADING, STATUS_NOT_REQUESTED } from 'constants/status';
import { selectAutoencoderModel } from 'modules/models/selectors';
import { trainModel, doPrediction, display } from 'helpers/models';

/**
 * Использовать статус у данных, а не модели
 */
function* trainModelWorker({ options }) {
  const { learningOptions, sampleSizes } = options;
  yield put(setDataStatus(STATUS_LOADING));
  const data = yield call(fetchMNISTData);
  yield put(setDataStatus(STATUS_NOT_REQUESTED));
  const model = yield select(selectAutoencoderModel);
  const { trainIndices, testIndices } = getIndices();
  const { trainImages, testImages } = getTrainTestData(data);
  const { batch: trainData } = getDataBatch({
    batchSize: sampleSizes.train,
    testImages: trainImages,
    testIndices: trainIndices,
    initIndex: 0,
  });
  const { batch: testData, shuffledTestIndex } = getDataBatch({
    batchSize: sampleSizes.test,
    testImages,
    testIndices,
    initIndex: 0,
  });
  yield call(trainModel, {
    nn: model,
    trainData,
    testData,
    batchSize: +learningOptions.batchSize,
    epochs: +learningOptions.epochs,
  });
  const { batch: controlData } = getDataBatch({
    batchSize: 10,
    testImages,
    testIndices,
    initIndex: shuffledTestIndex,
  });
  const container1 = document.getElementById('initImage');
  const container2 = document.getElementById('predsImage');
  const preds = yield call(doPrediction, model, controlData);
  yield call(display, controlData, container1);
  yield call(display, preds, container2);
}

export default function* mainSaga() {
  yield takeLatest(TRAIN_MODEL, trainModelWorker);
}
