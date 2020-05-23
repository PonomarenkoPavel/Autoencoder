import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSnackBar } from 'modules/snackBar/selectors';
import { commonMessages, SNACK_BAR_TIMEOUT } from 'constants/snackBar';
import { SnackBarComponent } from 'components/common/SnackBar';
import { hideSnackBar } from 'modules/snackBar/actions';

/**
 * SnackBar container.
 * Provides brief messages about app processes.
 */
export const SnackBar = () => {
  const dispatch = useDispatch();
  const { snackBarType, messageText } = useSelector(selectSnackBar);

  // The reason prop is used to ignore click outside SnackBar
  const onClose = useCallback(
    (_, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      dispatch(hideSnackBar());
    },
    [dispatch]
  );

  if (!snackBarType) {
    return null;
  }

  return (
    <SnackBarComponent
      timeout={SNACK_BAR_TIMEOUT}
      severity={snackBarType}
      message={messageText || commonMessages[snackBarType]}
      onClose={onClose}
    />
  );
};
