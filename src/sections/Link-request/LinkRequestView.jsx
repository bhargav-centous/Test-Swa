'use client'

import { isEqual } from 'lodash';
import React, { useState, useCallback } from 'react'

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

import { linkRequest, countryOptions, brandCategoryOptions, selectedBrandyOptions } from 'src/utils/constant';

import LinkToolBar from './LinkToolBar';
import LinkItem from '../CommonComponents/LinkItem';
import LinkTableFiltersResult from './link-request-filter-result';
import { LinkItemSkeleton } from '../CommonComponents/link-request-skleton';


const renderSkeleton = (
    <>
        {[...Array(4)].map((_, index) => (
            <Grid md={6} item key={index}>
                <LinkItemSkeleton key={index} variant="horizontal" />
            </Grid>
        ))}
    </>
);

const renderList = (
    <>
        {linkRequest.map((post, index) => (
            <Grid item key={post.id} xs={12} sm={12} md={6}>
                <LinkItem post={post} />
            </Grid>
        ))}
    </>
);

const defaultFilters = {
    brandCategory: [],
    country: [],
    selectedBrand: [],
};


const LinkRequestView = () => {
    const [filters, setFilters] = useState(defaultFilters);

    const handleFilters = useCallback((name, value) => {
        setFilters((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }, []);

    const loading = false


    const handleResetFilters = useCallback(() => {
        setFilters(defaultFilters);
    }, []);

    const canReset = !isEqual(defaultFilters, filters);
    return (
        <>
            {!loading &&
                <Stack spacing={2} pb={4} direction='row' justifyContent='space-between'>
                    <LinkToolBar
                        onFilter={handleFilters}
                        filters={filters}
                        brandCategoryOptions={brandCategoryOptions}
                        selectedBrandyOptions={selectedBrandyOptions}
                        countryOptions={countryOptions}
                    />
                </Stack>}
            {canReset &&
                <Stack pb={6}>
                    <LinkTableFiltersResult
                        filters={filters}
                        onFilters={handleFilters}
                        onResetFilters={handleResetFilters}
                    />
                </Stack>}
            <Grid pb={10} container spacing={3}>
                {loading ? renderSkeleton : renderList}
            </Grid>
        </>
    )
}

export default LinkRequestView
