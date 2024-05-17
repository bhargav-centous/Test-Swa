'use client'

import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import {
    GridRowModes,
    useGridApiRef,
} from '@mui/x-data-grid'; // No curly braces for default import


import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import UseSettingActions from 'src/hooks/Settings/use-setting-actions';

import { endpoints, putRequest, postRequest } from 'src/utils/axios';

import { setRows } from 'src/state-management/Settings/SettingSlice';

import SearchBar from 'src/components/SearchInput/SearchBar';

import TableData from './TableData';


export default function ScoringPartnerTypeView() {
    const scoringPartnerTypes = useSelector(state => state.scoringPartnerType);
    const rows = scoringPartnerTypes?.rows || []
    const dispatch = useDispatch();
    const apiRef = useGridApiRef();

    const { fetchListData, page, rowsPerPage, searchQuery, handleChangePage, handleChangeRowsPerPage, handleSearchInputChange, handleDeleteClick, handleEditClick, handleCancelClick, rowModesModel, setRowModesModel } = UseSettingActions();

    const { enqueueSnackbar } = useSnackbar();

    const url = endpoints.settings.ScoringPartnerTypes

    useEffect(() => {
        fetchListData(searchQuery, endpoints.settings.ScoringPartnerTypes, scoringPartnerTypes?.SortBy, scoringPartnerTypes?.ColumnNameForSortBy);
    }, [fetchListData, searchQuery, scoringPartnerTypes?.SortBy, scoringPartnerTypes?.ColumnNameForSortBy]);

    const handleSaveClick = ({ id, row }) => async () => {
        const record = apiRef.current.getRowWithUpdatedValues(row?.id)
        let response = {};
        if (record?.partnerTypeCode === '') {
            enqueueSnackbar("partnerTypeCode can not be empty", { variant: 'error' })
            setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
            return
        }
        if (record?.partnerTypeDescription === '') {
            enqueueSnackbar("partnerTypeCode can not be empty", { variant: 'error' })
            setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
            return
        }

        if (row?.isNew) { // Add 
            const postPayload = {
                partnerTypeCode: record?.partnerTypeCode,
                partnerTypeDescription: record?.partnerTypeDescription
            }
            response = await postRequest(url, postPayload)
        } else { // update
            response = await putRequest(`${url}/${id}`, record)
        }

        if (response.status === 200) {
            enqueueSnackbar(`Data ${row?.isNew ? "Add" : "Update"} successfully.`)
            fetchListData(searchQuery, url, scoringPartnerTypes?.SortBy, scoringPartnerTypes?.ColumnNameForSortBy);
            setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
        }
    };

    const columns = [
        {
            headerName: 'Partner Type Code',
            flex: 4,
            field: 'partnerTypeCode',
            disableAcc: true,
            sortable: false,
            editable: true,
        },
        {
            headerName: 'Partner Type Description',
            flex: 6,
            field: 'partnerTypeDescription',
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
            partnerTypeCode: '', // Default value for partnerTypeCode
            partnerTypeDescription: '', // Default value for partnerTypeDescription
            isNew: true,
        };

        // Update the rows state with the new record
        dispatch(setRows([...rows, newRecord]));
        // Set the row mode to Edit for the new record
        setRowModesModel({ ...rowModesModel, [newId]: { mode: GridRowModes.Edit, fieldToFocus: 'partnerTypeCode' }, });
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
                        handleCancelClick={handleCancelClick}
                        dateFlex={4}
                        handleEditClick={handleEditClick}
                        handleDeleteClick={handleDeleteClick}
                        handleSaveClick={handleSaveClick}
                        rows={rows}
                        url={url}
                        isLoading={scoringPartnerTypes?.isLoading}
                        rowModesModel={rowModesModel}
                        rowsPerPage={rowsPerPage}
                        scoringPartnerTypes={scoringPartnerTypes}
                    />
                </Card>
            </Container>
        )
    } catch (error) {
        console.log(error)
    }
}