const PREFIX = 'snackBar';

export const SHOW_SNACK_BAR = `${PREFIX}/SHOW_SNACK_BAR`;
export const showSnackBar = (snackBarType = '', messageText = '') => ({
  type: SHOW_SNACK_BAR,
  snackBarType,
  messageText,
});

export const HIDE_SNACK_BAR = `${PREFIX}/HIDE_SNACK_BAR`;
export const hideSnackBar = () => ({
  type: HIDE_SNACK_BAR,
});
