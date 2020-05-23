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
import { trainModel } from 'helpers/models';
import * as tf from '@tensorflow/tfjs';

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
  console.log('opt', options, 'model', model);
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
    batchSize: 1,
    testImages,
    testIndices,
    initIndex: shuffledTestIndex,
    // initIndex: 0,
  });
  console.log('constrolData', controlData.print());
  doPrediction(model, controlData);
}

export default function* mainSaga() {
  yield takeLatest(TRAIN_MODEL, trainModelWorker);
}

async function doPrediction(model, data) {
  const preds = model.predict(data);
  await show(data, 'Оригинальные изображения');
  await show(preds, 'Предсказанные');
  data.dispose();
}

async function show(examples, name) {
  // Количество изображений, которое нужно вывести на экран
  const numExamples = examples.shape[0];
  const header = document.createElement('h2');
  header.innerText = name;
  document.body.appendChild(header);
  const images = document.createElement('div');
  document.body.appendChild(images);
  // Create a canvas element to render each example
  for (let i = 0; i < numExamples; i += 1) {
    const imageTensor = tf.tidy(() =>
      // Reshape the image to 28x28 px
      examples.slice([i, 0], [1, examples.shape[1]]).reshape([28, 28, 1])
    );
    const canvas = document.createElement('canvas');

    canvas.width = 28;
    canvas.height = 28;
    canvas.style = 'margin: 4px;';
    tf.browser.toPixels(imageTensor, canvas);
    images.appendChild(canvas);

    imageTensor.dispose();
  }
}
