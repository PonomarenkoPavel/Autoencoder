import createReducer from 'reducers/createReducer';
import { mergeRight, always } from 'ramda';
import { SHOW_SNACK_BAR, HIDE_SNACK_BAR } from 'modules/snackBar/actions';

const initialState = { snackBarType: '', messageText: '' };

const modalsReducer = createReducer(initialState, {
  [SHOW_SNACK_BAR]: (state, { snackBarType = '', messageText = '' }) =>
    mergeRight(state, {
      snackBarType,
      messageText,
    }),
  [HIDE_SNACK_BAR]: always(initialState),
});

export default modalsReducer;
