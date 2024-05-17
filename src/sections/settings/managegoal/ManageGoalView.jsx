'use client'

import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
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

import { endpoints, putRequest, postRequest } from 'src/utils/axios';

import { setRows } from 'src/state-management/Settings/SettingSlice';

import SearchBar from 'src/components/SearchInput/SearchBar';

import TableData from '../scoringpartnertype/TableData';


export default function ManageGolaView() {
    const { fetchListData, handleSearchInputChange, page, searchQuery, rowsPerPage, handleChangePage, handleChangeRowsPerPage, handleDeleteClick, handleEditClick, handleCancelClick, rowModesModel, setRowModesModel } = UseSettingActions();
    const apiRef = useGridApiRef();
    const manageGoalType = useSelector(state => state.scoringPartnerType);
    const rows = manageGoalType?.rows || []
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const url = endpoints.settings.Goals

    useEffect(() => {
        fetchListData(searchQuery, endpoints.settings.Goals, manageGoalType?.SortBy, manageGoalType?.ColumnNameForSortBy);
    }, [searchQuery, fetchListData, manageGoalType?.SortBy, manageGoalType?.ColumnNameForSortBy]);



    const handleSaveClick = ({ row, id }) => async () => {
        const record = apiRef.current.getRowWithUpdatedValues(row?.id)
        let response = {};
        if (record?.goalType === '') {
            enqueueSnackbar("Goal Type can not be empty", { variant: 'error' })
            setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
            return
        }
        if (record?.goalDescription === '') {
            enqueueSnackbar("Goal Description can not be empty", { variant: 'error' })
            setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
            return
        }
        if (record?.goalName === '') {
            enqueueSnackbar("Goal Name can not be empty", { variant: 'error' })
            setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
            return
        }

        if (row?.isNew) { // Add 
            const postPayload = {
                goalDescription: record?.goalDescription,
                goalName: record?.goalName,
                goalType: record?.goalType
            }
            response = await postRequest(url, postPayload)
        } else { // update
            response = await putRequest(`${url}/${id}`, record)
        }

        if (response.status === 200) {
            enqueueSnackbar(`Data ${row?.isNew ? "Add" : "Update"} successfully.`)
            fetchListData(searchQuery, url, manageGoalType?.SortBy, manageGoalType?.ColumnNameForSortBy);
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
        },
        {
            headerName: 'Goal Type',
            flex: 3,
            field: 'goalType',
            disableAcc: true,
            sortable: false,
            editable: true,
        },
        {
            headerName: 'Goal Description',
            flex: 3,
            field: 'goalDescription',
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
                                <Button onClick={handleAddRecord} variant='contained'>Add Goal</Button>
                            </Stack>
                        </Grid>
                    </Grid>
                    <TableData
                        setRowModesModel={setRowModesModel}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                        columns={columns}
                        apiRef={apiRef}
                        page={page}
                        handleCancelClick={handleCancelClick}
                        handleEditClick={handleEditClick}
                        handleDeleteClick={handleDeleteClick}
                        handleSaveClick={handleSaveClick}
                        rows={rows}
                        url={url}
                        isLoading={manageGoalType?.isLoading}
                        rowModesModel={rowModesModel}
                        rowsPerPage={rowsPerPage}
                        scoringPartnerTypes={manageGoalType}
                        dateFlex={2}
                        flex={0.7}
                    />
                </Card>
            </Container>
        )
    } catch (error) {
        console.log(error)
    }
}