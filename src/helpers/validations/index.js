import { useState, useCallback } from 'react';
import { isNumeric } from 'helpers/common';

export const isRequired = () => ({
  rule: (value) => !!value,
  message: 'Это поле обязательно для заполнения',
});

export const inRange = (from, to) => ({
  rule: (value) => Number(value) >= Number(from) && Number(value) <= Number(to),
  message: `Значение должно быть больше ${from} и меньше ${to}`,
});

export const isNumber = () => ({
  rule: (value) => isNumeric(value),
  message: 'Значение должно быть числом',
});

export const useValidate = (rules) => {
  const [errors, setErrors] = useState({});
  const validateField = ({ target }) => {
    const filed = target.id || target.name;
    const { value } = target;
    const filedRules = rules[filed];
    if (Array.isArray(rules[filed])) {
      const fieldError =
        filedRules
          .map(({ rule, message }) => (rule(value) ? '' : message))
          .filter((error) => !!error)[0] || '';

      setErrors((prevState) => ({
        ...prevState,
        [filed]: fieldError,
      }));
    }
  };
  const validateFields = (values) => {
    const fieldsError = Object.entries(values).map(([field, value]) => {
      const fieldRules = rules[field] || [];
      const fieldError =
        fieldRules
          .map(({ rule, message }) => (rule(value) ? '' : message))
          .filter((error) => !!error)[0] || '';
      return { [field]: fieldError };
    });
    setErrors(fieldsError.reduce((acc, e) => ({ ...acc, ...e }), {}));
    return fieldsError.every((object) => !Object.values(object)[0]);
  };
  return {
    errors,
    validateField: useCallback(validateField, [rules, setErrors]),
    validateFields: useCallback(validateFields, [setErrors]),
  };
};
