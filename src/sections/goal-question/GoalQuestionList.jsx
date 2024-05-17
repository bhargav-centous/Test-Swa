/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types'
import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';

import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
import InputAdornment from '@mui/material/InputAdornment';
import TablePagination from '@mui/material/TablePagination';
import { Stack, Select, Typography, CircularProgress } from '@mui/material';

import { paths } from 'src/routes/paths';

import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content/empty-content';
import CustomPopover, { usePopover } from 'src/components/custom-popover';


const GoalQuestionList = ({ isLoading, selectedGoalType, goalType, handleGoalTypeChange, handleSearchInputChange, list, page, totalCount, setIsAsc, isAsc, rowsPerPage, onPageChange, onRowsPerPageChange }) => {
    const popover = usePopover();
    const router = useRouter();
    const [selectedRow, setSelectedRow] = useState(false)

    const handleEditRow = useCallback(
        (id) => {
            router.push(paths.dashboard.goalQuestion.edit(id));
        },
        [router]
    );


    return (
        <Card>
            <Grid spacing={3} container>
                <Grid item md={3.8} />
                <Grid item md={4}>
                    <Select
                        sx={{ width: 1, my: 3 }}
                        multiple
                        value={selectedGoalType}
                        displayEmpty
                        placeholder='adsd'
                        renderValue={(selected) => (
                            selected.length === 0 ? <Typography fontSize={14} color='text.secondary'>Select Goal Type</Typography> : selected.join(', ')
                        )}
                        onChange={handleGoalTypeChange}
                    >
                        {goalType.map((goal, index) => (
                            <MenuItem
                                key={index}
                                value={goal?.goalType}
                            >
                                {goal?.goalType}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item md={4}>
                    <TextField
                        sx={{ width: 1, my: 3 }}
                        placeholder="Search..."
                        autoComplete='off'
                        onChange={(e) => handleSearchInputChange(e.target.value.trim())}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
            </Grid>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Heading</TableCell>
                            <TableCell>Question</TableCell>
                            <TableCell>
                                <Stack direction='row' alignItems='center'>
                                    Date
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
                            <TableCell>Goal Categories</TableCell>
                            <TableCell>Evidence Required</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="right" />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!isLoading ? (
                            list.length === 0 ? (
                                <TableRow sx={{ height: 300 }}>
                                    <TableCell colSpan='10' align="center">
                                        {/* <Typography variant="h4" fontWeight={400}>No data found</Typography> */}
                                        <EmptyContent title='No Result Found' />
                                    </TableCell>
                                </TableRow>
                            ) : (
                                list?.map((row, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell sx={{ lineHeight: 4 }} component="th" scope="row">
                                            {row.heading}
                                        </TableCell>
                                        <TableCell sx={{ lineHeight: 4 }} component="th" scope="row">
                                            {row.question}
                                        </TableCell>
                                        <TableCell sx={{ lineHeight: 4 }} component="th" scope="row">
                                            {row.date}
                                        </TableCell>
                                        <TableCell sx={{ lineHeight: 4 }} component="th" scope="row">
                                            {row.goalCategories}
                                        </TableCell>
                                        <TableCell sx={{ lineHeight: 4 }} component="th" scope="row">
                                            {row.evidenceRequired}
                                        </TableCell>
                                        <TableCell sx={{ lineHeight: 4, color: row.status === 'Active' ? 'success.dark' : 'error.dark' }} component="th" scope="row">
                                            <Typography sx={{ fontSize: 12, borderRadius: 1, width: "max-content", px: 1, py: 1 / 2, bgcolor: row.status === 'Active' ? '#22C55E29' : '#FF563029' }}>{row.status}</Typography>
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
                                )))) : (
                            <TableRow sx={{ height: 300 }}>
                                <TableCell colSpan={10} align="center">
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

GoalQuestionList.propTypes = {
    list: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    totalCount: PropTypes.number,
    setIsAsc: PropTypes.func,
    goalType: PropTypes.array,
    isLoading: PropTypes.bool,
    selectedGoalType: PropTypes.array,
    isAsc: PropTypes.string,
    handleSearchInputChange: PropTypes.func,
    handleGoalTypeChange: PropTypes.func,
    onRowsPerPageChange: PropTypes.func.isRequired,
}

export default GoalQuestionList