'use client'

import find from 'lodash/find';
import { useSnackbar } from 'notistack';
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


export default function GoalScoringPartnerTypeView() {
    const goalScoringPartnerTypes = useSelector(state => state.scoringPartnerType);
    const [scoringPartnerTypesCode, setScoringPartnerTypesCode] = useState([])
    const [goal, setGoal] = useState([])
    const { fetchListData, handleSearchInputChange, searchQuery, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage, handleDeleteClick, handleEditClick, handleCancelClick, rowModesModel, setRowModesModel } = UseSettingActions();
    const rows = goalScoringPartnerTypes?.rows || []
    const { enqueueSnackbar } = useSnackbar();
    const apiRef = useGridApiRef();
    const dispatch = useDispatch();
    const url = endpoints.settings.GoalScoringPartnerType

    const getMasterData = (callScoringTypeCodeAPI = false, callGoalAPI = false) => {
        if (callScoringTypeCodeAPI) {
            getRequest(`${endpoints.settings.ScoringPartnerTypes}?PageNumber=1&PageSize=1000`).
                then((res) => {
                    setScoringPartnerTypesCode(res.data.items)
                }).catch((err) => {
                    console.log(err)
                })
        }
        if (callGoalAPI)
            getRequest(`${endpoints.settings.Goals}?PageNumber=1&PageSize=1000`).
                then((res) => {
                    setGoal(res.data.items)
                }).catch((err) => {
                    console.log(err)
                })
    }

    useEffect(() => {
        getMasterData(true, true)
    }, [])

    useEffect(() => {
        fetchListData(searchQuery, endpoints.settings.GoalScoringPartnerType, goalScoringPartnerTypes?.SortBy, goalScoringPartnerTypes?.ColumnNameForSortBy);
    }, [searchQuery, fetchListData, goalScoringPartnerTypes?.SortBy, goalScoringPartnerTypes?.ColumnNameForSortBy]);


    const handleSaveClick = ({ id, row }) => async () => {
        const record = apiRef.current.getRowWithUpdatedValues(row?.id)
        let response = {};
        if (record?.scoringPartnerTypeCode === '') {
            enqueueSnackbar("scoringPartnerTypeCode can not be empty", { variant: 'error' })
            setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
            return
        }
        if (record?.goalNumber === '') {
            enqueueSnackbar("goal Name can not be empty", { variant: 'error' })
            setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
            return
        }


        const goalNumberID = find(goal, { goalName: record?.goalName })?.id
        const scoringPartnerTypeID = find(scoringPartnerTypesCode, { partnerTypeCode: record?.scoringPartnerTypeCode })?.id

        if (row?.isNew) { // Add 
            const addPayload = {
                scoringPartnerTypeID,
                goalID: goalNumberID
            }
            response = await postRequest(url, addPayload)
        } else { // update
            const updatePayload = {
                goalID: goalNumberID,
                scoringPartnerTypeID,
                isValid: true,
                id
            }
            response = await putRequest(`${url}/${id}`, updatePayload)

        }

        if (response.status === 200) {
            enqueueSnackbar(`Data ${row?.isNew ? "Add" : "Update"} successfully.`)
            fetchListData(searchQuery, url, goalScoringPartnerTypes?.SortBy, goalScoringPartnerTypes?.ColumnNameForSortBy);
            setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
        }
    };

    const columns = [
        {
            headerName: 'Scoring Partner Type Code',
            flex: 3,
            field: 'scoringPartnerTypeCode',
            disableAcc: true,
            sortable: false,
            editable: true,
            type: 'singleSelect',
            valueOptions: scoringPartnerTypesCode?.map((ele) => ele.partnerTypeCode),
        },
        {
            headerName: 'Goal Name',
            flex: 3,
            field: 'goalName',
            disableAcc: true,
            // align: 'center',
            sortable: false,
            editable: true,
            type: 'singleSelect',
            valueOptions: goal?.map((ele) => ele.goalName),
        },
    ];

    const handleAddRecord = () => {
        // Generate a unique ID for the new record
        const newId = Math.max(...rows.map(row => row.id), 0) + 1;

        // Create a new record with default values
        const newRecord = {
            id: newId,
            scoringPartnerTypeID: 0,
            goalID: 0,
            isNew: true,
        };

        // Update the rows state with the new record
        dispatch(setRows([...rows, newRecord]));
        // Set the row mode to Edit for the new record
        setRowModesModel({ ...rowModesModel, [newId]: { mode: GridRowModes.Edit, fieldToFocus: 'scoringPartnerTypeCode' }, });
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
                                <Button onClick={handleAddRecord} variant='contained'>Add New Partner Type</Button>
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
                        flex={0.6}
                        dateFlex={2}
                        handleCancelClick={handleCancelClick}
                        handleEditClick={handleEditClick}
                        handleDeleteClick={handleDeleteClick}
                        handleSaveClick={handleSaveClick}
                        rows={rows}
                        url={url}
                        rowModesModel={rowModesModel}
                        isLoading={goalScoringPartnerTypes?.isLoading}
                        rowsPerPage={rowsPerPage}
                        scoringPartnerTypes={goalScoringPartnerTypes}
                    />
                </Card>
            </Container>
        )
    } catch (error) {
        console.log(error)
    }
}