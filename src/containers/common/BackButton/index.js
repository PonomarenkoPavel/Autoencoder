import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { BackButtonComponent } from 'components/common/BackButton';

/**
 * BackButton container
 */
export const BackButton = ({ redirectUrl }) => {
  const history = useHistory();

  const handleClick = useCallback(() => {
    if (redirectUrl) {
      history.push(redirectUrl);
    } else {
      history.goBack();
    }
  }, [history, redirectUrl]);

  return <BackButtonComponent handleClick={handleClick} />;
};
