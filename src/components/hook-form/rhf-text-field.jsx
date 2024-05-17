import { useState } from 'react';
import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import { useTheme } from '@mui/material/styles';

import Iconify from '../iconify';

// ----------------------------------------------------------------------

export default function RHFTextField({ name, multiline = false, placeholder, sx = {}, label, helperText, type, disabled = false, required = false, ...other }) {
  const { control } = useFormContext();
  const [isFocused, setIsFocused] = useState(false);


  let extraFields = {}

  try {
    if (multiline) {
      extraFields = {
        multiline,
        minRows: 4,// <-- Adjust rows as needed
        maxRows: 8,// <-- Adjust rows as needed
      }
    }
  } catch (error) {
    console.log(error)
  }

  const theme = useTheme();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Stack>
          <Stack direction='row'>
            <FormLabel sx={{ ml: 0.5, mb: 1, color: name === isFocused ? theme.palette.common.black : 'text.grayishblue' }}>{label} {required && <Iconify sx={{ mb: 0.8, color: 'common.required' }} icon="fa-solid:star-of-life" width={5} />}</FormLabel>
          </Stack>
          <TextField
            {...field}
            fullWidth
            {...extraFields}
            sx={sx}
            placeholder={placeholder}
            type={type}
            disabled={disabled}
            value={type === 'number' && field.value === 0 ? '' : field.value}
            onChange={(event) => {
              if (type === 'number') {
                field.onChange(Number(event.target.value));
              } else {
                field.onChange(event.target.value);
              }
            }}
            onFocus={() => setIsFocused(name)}
            onBlur={() => setIsFocused()}
            error={!!error}
            autoComplete='off'
            helperText={error ? error?.message : helperText}
            variant='outlined'
            {...other}
          />
        </Stack>
      )
      }
    />
  );
}

RHFTextField.propTypes = {
  helperText: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  multiline: PropTypes.bool,
  disabled: PropTypes.bool,
  sx: PropTypes.object,
};
