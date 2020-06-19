import { isRequired, isNumber, inRange } from 'helpers/validations';

export const validationRules = {
  layersNumber: [isRequired(), isNumber(), inRange(0, 100)],
  units: [isRequired(), isNumber(), inRange(0, 10000)],
  act: [isRequired()],
};
