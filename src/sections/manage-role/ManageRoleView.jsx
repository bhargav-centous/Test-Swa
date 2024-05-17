
/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types'
import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';

import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import CircularProgress from '@mui/material/CircularProgress';

import { paths } from 'src/routes/paths';

import Iconify from 'src/components/iconify';
import SearchBar from 'src/components/SearchInput/SearchBar';
import EmptyContent from 'src/components/empty-content/empty-content';
import CustomPopover, { usePopover } from 'src/components/custom-popover';




const ManageRoleView = ({ roleList, listStore, page, isLoading, totalCount, setIsAsc, isAsc, rowsPerPage, handleSearchInputChange, onPageChange, onRowsPerPageChange }) => {
    const popover = usePopover();
    const router = useRouter();
    const [selectedRow, setSelectedRow] = useState(false)

    const handleEditRow = useCallback(
        (id) => {
            router.push(paths.dashboard.manageRole.edit(id));
        },
        [router]
    );


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
                            <TableCell>Role Name</TableCell>
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

                        {!isLoading ? (
                            roleList.length === 0 ? (
                                <TableRow sx={{ height: 300 }}>
                                    <TableCell colSpan={5} align="center">
                                        {/* <Typography variant="h4" fontWeight={400}>No data found</Typography> */}
                                        <EmptyContent title='No Result Found' />
                                    </TableCell>
                                </TableRow>
                            ) : (
                                roleList?.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell sx={{ lineHeight: 4 }} component="th" scope="row">
                                            {row.roleName}
                                        </TableCell>

                                        <TableCell sx={{ lineHeight: 4 }} component="th" scope="row">
                                            {row.registeredDate}
                                        </TableCell>
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
                                <TableCell colSpan={5} align="center">
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
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="span"
                count={totalCount}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
            />
        </Card >
    )
}

ManageRoleView.propTypes = {
    roleList: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    totalCount: PropTypes.number,
    setIsAsc: PropTypes.func,
    isLoading: PropTypes.bool,
    listStore: PropTypes.object,
    isAsc: PropTypes.string,
    handleSearchInputChange: PropTypes.func.isRequired,
    onRowsPerPageChange: PropTypes.func.isRequired,
}

export default ManageRoleView