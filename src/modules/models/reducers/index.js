import createReducer from 'reducers/createReducer';
import { EMPTY_OBJECT } from 'constants/common';
import {
  ADD_MODELS,
  TRAIN_MODEL_SUCCESS,
  TRAIN_MODEL,
} from 'modules/models/actions';
import { assoc, mergeRight } from 'ramda';

const initialState = {
  autoencoder: EMPTY_OBJECT,
  encoder: EMPTY_OBJECT,
  decoder: EMPTY_OBJECT,
  isTraining: false,
};

const dataReducer = createReducer(initialState, {
  [ADD_MODELS]: (state, { models }) => mergeRight(state, { ...models }),
  [TRAIN_MODEL]: (state) => assoc('isTraining', true, state),
  [TRAIN_MODEL_SUCCESS]: (state) => assoc('isTraining', false, state),
});

export default dataReducer;
