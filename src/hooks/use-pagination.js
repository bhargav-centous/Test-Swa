import { useState } from 'react';

const usePagination = (initialPage = 0, initialRowsPerPage = 5) => {
    const [page, setPage] = useState(initialPage);
    const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0); // Reset page index when changing rows per page
    };

    return {
        page,
        rowsPerPage,
        setPage,
        setRowsPerPage,
        handleChangePage,
        handleChangeRowsPerPage
    };
};

export default usePagination;
