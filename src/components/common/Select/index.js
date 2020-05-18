import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

export const SelectComponent = ({
  values = [],
  labelId = '',
  label = '',
  size = 'medium',
  fullWidth = false,
  defaultValue = '',
  ...props
}) => (
  <FormControl variant="outlined" fullWidth={fullWidth} size={size}>
    <InputLabel id={labelId}>{label}</InputLabel>
    <Select
      labelId={labelId}
      label={label}
      defaultValue={defaultValue}
      {...props}
    >
      {values.map(({ value, text, ...atr }) => (
        <MenuItem key={value} value={value} {...atr}>
          {text || value}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);
