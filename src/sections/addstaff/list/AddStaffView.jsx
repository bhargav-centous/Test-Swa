/* eslint-disable no-nested-ternary */
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import CircularProgress from '@mui/material/CircularProgress';

import { paths } from 'src/routes/paths';

import usePagination from 'src/hooks/use-pagination';

import { endpoints } from 'src/utils/axios';

import { fetchList } from 'src/state-management/service';
import { setSearchQuery } from 'src/state-management/CommonSlice/getListSlice';

import Iconify from 'src/components/iconify';
import SearchBar from 'src/components/SearchInput/SearchBar';
import EmptyContent from 'src/components/empty-content/empty-content';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import BackgroundLetterAvatars from 'src/components/commonUtils/BackgroundLetterAvatars';


const AddStaffView = () => {
    const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();
    const listStore = useSelector(state => state.list);
    const popover = usePopover();
    const [isAsc, setIsAsc] = useState('desc')
    const [selectedRow, setSelectedRow] = useState(false)
    const router = useRouter();
    const dispatch = useDispatch();

    const fetchListData = useCallback((updatedPage = page, updatedRowsPerPage = rowsPerPage, searchQuery, url) => {
        const payload = {
            page: updatedPage,
            rowsPerPage: updatedRowsPerPage,
            url,
            SortBy: isAsc,
            ColumnNameForSortBy: 'DateOfCreation'
        };

        if (searchQuery !== "") {
            payload.searchQuery = searchQuery;
        }

        dispatch(fetchList(payload));
    }, [dispatch, page, rowsPerPage, isAsc]);

    useEffect(() => {
        fetchListData(page, rowsPerPage, listStore?.searchQuery, endpoints.addStaff.getStaffUser);
    }, [page, rowsPerPage, listStore?.searchQuery, fetchListData]);

    const handleEditRow = useCallback(
        (id) => {
            router.push(paths.dashboard.addstaff.edit(id));
        },
        [router]
    );

    const handleViewRow = useCallback(
        (id) => {
            router.push(paths.dashboard.addstaff.view(id));
        },
        [router]
    );

    const handleSearchInputChange = (value) => {
        dispatch(setSearchQuery(value)); // Dispatch setSearchQuery action to update searchQuery
    };

    return (
        <Card>
            <Grid container>
                <Grid item md={7.8} />
                <Grid item md={4}>
                    <SearchBar
                        onChange={handleSearchInputChange}
                        value={listStore?.searchQuery}
                        sx={{ width: 1, my: 3 }}
                    />
                </Grid>
            </Grid>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right" />
                            <TableCell>Primary Email</TableCell>
                            <TableCell align="right" />
                            <TableCell>Primary Contact Number</TableCell>

                            <TableCell>
                                <Stack direction='row' alignItems='center'>
                                    Created At
                                    {isAsc === "asc" ?
                                        <IconButton onClick={() => setIsAsc("desc")}>
                                            <Iconify icon="ph:arrow-up" />
                                        </IconButton> :
                                        <IconButton onClick={() => setIsAsc("asc")}>
                                            <Iconify icon="ph:arrow-down" />
                                        </IconButton>
                                    }
                                </Stack>
                            </TableCell>
                            <TableCell align="right" />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!listStore?.isLoading ? (
                            listStore?.rows.length === 0 ? (
                                <TableRow sx={{ height: 300 }}>
                                    <TableCell colSpan={12} align="center">
                                        {/* <Typography variant="h4" fontWeight={400}>No data found</Typography> */}
                                        <EmptyContent title='No Result Found' />
                                    </TableCell>
                                </TableRow>
                            ) : (
                                listStore?.rows?.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            <Stack spacing={2} direction='row' alignItems='center'>
                                                {/* <Image
                                                src="/assets/icons/addStaff/user-avtar.svg"
                                                width={64}
                                                height={64}
                                                alt="Picture of the author"
                                            />
                                            {row.name} */}
                                                <BackgroundLetterAvatars sx={{ height: 64, width: 64 }} name={row.name} />
                                                {row.name}
                                            </Stack>
                                        </TableCell>
                                        <TableCell align="right" />
                                        <TableCell component="th" scope="row">{row.primaryEmail}</TableCell>
                                        <TableCell align="right" />
                                        <TableCell component="th" scope="row">{row.primaryContactNumber}</TableCell>
                                        <TableCell component="th" scope="row">{row.dateOfRegistration}</TableCell>
                                        <TableCell align="right">
                                            <IconButton color={popover.open ? 'inherit' : 'default'} onClick={(e) => {
                                                setSelectedRow(row.id)
                                                popover.onOpen(e)
                                            }}>
                                                <Iconify icon="mage:dots" />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )
                        ) : (
                            <TableRow sx={{ height: 300 }}>
                                <TableCell colSpan={12} align="center">
                                    <CircularProgress />
                                </TableCell>
                            </TableRow>
                        )
                        }
                        <CustomPopover
                            open={popover.open}
                            onClose={popover.onClose}
                            arrow="right-top"
                            sx={{ width: 140 }}
                        >
                            <MenuItem
                                onClick={() => {
                                    handleViewRow(selectedRow)
                                    popover.onClose();
                                    setSelectedRow(false)
                                }}
                            >
                                <Iconify icon="carbon:view" />
                                View
                            </MenuItem>

                            <MenuItem
                                onClick={() => {
                                    handleEditRow(selectedRow)
                                    popover.onClose();
                                    setSelectedRow(false)
                                }}
                            >
                                <Iconify icon="solar:pen-bold" />
                                Edit
                            </MenuItem>
                        </CustomPopover>
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[1, 5, 10, 25, 100]}
                component="span"
                count={listStore?.totalCount}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Card>
    )
}

export default AddStaffView