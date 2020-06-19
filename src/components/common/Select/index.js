import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@material-ui/core';

export const SelectComponent = ({
  size,
  error,
  label,
  values,
  labelId,
  fullWidth,
  helperText,
  defaultValue,
  ...props
}) => (
  <FormControl
    variant="outlined"
    fullWidth={fullWidth}
    error={error}
    size={size}
  >
    <InputLabel id={labelId}>{label}</InputLabel>
    <Select
      labelId={labelId}
      label={label}
      defaultValue={defaultValue}
      {...props}
    >
      {Object.entries(values).map(([value, text]) => (
        <MenuItem key={value} value={value}>
          {text || value}
        </MenuItem>
      ))}
    </Select>
    <FormHelperText>{helperText}</FormHelperText>
  </FormControl>
);

SelectComponent.propTypes = {
  error: PropTypes.bool,
  size: PropTypes.string,
  fullWidth: PropTypes.bool,
  helperText: PropTypes.string,
  defaultValue: PropTypes.string,
  values: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  labelId: PropTypes.string.isRequired,
};

SelectComponent.defaultProps = {
  error: false,
  size: 'medium',
  helperText: '',
  defaultValue: '',
  fullWidth: false,
};
