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

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
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
