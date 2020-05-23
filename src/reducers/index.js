import { combineReducers } from 'redux';
import layers from 'modules/layers/reducers';
import data from 'modules/data/reducers';
import models from 'modules/models/reducers';
import snackBar from 'modules/snackBar/reducers';

const reducer = combineReducers({
  layers,
  data,
  models,
  snackBar,
});

export default reducer;
