import { isRequired, isNumber, inRange } from 'helpers/validations';

export const validationRules = {
  imageNumber: [isRequired(), isNumber(), inRange(0, 100)],
};
