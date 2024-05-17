import { createAsyncThunk } from '@reduxjs/toolkit';

import { getRequest } from 'src/utils/axios';

export const fetchGoalType = createAsyncThunk(
    'data/fetchGoalType',
    async ({ url }, { rejectWithValue }) => {
        try {
            const URL = url;
            const response = await getRequest(`${URL}?PageNumber=1&PageSize=1000`);
            return response.data.items;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchList = createAsyncThunk(
    'getList/list',
    async ({ page, rowsPerPage, searchQuery, url, SortBy, ColumnNameForSortBy = 'date' }, { rejectWithValue }) => {
        try {
            const URL = url;
            const headerURl = searchQuery ?
                `${URL}?PageNumber=${page + 1}&PageSize=${rowsPerPage}&SearchValue=${searchQuery}&SortBy=${SortBy}&ColumnNameForSortBy=${ColumnNameForSortBy}` :
                `${URL}?PageNumber=${page + 1}&PageSize=${rowsPerPage}&SortBy=${SortBy}&ColumnNameForSortBy=${ColumnNameForSortBy}`;
            const response = await getRequest(headerURl);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);