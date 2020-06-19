import {
  TRAIN_MODEL,
  trainModelSuccess,
  CREATE_MODELS,
  addModels,
  TEST_MODEL,
} from 'modules/models/actions';
import { call, takeLatest, put, select, delay } from 'redux-saga/effects';
import { getDataBatch } from 'helpers/data';
import {
  selectAutoencoderModel,
  selectEncoderModel,
  selectClassifierModel,
} from 'modules/models/selectors';
import {
  trainModel,
  trainClassifier,
  doPrediction,
  display,
  createAutoencoder,
  createClassifier,
} from 'helpers/models';
import { showSnackBar } from 'modules/snackBar/actions';
import { SNACK_BAR_ERROR } from 'constants/snackBar';
import {
  selectTrainIndices,
  selectTestIndices,
  selectTrainImages,
  selectTestImages,
  selectTestLabels,
  selectTrainLabels,
  selectInitTestImageId,
  selectInitTrainImageId,
} from 'modules/data/selectors';
import { editInitImageIds } from 'modules/data/actions';

function* createModelsWorker({ options }) {
  try {
    const arrayOfLayersOptions = Object.values(options);
    const models = yield call(createAutoencoder, arrayOfLayersOptions);
    const { classifier } = yield call(createClassifier, arrayOfLayersOptions);
    console.log('layers', classifier.layers);
    console.log('123', classifier.layers[3].getWeights());
    yield put(addModels({ ...models, classifier }));
  } catch (error) {
    yield put(showSnackBar(SNACK_BAR_ERROR, error.message));
  }
}

function* trainModelWorker({
  options: { learningOptions, sampleSizes, stopTraining },
}) {
  try {
    const model = yield select(selectAutoencoderModel);
    const encoder = yield select(selectEncoderModel);
    const classifier = yield select(selectClassifierModel);
    const trainImages = yield select(selectTrainImages);
    const testImages = yield select(selectTestImages);
    const trainIndices = yield select(selectTrainIndices);
    const testIndices = yield select(selectTestIndices);
    const trainLabels = yield select(selectTrainLabels);
    const testLabels = yield select(selectTestLabels);
    const initTestImageId = yield select(selectInitTestImageId);
    const initTrainImageId = yield select(selectInitTrainImageId);
    const {
      batch: { data: trainData },
      lastIndex: newInitTrainImageId,
    } = getDataBatch({
      batchSize: sampleSizes.train,
      // batchSize: 2500,
      images: trainImages,
      indices: trainIndices,
      initIndex: initTrainImageId,
      labels: trainLabels,
    });
    const {
      batch: { data: testData },
      lastIndex: newInitTestImageId,
    } = getDataBatch({
      batchSize: sampleSizes.test,
      // batchSize: 2500,
      images: testImages,
      indices: testIndices,
      initIndex: initTestImageId,
      labels: testLabels,
    });
    // console.log('train', trainData);
    yield call(trainModel, {
      nn: model,
      trainData,
      testData,
      batchSize: learningOptions.batchSize,
      epochs: learningOptions.epochs,
      stopTraining,
    });
    yield delay(50000);
    // console.log('testData', testData.arraySync());
    const encoderLayers = encoder.layers;
    const classifierLayers = classifier.layers;
    encoderLayers.forEach((layer, i) => {
      const weights = layer.getWeights();
      // console.log('clone', weights);
      // const copy = weights.clone();
      classifierLayers[i].setWeights(weights);
    });
    const {
      batch: { data: trainImage, labels: trainLabelsb },
      // lastIndex: newInitTrainImageId,
    } = getDataBatch({
      // batchSize: sampleSizes.train,
      batchSize: 2500,
      images: trainImages,
      indices: trainIndices,
      initIndex: newInitTrainImageId,
      labels: trainLabels,
    });
    const {
      batch: { data: testImage, labels: testLabelsb },
      // lastIndex: newInitTestImageId,
    } = getDataBatch({
      // batchSize: sampleSizes.test,
      batchSize: 500,
      images: testImages,
      indices: testIndices,
      initIndex: newInitTestImageId,
      labels: testLabels,
    });
    yield call(trainClassifier, {
      nn: classifier,
      trainImage,
      testImage,
      trainLabels: trainLabelsb,
      testLabels: testLabelsb,
      stopTraining,
    });
    yield put(
      editInitImageIds({
        initTestImageId: newInitTestImageId,
        initTrainImageId: newInitTrainImageId,
      })
    );
    yield put(trainModelSuccess());
    // trainData.dispose();
    // testData.dispose();
    // console.log('layers', encoder.layers[3].getWeights()[0].arraySync());
    // console.log('memory', tf.memory());
  } catch (error) {
    yield put(showSnackBar(SNACK_BAR_ERROR, error.message));
    yield put(trainModelSuccess());
  }
}

function* testModelWorker({ imageNumber }) {
  try {
    const model = yield select(selectAutoencoderModel);
    const classifier = yield select(selectClassifierModel);
    const testImages = yield select(selectTestImages);
    const testIndices = yield select(selectTestIndices);
    const testLabels = yield select(selectTestLabels);
    const initTestImageId = yield select(selectInitTestImageId);
    const {
      batch: { data: controlImages, labels: controlLabels },
    } = getDataBatch({
      batchSize: Number(imageNumber),
      images: testImages,
      indices: testIndices,
      initIndex: initTestImageId,
      labels: testLabels,
    });
    // const encodedData = yield call(doPrediction, encoder, controlImages);
    // const container1 = document.getElementById('initImage');
    // yield call(drawPixels, encodedData, container1);
    // console.log(controlImages, 'im', imageNumber);
    const container1 = document.getElementById('initImage');
    const container2 = document.getElementById('predsImage');
    const predictedImages = yield call(doPrediction, model, controlImages);
    const predictedLables = yield call(doPrediction, classifier, controlImages);

    yield call(display, controlImages, container1, controlLabels);
    yield call(
      display,
      predictedImages,
      container2,
      controlLabels,
      predictedLables
    );
  } catch (error) {
    yield put(showSnackBar(SNACK_BAR_ERROR, error.message));
    console.warn(error);
  }
}

export default function* mainSaga() {
  yield takeLatest(TRAIN_MODEL, trainModelWorker);
  yield takeLatest(CREATE_MODELS, createModelsWorker);
  yield takeLatest(TEST_MODEL, testModelWorker);
}
