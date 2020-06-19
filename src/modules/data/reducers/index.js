import createReducer from 'reducers/createReducer';
import { EMPTY_OBJECT, EMPTY_ARRAY } from 'constants/common';
import { assoc, mergeRight } from 'ramda';
import { STATUS_NOT_REQUESTED, STATUS_LOADING } from 'constants/status';
import {
  FETCH_DATA,
  FETCH_DATA_SUCCESS,
  SET_STATUS,
  EDIT_INIT_IMAGE_IDS,
} from 'modules/data/actions';

const initialState = {
  trainImages: EMPTY_ARRAY,
  testImages: EMPTY_ARRAY,
  testIndices: EMPTY_OBJECT,
  trainIndices: EMPTY_OBJECT,
  initTestImageId: 0,
  initTrainImageId: 0,
  status: STATUS_NOT_REQUESTED,
};

const dataReducer = createReducer(initialState, {
  [SET_STATUS]: (state, { status }) => assoc('status', status, state),
  [FETCH_DATA]: (state) => assoc('status', STATUS_LOADING, state),
  [FETCH_DATA_SUCCESS]: (state, { payload }) =>
    mergeRight(state, { status: STATUS_NOT_REQUESTED, ...payload }),
  [EDIT_INIT_IMAGE_IDS]: (state, { ids }) => mergeRight(state, ids),
});

export default dataReducer;
