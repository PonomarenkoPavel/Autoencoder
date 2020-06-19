import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import reducer from 'reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from 'App';
import rootSaga from 'sagas';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import * as serviceWorker from './serviceWorker';

const actionSanitizer = (action) =>
  action.type === 'data/FETCH_DATA_SUCCESS'
    ? {
        ...action,
        payload: {
          trainImages: 'ARRAY_OF_TRAIN_IMAGES_PIXELS',
          testImages: 'ARRAY_OF_TEST_IMAGES_PIXELS',
          testLabels: 'ARRAY_OF_TEST_LABELS',
          trainLabels: 'ARRAY_OF_TRAIN_LABELS',
        },
      }
    : action;

const composeEnhancers = composeWithDevTools({
  actionSanitizer,
  stateSanitizer: (state) => ({
    ...state,
    data: {
      ...state.data,
      trainImages: 'ARRAY_OF_TRAIN_IMAGES_PIXELS',
      testImages: 'ARRAY_OF_TEST_IMAGES_PIXELS',
      testLabels: 'ARRAY_OF_TEST_LABELS',
      trainLabels: 'ARRAY_OF_TRAIN_LABELS',
    },
  }),
});
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
