import React from 'react';
import { Grid } from '@material-ui/core';
import { TrainNNComponent } from 'components/TrainNNConponent';
import { TestNNComponent } from 'components/TestNNComponent';
import { HeaderComponent } from 'components/common/Header';
export const NNComponent = ({ sampleSizes, learningOptions, ...props }) => (
  <>
    <HeaderComponent text="Обучение и тестирование нейронной сети" />
    <Grid container spacing={3}>
      <Grid item xs={7}>
        <TrainNNComponent
          testSampleSize={sampleSizes.test}
          trainSampleSize={sampleSizes.train}
          epochs={learningOptions.epochs}
          batchSize={learningOptions.batchSize}
          {...props}
        />
      </Grid>
    </Grid>
    <TestNNComponent />
  </>
);
