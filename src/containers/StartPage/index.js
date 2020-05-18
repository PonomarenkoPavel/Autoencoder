import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { CREATE_NN_URL } from '../../constants/api';
import { StartPageComponent } from '../../components/StartPage';

export const StartPage = () => {
  const history = useHistory();
  const createNN = useCallback(() => {
    history.push(CREATE_NN_URL);
  }, [history]);

  return <StartPageComponent createNN={createNN} />;
};
