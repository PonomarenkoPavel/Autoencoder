import { isRequired, isNumber, inRange } from 'helpers/validations';

export const validationRules = {
  train: [isRequired(), isNumber(), inRange(0, 65000)],
  test: [isRequired(), isNumber(), inRange(0, 10000)],
  batchSize: [isRequired(), isNumber(), inRange(0, 65000)],
  epochs: [isRequired(), isNumber(), inRange(0, 1000)],
};
