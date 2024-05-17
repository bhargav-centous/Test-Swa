import React from 'react'
import PropTypes from 'prop-types'

import { TextField, InputAdornment } from '@mui/material'

import Iconify from 'src/components/iconify';

const SearchBar = ({ onChange, value, sx = {}, ...other }) => (
    <TextField
        {...other}
        sx={sx}
        placeholder="Search..."
        autoComplete='off'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
            ),
        }}
    />
)

SearchBar.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
    sx: PropTypes.object,
}

export default SearchBar