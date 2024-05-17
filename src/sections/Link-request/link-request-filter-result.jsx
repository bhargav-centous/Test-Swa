import PropTypes from 'prop-types';
import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


// ----------------------------------------------------------------------

export default function LinkTableFiltersResult({
    filters,
    onFilters,
    //
    onResetFilters,
    //
    results,
    // ...other
}) {
    const handleRemoveBrandCategory = useCallback(
        (inputValue) => {
            const newValue = filters.brandCategory.filter((item) => item !== inputValue);

            onFilters('brandCategory', newValue);
        },
        [filters.brandCategory, onFilters]
    );

    const handleRemoveCountry = useCallback(
        (inputValue) => {
            const newValue = filters.country.filter((item) => item !== inputValue);

            onFilters('country', newValue);
        },
        [filters.country, onFilters]
    );

    const handleRemoveSelectedBrand = useCallback(
        (inputValue) => {
            const newValue = filters.selectedBrand.filter((item) => item !== inputValue);

            onFilters('selectedBrand', newValue);
        },
        [filters.selectedBrand, onFilters]
    );

    return (
        <Stack spacing={1.5}>
            <Stack flexGrow={1} justifyContent='space-between' spacing={1} direction="row" flexWrap="wrap" alignItems="center">
                <Stack spacing={1} direction="row">

                    {!!filters.brandCategory.length && (
                        <Block label="Brand Category:">
                            {filters.brandCategory.map((item, index) => (
                                <Chip key={index} label={item} size="small" onDelete={() => handleRemoveBrandCategory(item)} />
                            ))}
                        </Block>
                    )}
                    {!!filters.country.length && (
                        <Block label="Country:">
                            {filters.country.map((item, inde) => (
                                <Chip label={item} key={inde} size="small" onDelete={() => handleRemoveCountry(item)} />
                            ))}
                        </Block>
                    )}
                    {!!filters.selectedBrand.length && (
                        <Block label="Brand:">
                            {filters.selectedBrand.map((item, index) => (
                                <Chip label={item} size="small" key={index} onDelete={() => handleRemoveSelectedBrand(item)} />
                            ))}
                        </Block>
                    )}
                </Stack>
                <Button
                    sx={{ borderBottom: '1px solid', borderRadius: '0px' }}
                    onClick={onResetFilters}
                // color="error"
                // startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
                >
                    Clear Filters
                </Button>
            </Stack>
        </Stack>
    );
}

LinkTableFiltersResult.propTypes = {
    filters: PropTypes.object,
    onFilters: PropTypes.func,
    results: PropTypes.number,
    onResetFilters: PropTypes.func,
};

// ----------------------------------------------------------------------

function Block({ label, children, sx, ...other }) {
    return (
        <Stack
            component={Paper}
            variant="outlined"
            spacing={1}
            direction="row"
            sx={{
                p: 1,
                borderRadius: 1,
                overflow: 'hidden',
                borderStyle: 'dashed',
                border: '1px dashed #e8e8e8',
                backgroundColor: 'background.lightGray',
                ...sx,
            }}
            {...other}
        >
            <Box component="span" sx={{ typography: 'subtitle2' }}>
                {label}
            </Box>

            <Stack spacing={1} direction="row" flexWrap="wrap">
                {children}
            </Stack>
        </Stack>
    );
}

Block.propTypes = {
    children: PropTypes.node,
    label: PropTypes.string,
    sx: PropTypes.object,
};
