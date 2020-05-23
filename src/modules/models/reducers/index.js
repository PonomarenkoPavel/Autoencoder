import createReducer from 'reducers/createReducer';
import { EMPTY_OBJECT } from 'constants/common';
import { ADD_MODELS } from 'modules/models/actions';
import { assoc } from 'ramda';

const initialState = {
  models: EMPTY_OBJECT,
};

const dataReducer = createReducer(initialState, {
  [ADD_MODELS]: (state, { models }) => assoc('models', models, state),
});

export default dataReducer;
