// UseActions.js

import { useSnackbar } from "notistack";
import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { GridRowModes } from "@mui/x-data-grid";

import usePagination from "src/hooks/use-pagination";

import { deleteRequest } from "src/utils/axios";

import { setRows, fetchlist } from "src/state-management/Settings/SettingSlice";

const UseSettingActions = () => {
    // const reactFlowInstance = useReactFlow()
    const scoringPartnerTypes = useSelector(state => state.scoringPartnerType);
    const rows = scoringPartnerTypes?.rows || []
    const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const [rowModesModel, setRowModesModel] = useState({});
    const [searchQuery, setSearchQuery] = useState("")

    const fetchListData = useCallback((search = searchQuery, url, SortBy, ColumnNameForSortBy) => {
        const payload = {
            page,
            rowsPerPage,
            url,
            SortBy,
            ColumnNameForSortBy
        };
        if (search !== "") {
            payload.searchQuery = search;
        }
        dispatch(fetchlist(payload));
    }, [dispatch, page, rowsPerPage, searchQuery]);

    const handleSearchInputChange = (value) => {
        setSearchQuery(value);
    };

    const handleEditClick = ({ id }) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleCancelClick = ({ id }) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            dispatch(setRows(rows.filter((row) => row.id !== id)));
        }
    };

    const handleDeleteClick = ({ id }, url) => () => {
        deleteRequest(`${url}/${id}`, { id }).then((response) => {
            dispatch(setRows(rows.filter((row) => row.id !== id)));
            enqueueSnackbar("Data Delete successfully.")
            fetchListData(scoringPartnerTypes?.searchQuery, url, scoringPartnerTypes?.SortBy, scoringPartnerTypes?.ColumnNameForSortBy);
            setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
        }).catch((error) => {
            console.log(error);
        });
    };

    return {
        fetchListData,
        handleDeleteClick,
        handleSearchInputChange,
        handleCancelClick,
        handleEditClick,
        rowModesModel,
        setRowModesModel,
        page,
        searchQuery,
        rowsPerPage,
        handleChangePage,
        handleChangeRowsPerPage
    };
};

export default UseSettingActions;
