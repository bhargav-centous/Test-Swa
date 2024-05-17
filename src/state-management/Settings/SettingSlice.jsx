import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getRequest } from 'src/utils/axios';

export const fetchlist = createAsyncThunk(
    'scoringPartnerType/fetchScoringPartnerTypes',
    async ({ page, rowsPerPage, searchQuery, url, SortBy, ColumnNameForSortBy }, { rejectWithValue }) => {
        try {
            const URL = url;
            // Constructing the query string conditionally based on parameters
            let queryString = `?PageNumber=${page + 1}&PageSize=${rowsPerPage}`;
            if (searchQuery) {
                queryString += `&SearchValue=${searchQuery}`;
            }
            if (SortBy) {
                queryString += `&SortBy=${SortBy}`;
            }
            if (ColumnNameForSortBy) {
                queryString += `&ColumnNameForSortBy=${ColumnNameForSortBy}`;
            }
            const headerURL = `${URL}${queryString}`;
            const response = await getRequest(headerURL);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const scoringPartnerTypeSlice = createSlice({
    name: 'scoringPartnerType',
    initialState: {
        rows: [],
        totalCount: 0,
        isLoading: true,
        page: 0,
        rowsPerPage: 5,
        searchQuery: '',
        SortBy: '',
        ColumnNameForSortBy: '',
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
        setSortBy: (state, action) => {
            state.SortBy = action.payload;
        },
        setColumnNameForSortBy: (state, action) => {
            state.ColumnNameForSortBy = action.payload;
        },
        setTempObj: (state, action) => {
            state.tempObj = action.payload;
        },
        clearStore: (state) => {
            // Reset all state properties to their initial values
            state.rows = [];
            state.totalCount = 0;
            state.isLoading = true;
            state.page = 0;
            state.rowsPerPage = 5;
            state.searchQuery = '';
            state.SortBy = '';
            state.ColumnNameForSortBy = '';
            state.tempObj = {};
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchlist.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchlist.fulfilled, (state, action) => {
                state.isLoading = false;
                state.totalCount = action.payload.totalCount;
                state.rows = action.payload.items;
            })
            .addCase(fetchlist.rejected, (state, action) => {
                state.isLoading = false;
                console.error('Error fetching role list:', action.payload);
            });
    },
});

export const { setPage, setRowsPerPage, setTempObj, setSearchQuery, setRowModesModel, setRows, clearStore, setColumnNameForSortBy, setSortBy } = scoringPartnerTypeSlice.actions;

export default scoringPartnerTypeSlice.reducer;
