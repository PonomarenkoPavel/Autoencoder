import { FETCH_DATA, fetchDataSuccess } from 'modules/data/actions';
import { call, takeLatest, put } from 'redux-saga/effects';
import { showSnackBar } from 'modules/snackBar/actions';
import {
  fetchMNISTData,
  getIndices,
  getTrainTestImages,
  getTrainTestLabels,
  fetchMNISTLabels,
} from 'helpers/data';
import { SNACK_BAR_ERROR } from 'constants/snackBar';

function* fetchDataWorker() {
  try {
    const images = yield call(fetchMNISTData);
    const labels = yield call(fetchMNISTLabels);
    const { testIndices, trainIndices } = yield call(getIndices);
    const { trainImages, testImages } = yield call(getTrainTestImages, images);
    const { trainLabels, testLabels } = yield call(getTrainTestLabels, labels);
    yield put(
      fetchDataSuccess({
        testIndices,
        trainIndices,
        trainImages,
        testImages,
        trainLabels,
        testLabels,
      })
    );
  } catch (error) {
    yield put(showSnackBar(SNACK_BAR_ERROR, error.message));
  }
}

export default function* mainSaga() {
  yield takeLatest(FETCH_DATA, fetchDataWorker);
}
