'use client'

import React from 'react'
import styled from '@emotion/styled';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import { linkedRequest } from 'src/utils/constant';

import Iconify from 'src/components/iconify';

import LinkItem from '../CommonComponents/LinkItem';
import { LinkItemSkeleton } from '../CommonComponents/link-request-skleton';

const SearchBar = styled(TextField)`
    width:435px;
    `


const renderSkeleton = (
    <>
        {[...Array(4)].map((_, index) => (
            <Grid item key={index}>
                <LinkItemSkeleton key={index} variant="horizontal" />
            </Grid>
        ))}
    </>
);

const renderList = (
    <>
        {linkedRequest.map((post, index) => (
            <Grid item key={post.id} xs={12} sm={12} md={6}>
                <LinkItem post={post} />
            </Grid>
        ))}
    </>
);

const LinkedRequestView = () => {
    const loading = false
    return (
        <>
            <Stack pb={7} direction='row' justifyContent='end'>
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
            <Grid container spacing={3}>
                {loading ? renderSkeleton : renderList}
            </Grid>
        </>
    )
}

export default LinkedRequestView