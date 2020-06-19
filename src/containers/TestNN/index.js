import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { TestNNComponent } from 'components/TestNNComponent';
import { useValidate } from 'helpers/validations';
import { testModel } from 'modules/models/actions';
import { validationRules } from './validationRules';

export const TestNN = () => {
  const [imageNumber, setImmageNumber] = useState('');
  const { errors, validateField, validateFields } = useValidate(
    validationRules
  );
  const dispatch = useDispatch();
  const editImageNumber = useCallback(
    ({ target }) => {
      const { value } = target;
      setImmageNumber(value);
    },
    [setImmageNumber]
  );
  const testNN = useCallback(() => {
    if (validateFields({ imageNumber })) {
      dispatch(testModel(imageNumber));
    }
  }, [dispatch, imageNumber, validateFields]);

  return (
    <TestNNComponent
      errors={errors}
      validateField={validateField}
      imageNumber={imageNumber}
      editImageNumber={editImageNumber}
      testNN={testNN}
    />
  );
};
