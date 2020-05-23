import { isRequired, isNumber, inRange } from 'helpers/validations';

export const validationRules = {
  units: [isRequired(), isNumber(), inRange(0, 10000)],
  act: [isRequired()],
};
