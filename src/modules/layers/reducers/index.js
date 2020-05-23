import { ADD_LAYERS_PARAMETERS } from 'modules/layers/actions';
import { EMPTY_ARRAY, EMPTY_OBJECT } from 'constants/common';
import { assoc } from 'ramda';
import createReducer from 'reducers/createReducer';

const initialState = {
  parameters: EMPTY_ARRAY,
  layers: EMPTY_OBJECT,
};

const layersReducer = createReducer(initialState, {
  [ADD_LAYERS_PARAMETERS]: (state, { param }) =>
    assoc('parameters', Object.values(param), state),
});

export default layersReducer;
