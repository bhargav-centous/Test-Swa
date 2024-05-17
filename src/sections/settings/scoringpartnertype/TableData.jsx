import React from 'react';
import PropTypes from 'prop-types';

import { Box } from '@mui/material'; // Import Box component

import TablePagination from '@mui/material/TablePagination';
import {
    DataGrid,
    GridRowModes,
    GridActionsCellItem,
    GridRowEditStopReasons,
} from '@mui/x-data-grid'; // No curly braces for default import
import { useDispatch } from 'react-redux';

import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

import { setRows, setSortBy, setColumnNameForSortBy } from 'src/state-management/Settings/SettingSlice';

import EmptyContent from 'src/components/empty-content/empty-content';


const TableData = ({
    scoringPartnerTypes,
    rows,
    rowModesModel,
    handleSaveClick,
    handleCancelClick,
    handleDeleteClick,
    handleEditClick,
    setRowModesModel,
    rowsPerPage,
    flex = 1,
    page,
    url,
    dateFlex,
    columns,
    isLoading = true,
    apiRef,
    handleChangePage,
    handleChangeRowsPerPage,
}) => {



    const actionColunms = [
        {
            headerName: 'Date',
            flex: dateFlex,
            field: 'dateOfCreation',
        },
        {
            field: 'actions',
            type: 'actions',
            flex,
            headerName: 'Actions',
            cellClassName: 'actions',
            getActions: ({ id, row }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick({ id, row })}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(row)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(row)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon sx={{ color: 'error.main' }} />}
                        label="Delete"
                        onClick={handleDeleteClick(row, url)}
                        color="inherit"
                    />,
                ];
            },
        }]

    const updatedColumns = [
        ...columns,
        ...actionColunms
    ]

    const dispatch = useDispatch();


    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        dispatch(setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row))));
        return updatedRow;
    };


    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };


    const handleSortModelChange = (newSortModel) => {
        // Sort rows based on the dateOfCreation field
        if (newSortModel.length > 0) {
            dispatch(setSortBy(newSortModel[0].sort))
            dispatch(setColumnNameForSortBy(newSortModel[0].field))
        }
    };

    return (
        <Box>
            <DataGrid
                rows={rows}
                columns={updatedColumns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                disableColumnMenu
                hideFooter
                onSortModelChange={handleSortModelChange}
                processRowUpdate={processRowUpdate}
                apiRef={apiRef}
                isRowSelectable={() => false} // Adjust isRowSelectable to return false
                // onRowDoubleClick={() => setRowModesModel({ mode: 'view' })}
                loading={isLoading}
                rowHeight={80}
                slots={{
                    noRowsOverlay: () => <EmptyContent title="No Data" />,
                    noResultsOverlay: () => <EmptyContent title="No results found" />,
                }}
                slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                    },
                }}
                disableColumnFilter
            />
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="span"
                count={scoringPartnerTypes?.totalCount}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>
    )
}

TableData.propTypes = {
    scoringPartnerTypes: PropTypes.object,
    rows: PropTypes.array,
    rowModesModel: PropTypes.object,
    apiRef: PropTypes.object,
    columns: PropTypes.array,
    url: PropTypes.string,
    setRowModesModel: PropTypes.func,
    handleSaveClick: PropTypes.func,
    handleCancelClick: PropTypes.func,
    handleDeleteClick: PropTypes.func,
    handleEditClick: PropTypes.func,
    rowsPerPage: PropTypes.number,
    page: PropTypes.number,
    flex: PropTypes.number,
    dateFlex: PropTypes.number,
    isLoading: PropTypes.bool,
    handleChangePage: PropTypes.func,
    handleChangeRowsPerPage: PropTypes.func,
};

export default TableData;