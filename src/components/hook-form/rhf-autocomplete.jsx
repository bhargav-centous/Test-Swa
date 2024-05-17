import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@emotion/react';
import { Controller, useFormContext } from 'react-hook-form';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';

import { countries } from 'src/assets/data';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function RHFAutocomplete({ name, label, required = false, disabled = false, type, helperText, placeholder, ...other }) {
  const { control, setValue } = useFormContext();
  const { multiple } = other;

  const [isFocused, setIsFocused] = useState(false);

  const theme = useTheme();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        if (type === 'country') {
          return (
            <Stack>
              <Stack direction='row'>
                <FormLabel sx={{ ml: 0.5, mb: 1, color: name === isFocused ? theme.palette.common.black : 'text.grayishblue' }}>{label} {required && <Iconify sx={{ mb: 0.8, color: 'common.required' }} icon="fa-solid:star-of-life" width={5} />}</FormLabel>
              </Stack>
              <Autocomplete
                {...field}
                id={`autocomplete-${name}`}
                sx={{ mt: 0.5 }}
                disabled={disabled}
                autoHighlight={!multiple}
                autocomplete='off'
                onFocus={() => setIsFocused(name)}
                onBlur={() => setIsFocused()}
                disableCloseOnSelect={multiple}
                onChange={(event, newValue) => setValue(name, newValue, { shouldValidate: true })}
                renderOption={(props, option) => {
                  const country = getCountry(option);

                  if (!country.label) {
                    return null;
                  }

                  return (
                    <li {...props} key={country.label}>
                      <Iconify
                        key={country.label}
                        icon={`circle-flags:${country.code?.toLowerCase()}`}
                        sx={{ mr: 1 }}
                      />
                      {country.label} ({country.code}) +{country.phone}
                    </li>
                  );
                }}
                renderInput={(params) => {
                  const country = getCountry(params.inputProps.value);

                  const baseField = {
                    ...params,
                    // label,
                    placeholder,
                    error: !!error,
                    helperText: error ? error?.message : helperText,
                    inputProps: {
                      ...params.inputProps,
                      autoComplete: 'new-password',
                    },
                  };

                  if (multiple) {
                    return <TextField {...baseField} />;
                  }

                  return (
                    <TextField
                      {...baseField}
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            sx={{
                              ...(!country.code && {
                                display: 'none',
                              }),
                            }}
                          >
                            <Iconify
                              icon={`circle-flags:${country.code?.toLowerCase()}`}
                              sx={{ mr: -0.5, ml: 0.5 }}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  );
                }}
                renderTags={(selected, getTagProps) =>
                  selected.map((option, index) => {
                    const country = getCountry(option);

                    return (
                      <Chip
                        {...getTagProps({ index })}
                        key={country.label}
                        label={country.label}
                        icon={<Iconify icon={`circle-flags:${country.code?.toLowerCase()}`} />}
                        size="small"
                        variant="soft"
                      />
                    );
                  })
                }
                {...other}
              />
            </Stack>
          );
        }

        return (
          <Stack>
            <FormLabel sx={{ mt: 2, ml: 0.5, mb: 1, color: name === isFocused ? theme.palette.common.black : 'text.grayishblue' }}>{label} {required && <Iconify sx={{ mb: 0.8, color: 'common.required' }} icon="fa-solid:star-of-life" width={5} />}</FormLabel>
            <Autocomplete
              {...field}
              id={`autocomplete-${name}`}
              sx={{ mt: 1 }}
              disabled={disabled}
              autoComplete='off'
              onChange={(event, newValue) => setValue(name, newValue, { shouldValidate: true })}
              renderInput={(params) => (
                <TextField
                  {...params}
                  // label={label}
                  placeholder={placeholder}
                  error={!!error}
                  autoComplete='off'
                  onFocus={() => setIsFocused(name)}
                  onBlur={() => setIsFocused()}
                  helperText={error ? error?.message : helperText}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password',
                  }}
                />
              )}
              {...other}
            />
          </Stack>
        );
      }}
    />
  );
}

RHFAutocomplete.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  helperText: PropTypes.node,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
};

// ----------------------------------------------------------------------

export function getCountry(inputValue) {
  const option = countries.filter((country) => country.label === inputValue)[0];

  return {
    ...option,
  };
}
