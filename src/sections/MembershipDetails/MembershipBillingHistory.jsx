import { useState } from 'react';
import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { Stack, TextField, InputAdornment } from '@mui/material';

import { fDate } from 'src/utils/format-time';

import Iconify from 'src/components/iconify';



// ----------------------------------------------------------------------

export default function MembershipBillingHistory({ invoices }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    return (
        <Card>
            <Typography sx={{ pl: 3, pt: 2, fontWeight: 500 }}>Invoice History</Typography>
            <Divider sx={{ pb: 2 }} />
            <Stack direction="row" alignItems="center" justifyContent='end' >
                <TextField
                    sx={{ width: 250, my: 3, mr: 5 }}
                    placeholder="Search..."
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                            </InputAdornment>
                        ),
                    }}
                />
            </Stack>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Items</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Date</TableCell>
                            <TableCell align="right" />
                            <TableCell align="right" />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {invoices.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.invoiceNumber}
                                </TableCell>
                                <TableCell align="right">{row.price}</TableCell>
                                <TableCell align="right">{fDate(row.createdAt)}</TableCell>
                                <TableCell align="right" />
                                <TableCell align="right"><Iconify icon="mage:dots" /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="span"
                count={invoices.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

        </Card>
    );
}

MembershipBillingHistory.propTypes = {
    invoices: PropTypes.array,
};
