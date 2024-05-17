'use client'

import { find } from 'lodash';
import { useSnackbar } from 'notistack';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { Stack, Button } from '@mui/material';
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


export default function ScoringPartnerCategoryView() {
    const { enqueueSnackbar } = useSnackbar();
    const [scoringPartnerData, scoringPartnerCategoryTypesData] = useState([])
    const scoringPartnerCategoryTypes = useSelector(state => state.scoringPartnerType);
    const rows = scoringPartnerCategoryTypes?.rows || []
    const apiRef = useGridApiRef();
    const { fetchListData, handleSearchInputChange, page, searchQuery, rowsPerPage, handleChangePage, handleChangeRowsPerPage, handleDeleteClick, handleEditClick, handleCancelClick, rowModesModel, setRowModesModel } = UseSettingActions();
    const dispatch = useDispatch();
    const url = endpoints.settings.ScoringPartnerCategories

    const getMasterData = (callScoringTypeCategoryCodeAPI = false) => {
        if (callScoringTypeCategoryCodeAPI) {
            getRequest(`${endpoints.settings.ScoringPartnerTypes}?PageNumber=1&PageSize=1000`).
                then((res) => {
                    scoringPartnerCategoryTypesData(res.data.items)
                }).catch((err) => {
                    console.log(err)
                })
        }
    }

    useEffect(() => {
        getMasterData(true, true)
    }, [])

    useEffect(() => {
        fetchListData(searchQuery, endpoints.settings.ScoringPartnerCategories, scoringPartnerCategoryTypes?.SortBy, scoringPartnerCategoryTypes?.ColumnNameForSortBy);
    }, [searchQuery, fetchListData, scoringPartnerCategoryTypes?.SortBy, scoringPartnerCategoryTypes?.ColumnNameForSortBy]);


    const handleSaveClick = ({ row, id }) => async () => {
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

        const scoringPartnerTypeCode = find(scoringPartnerData, { partnerTypeCode: record?.scoringPartnerTypeCode })?.id

        if (row?.isNew) { // Add 
            const addPayload = {
                scoringPartnerCategoryDescription: record?.scoringPartnerCategoryDescription,
                scoringPartnerCategoryTypeCode: record?.scoringPartnerCategoryTypeCode,
                scoringPartnerTypeCode,
            }
            response = await postRequest(url, addPayload)
        } else { // update
            const updatePayload = {
                scoringPartnerCategoryDescription: record?.scoringPartnerCategoryDescription,
                scoringPartnerCategoryTypeCode: record?.scoringPartnerCategoryTypeCode,
                scoringPartnerTypeCode,
                id,
            }
            response = await putRequest(`${url}/${id}`, updatePayload)

        }
        if (response.status === 200) {
            enqueueSnackbar(`Data ${row?.isNew ? "Add" : "Update"} successfully.`)
            fetchListData(searchQuery, url);
            setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
        }

        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const columns = [
        {
            headerName: 'Scoring Partner Type Code',
            flex: 2,
            field: 'scoringPartnerTypeCode',
            disableAcc: true,
            sortable: false,
            editable: true,
            type: 'singleSelect',
            valueOptions: scoringPartnerData?.map((ele) => ele.partnerTypeCode),
            // renderCell: ({ row }) => <Typography>{row.brandName}</Typography>
        },
        {
            headerName: 'Scoring Partner Category Type Code',
            flex: 3,
            field: 'scoringPartnerCategoryTypeCode',
            disableAcc: true,
            sortable: false,
            editable: true,
        },
        {
            headerName: 'Scoring Partner Category Description',
            flex: 3,
            field: 'scoringPartnerCategoryDescription',
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
            scoringPartnerCategoryDescription: "",
            scoringPartnerCategoryTypeCode: "",
            scoringPartnerTypeCode: "",
            isNew: true
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
                                <Button onClick={handleAddRecord} variant='contained'>Add Scoring Partner Category</Button>
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
                        dateFlex={2.5}
                        rows={rows}
                        url={url}
                        rowModesModel={rowModesModel}
                        isLoading={scoringPartnerCategoryTypes?.isLoading}
                        rowsPerPage={rowsPerPage}
                        scoringPartnerTypes={scoringPartnerCategoryTypes}
                    />
                </Card>
            </Container>
        )
    } catch (error) {
        console.log(error)
    }
}
