'use client'

import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect, useCallback } from 'react';

import { Button } from '@mui/material';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import usePagination from 'src/hooks/use-pagination';

import { endpoints } from 'src/utils/axios';

import { fetchList } from 'src/state-management/service';
import { setSearchQuery } from 'src/state-management/CommonSlice/getListSlice';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ManageRoleView from './ManageRoleView'; // Import the custom hook

const ManageRole = () => {
    const settings = useSettingsContext();
    const router = useRouter();

    const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();
    const listStore = useSelector(state => state.list);
    const dispatch = useDispatch();
    const [isAsc, setIsAsc] = useState('desc')

    const fetchListData = useCallback((updatedPage = page, updatedRowsPerPage = rowsPerPage, searchQuery, url) => {
        const payload = {
            page: updatedPage,
            rowsPerPage: updatedRowsPerPage,
            url,
            SortBy: isAsc,
            ColumnNameForSortBy: ''

        };

        if (searchQuery !== "") {
            payload.searchQuery = searchQuery;
        }

        dispatch(fetchList(payload));
    }, [dispatch, page, rowsPerPage, isAsc]);

    useEffect(() => {
        fetchListData(page, rowsPerPage, listStore?.searchQuery, endpoints.manageRole.getRoleList);
    }, [page, rowsPerPage, listStore?.searchQuery, fetchListData]);

    const handleSearchInputChange = (value) => {
        dispatch(setSearchQuery(value)); // Dispatch setSearchQuery action to update searchQuery
    };

    const handleAddNewRole = () => {
        router.push(paths.dashboard.manageRole.create);
    };

    return (
        <Container sx={{ mt: 4 }} maxWidth={settings.themeStretch ? false : 'xl'}>
            <CustomBreadcrumbs
                heading="Manage Role"
                links={[
                    { name: 'Dashboard', href: paths.dashboard.root },
                    { name: 'Manage Role', href: paths.manageRole },
                ]}
                sx={{
                    mb: { xs: 3, md: 5 },
                }}
                action={
                    <Button
                        variant="contained"
                        onClick={handleAddNewRole}
                        startIcon={<Iconify icon="mingcute:add-line" />}
                    >
                        Add  Role
                    </Button>
                }
            />
            <ManageRoleView
                roleList={listStore?.rows}
                page={page}
                isLoading={listStore?.isLoading}
                handleSearchInputChange={handleSearchInputChange}
                rowsPerPage={rowsPerPage}
                setIsAsc={setIsAsc}
                isAsc={isAsc}
                totalCount={listStore?.totalCount}
                listStore={listStore}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Container>
    );
};

export default ManageRole;
