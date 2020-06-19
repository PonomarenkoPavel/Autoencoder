import { fork } from 'redux-saga/effects';
import modelsSaga from 'modules/models/sagas';
import dataSaga from 'modules/data/sagas';

/**
 * Root saga watcher. Launches all saga watchers
 */
export default function* rootSaga() {
  yield fork(modelsSaga);
  yield fork(dataSaga);
}
