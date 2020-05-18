import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  CREATE_NN_URL,
  TRAIN_NN_URL,
  TEST_NN_URL,
  ROOT,
} from '../constants/api';
import { CreateNN } from '../containers/CreateNN';
import { TestNNComponent } from './TestNNComponent';
import { TrainNNComponent } from './TrainNNConponent';
import { StartPage } from '../containers/StartPage';

export const Routes = () => (
  <Switch>
    <Route path={ROOT} exact component={StartPage} />
    <Route path={CREATE_NN_URL} exact component={CreateNN} />
    <Route path={TRAIN_NN_URL} exact component={TrainNNComponent} />
    <Route path={TEST_NN_URL} exact component={TestNNComponent} />
  </Switch>
);
