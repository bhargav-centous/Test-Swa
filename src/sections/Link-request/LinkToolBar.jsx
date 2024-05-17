import PropTypes from 'prop-types';
import React, { useState, useEffect, useCallback } from 'react'

import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';

import Iconify from 'src/components/iconify';

const SearchBar = styled(TextField)`
    width:435px;
    `

export default function LinkToolBar({ onFilter, filters, brandCategoryOptions, selectedBrandyOptions, countryOptions }) {
    const [brandCategory, setBrandCategory] = useState(filters.brandCategory);

    const [country, setCountry] = useState(filters.country);

    const [selectedBrand, setSelectedBrand] = useState(filters.selectedBrand);

    useEffect(() => {
        setBrandCategory(filters?.brandCategory)
        setCountry(filters?.country)
        setSelectedBrand(filters?.selectedBrand)
    }, [filters])


    const handleChangeBrandCategory = useCallback((event) => {
        const {
            target: { value },
        } = event;
        setBrandCategory(typeof value === 'string' ? value.split(',') : value);
    }, []);

    const handleChangeCountry = useCallback((event) => {
        const {
            target: { value },
        } = event;
        setCountry(typeof value === 'string' ? value.split(',') : value);
    }, []);

    const handleChangeSelectedBrand = useCallback((event) => {
        const {
            target: { value },
        } = event;
        setSelectedBrand(typeof value === 'string' ? value.split(',') : value);
    }, []);

    const handleBrandCategoryClose = useCallback(() => {
        onFilter('brandCategory', brandCategory)
    }, [onFilter, brandCategory])

    const handleCountryClose = useCallback(() => {
        onFilter('country', country)
    }, [onFilter, country])

    const handleSelectedBrandClose = useCallback(() => {
        onFilter('selectedBrand', selectedBrand)
    }, [onFilter, selectedBrand])

    return (
        <>
            <Stack spacing={1} direction='row' >
                <FormControl
                    sx={{
                        flexShrink: 0,
                        width: { xs: 1, md: 240 },
                    }}
                >
                    <InputLabel>Brand Category</InputLabel>

                    <Select
                        value={brandCategory}
                        multiple
                        onChange={handleChangeBrandCategory}
                        onClose={handleBrandCategoryClose}
                        renderValue={(selected) => selected.map((value) => value).join(', ')}
                        sx={{ textTransform: 'capitalize' }}
                    >
                        {brandCategoryOptions?.map((brandCat, brandCatIndex) => (
                            <MenuItem key={brandCatIndex} value={brandCat.value}>{brandCat.label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl
                    sx={{
                        flexShrink: 0,
                        width: { xs: 1, md: 240 },
                    }}
                >
                    <InputLabel>By Country</InputLabel>

                    <Select
                        value={country}
                        onChange={handleChangeCountry}
                        multiple
                        onClose={handleCountryClose}
                        renderValue={(selected) => selected.map((value) => value).join(', ')}
                        sx={{ textTransform: 'capitalize' }}
                    >
                        {countryOptions?.map((countryop, countryindex) => (
                            <MenuItem key={countryindex} value={countryop.value}>{countryop.label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl
                    sx={{
                        flexShrink: 0,
                        width: { xs: 1, md: 240 },
                    }}
                >
                    <InputLabel>Select Brand</InputLabel>

                    <Select
                        value={selectedBrand}
                        onChange={handleChangeSelectedBrand}
                        onClose={handleSelectedBrandClose}
                        multiple
                        renderValue={(selected) => selected.map((value) => value).join(', ')}
                        sx={{ textTransform: 'capitalize' }}
                    >
                        {selectedBrandyOptions?.map((ele, index) => (
                            <MenuItem key={index} value={ele.value}>{ele.label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Stack>
            <Stack direction='row' justifyContent='end'>
                <SearchBar
                    placeholder="Search..."
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                            </InputAdornment>
                        ),
                    }}
                />

            </Stack>
        </>
    )

}


LinkToolBar.propTypes = {
    onFilter: PropTypes.func,
    filters: PropTypes.object,
    brandCategoryOptions: PropTypes.array,
    countryOptions: PropTypes.array,
    selectedBrandyOptions: PropTypes.array,
}