import { createSlice } from '@reduxjs/toolkit';

import { fetchList, fetchGoalType } from '../service';


const getListSlice = createSlice({
    name: 'getList',
    initialState: {
        rows: [],
        totalCount: 0,
        isLoading: true,
        page: 0,
        rowsPerPage: 5,
        searchQuery: '',
        masterData: {
            goalType: [],
        },
        tempObj: {},
    },
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setRowsPerPage: (state, action) => {
            state.rowsPerPage = action.payload;
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        setRowModesModel: (state, action) => {
            state.rowModesModel = action.payload;
        },
        setRows: (state, action) => {
            state.rows = action.payload;
        },
        setTempObj: (state, action) => {
            state.tempObj = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.totalCount = action.payload.totalCount;
                state.rows = action.payload.items;
            })
            .addCase(fetchList.rejected, (state, action) => {
                state.isLoading = false;
                console.error('Error fetching role list:', action.payload);
            })
            .addCase(fetchGoalType.fulfilled, (state, action) => {
                state.masterData.goalType = action.payload;
            })
            .addCase(fetchGoalType.rejected, (state, action) => {
                console.error('Error fetching goal type:', action.payload);
            });
    },
});

export const { setPage, setRowsPerPage, setTempObj, setSearchQuery, setRowModesModel, setRows } = getListSlice.actions;

export default getListSlice.reducer;
