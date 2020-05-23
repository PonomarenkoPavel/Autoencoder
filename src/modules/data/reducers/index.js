import createReducer from 'reducers/createReducer';
import { EMPTY_OBJECT } from 'constants/common';
import { assoc, mergeRight } from 'ramda';
import { STATUS_NOT_REQUESTED, STATUS_LOADING } from 'constants/status';
import {
  FETCH_DATA,
  FETCH_DATA_SUCCESS,
  SET_STATUS,
} from 'modules/data/actions';

const initialState = {
  data: EMPTY_OBJECT,
  status: STATUS_NOT_REQUESTED,
};

const dataReducer = createReducer(initialState, {
  [SET_STATUS]: (state, { status }) => assoc('status', status, state),
  [FETCH_DATA]: (state) => assoc('status', STATUS_LOADING, state),
  [FETCH_DATA_SUCCESS]: (state, { data }) =>
    mergeRight(state, { status: STATUS_NOT_REQUESTED, data }),
});

export default dataReducer;
