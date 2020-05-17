import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  CREATE_NN_URL,
  TRAIN_NN_URL,
  TEST_NN_URL,
  ROOT,
} from '../constants/api';
import { CreateNNComponent } from './CreateNNComponent';
import { TestNNComponent } from './TestNNComponent';
import { TrainNNComponent } from './TrainNNConponent';
import { StartPage } from './pages/StartPage';

export const Routes = () => (
  <Switch>
    <Route path={ROOT} exact component={StartPage} />
    <Route path={CREATE_NN_URL} exact component={CreateNNComponent} />
    <Route path={TRAIN_NN_URL} exact component={TrainNNComponent} />
    <Route path={TEST_NN_URL} exact component={TestNNComponent} />
  </Switch>
);
