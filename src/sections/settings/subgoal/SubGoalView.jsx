'use client'

import { find } from 'lodash';
import { enqueueSnackbar } from 'notistack';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {
    GridRowModes,
    useGridApiRef,
} from '@mui/x-data-grid';

import UseSettingActions from 'src/hooks/Settings/use-setting-actions';

import { endpoints, getRequest, putRequest, postRequest } from 'src/utils/axios';

import { setRows } from 'src/state-management/Settings/SettingSlice';

import SearchBar from 'src/components/SearchInput/SearchBar';

import TableData from '../scoringpartnertype/TableData';


export default function SubGoalView() {
    const [goals, setGoals] = useState([])
    const subGoalTypes = useSelector(state => state.scoringPartnerType);
    const apiRef = useGridApiRef();
    const { fetchListData, handleSearchInputChange, page, searchQuery, rowsPerPage, handleChangePage, handleChangeRowsPerPage, handleDeleteClick, handleEditClick, handleCancelClick, rowModesModel, setRowModesModel } = UseSettingActions();
    const rows = subGoalTypes?.rows || []
    const dispatch = useDispatch();
    const url = endpoints.settings.SubGoal

    const getMasterData = (callGoalAPI) => {
        if (callGoalAPI) {
            getRequest(`${endpoints.settings.Goals}?PageNumber=1&PageSize=1000`).
                then((res) => {
                    setGoals(res.data.items)
                }).catch((err) => {
                    console.log(err)
                })
        }
    }

    useEffect(() => {
        getMasterData(true, true)
    }, [])

    useEffect(() => {
        fetchListData(searchQuery, endpoints.settings.SubGoal, subGoalTypes?.SortBy, subGoalTypes?.ColumnNameForSortBy);
    }, [searchQuery, fetchListData, subGoalTypes?.SortBy, subGoalTypes?.ColumnNameForSortBy]);



    const handleSaveClick = ({ id, row }) => async () => {
        const record = apiRef.current.getRowWithUpdatedValues(row?.id)
        let response = {};
        if (record?.goalName === '') {
            enqueueSnackbar("goal Name can not be empty", { variant: 'error' })
            setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
            return
        }
        if (record?.subGoalDescription === '') {
            enqueueSnackbar("sub Goal Description can not be empty", { variant: 'error' })
            setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
            return
        }
        if (record?.subGoalName === '') {
            enqueueSnackbar("sub Goal Name can not be empty", { variant: 'error' })
            setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
            return
        }

        const goalNumber = find(goals, { goalName: record?.goalName })?.id
        if (row?.isNew) { // Add 
            const addPayload = {
                goalNumber,
                subGoalName: record?.subGoalName,
                subGoalDescription: record?.subGoalDescription
            }
            response = await postRequest(endpoints.settings.SubGoal, addPayload)
        } else { // update
            const postPayload = {
                id,
                subGoalDescription: record?.subGoalDescription,
                subGoalName: record?.subGoalName,
                goalNumber
            }
            response = await putRequest(`${endpoints.settings.SubGoal}/${id}`, postPayload)

        }

        if (response.status === 200) {
            enqueueSnackbar(`Data ${row?.isNew ? "Add" : "Update"} successfully.`)
            fetchListData(searchQuery, url, subGoalTypes?.SortBy, subGoalTypes?.ColumnNameForSortBy);
            setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
        }
    };

    const columns = [
        {
            headerName: 'Goal Name',
            flex: 2,
            field: 'goalName',
            disableAcc: true,
            sortable: false,
            editable: true,
            type: 'singleSelect',
            valueOptions: goals?.map((ele) => ele.goalName),
            // renderCell: ({ row }) => <Typography>{row.brandName}</Typography>
        },
        {
            headerName: 'Goal Type',
            flex: 3,
            field: 'goalType',
            disableAcc: true,
            sortable: false,
            // editable: true,
        },
        {
            headerName: 'Sub Goal Name',
            flex: 3,
            field: 'subGoalName',
            disableAcc: true,
            sortable: false,
            editable: true,
        },
        {
            headerName: 'Sub Goal Description',
            flex: 3,
            field: 'subGoalDescription',
            disableAcc: true,
            sortable: false,
            editable: true,
        },
    ];



    const handleAddRecord = () => {
        // Generate a unique ID for the new record
        const newId = Math.max(...rows.map(row => row.id), 0) + 1;

        // Create a new record with default values
        const newRecord = {
            id: newId,
            goalType: "",
            goalName: "",
            goalDescription: "",
            isNew: true,
        };

        // Update the rows state with the new record
        dispatch(setRows([...rows, newRecord]));
        // Set the row mode to Edit for the new record
        setRowModesModel({ ...rowModesModel, [newId]: { mode: GridRowModes.Edit, fieldToFocus: 'goalName' }, });
    };

    try {
        return (
            <Container>
                <Card
                    sx={{
                        '& .actions': {
                            color: 'text.secondary',
                        },
                        '& .textPrimary': {
                            color: 'text.primary',
                        },
                    }}
                >
                    <Grid px={2} spacing={2} alignItems='center' container>
                        <Grid item md={6}>
                            <SearchBar
                                sx={{ w: 1 / 2, my: 3 }}
                                onChange={handleSearchInputChange}
                                value={searchQuery}
                            />
                        </Grid>
                        <Grid item md={6}>
                            <Stack justifyContent='end' direction='row'>
                                <Button onClick={handleAddRecord} variant='contained'>Add Sub Goal</Button>
                            </Stack>
                        </Grid>
                    </Grid>
                    <TableData
                        setRowModesModel={setRowModesModel}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                        columns={columns}
                        apiRef={apiRef}
                        dateFlex={3}
                        page={page}
                        handleCancelClick={handleCancelClick}
                        handleEditClick={handleEditClick}
                        handleDeleteClick={handleDeleteClick}
                        handleSaveClick={handleSaveClick}
                        rows={rows}
                        isLoading={subGoalTypes?.isLoading}
                        url={url}
                        rowModesModel={rowModesModel}
                        rowsPerPage={rowsPerPage}
                        scoringPartnerTypes={subGoalTypes}
                    />
                </Card>
            </Container>
        )
    } catch (error) {
        console.log(error)
    }
}

