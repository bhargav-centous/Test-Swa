'use client'

import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import React, { useMemo, useState, useEffect, useCallback } from 'react'

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import usePagination from 'src/hooks/use-pagination';

import { endpoints } from 'src/utils/axios';

import { fetchList, fetchGoalType } from 'src/state-management/service';
import { setSearchQuery } from 'src/state-management/CommonSlice/getListSlice';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import GoalQuestionList from './GoalQuestionList';



const GoalQuestionView = () => {
    const settings = useSettingsContext();
    const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();
    const [isAsc, setIsAsc] = useState('desc')
    const listStore = useSelector(state => state.list);
    const dispatch = useDispatch();
    const [selectedGoalType, setSelectedGoalType] = useState([]);
    const router = useRouter()

    const fetchListData = useCallback((updatedPage = page, updatedRowsPerPage = rowsPerPage, searchQuery, url) => {
        const payload = {
            page: updatedPage,
            rowsPerPage: updatedRowsPerPage,
            url,
            SortBy: isAsc
        };

        if (searchQuery !== "") {
            payload.searchQuery = searchQuery;
        }

        dispatch(fetchList(payload));
    }, [dispatch, page, rowsPerPage, isAsc]);

    useEffect(() => {
        fetchListData(page, rowsPerPage, listStore?.searchQuery, endpoints.goalQuestion.goalQuestion);
    }, [page, rowsPerPage, listStore?.searchQuery, fetchListData]);

    useEffect(() => {
        dispatch(fetchGoalType({ url: endpoints.settings.Goals }))
    }, [dispatch])

    const handleSearchInputChange = (value) => {
        dispatch(setSearchQuery(value)); // Dispatch setSearchQuery action to update searchQuery
    };

    const handleAddGoalQuestion = () => {
        router.push(paths.dashboard.goalQuestion.add);
    };

    const handleGoalTypeChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedGoalType(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    }

    const renderData = useMemo(() => {
        if (selectedGoalType?.length > 0) {
            return listStore?.rows.filter((item) => selectedGoalType.includes(item.goalType))
        }
        return listStore?.rows

    }, [selectedGoalType, listStore])

    return (
        <Container sx={{ mt: 4 }} maxWidth={settings.themeStretch ? false : 'xl'}>
            <CustomBreadcrumbs
                heading="Goal Question"
                links={[
                    { name: 'Dashboard', href: paths.dashboard.root },
                    { name: 'Goal Question', href: paths.dashboard.goalQuestion.root },
                ]}
                sx={{
                    mb: { xs: 3, md: 5 },
                }}
                action={
                    <Button
                        variant="contained"
                        onClick={handleAddGoalQuestion}
                        startIcon={<Iconify icon="mingcute:add-line" />}
                    >
                        Add Goal Question
                    </Button>
                }
            />
            <GoalQuestionList
                list={renderData}
                isLoading={listStore?.isLoading}
                page={page}
                selectedGoalType={selectedGoalType}
                goalType={listStore?.masterData?.goalType}
                totalCount={listStore?.totalCount}
                handleSearchInputChange={handleSearchInputChange}
                rowsPerPage={rowsPerPage}
                handleGoalTypeChange={handleGoalTypeChange}
                setIsAsc={setIsAsc}
                isAsc={isAsc}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Container>
    )
}

export default GoalQuestionView