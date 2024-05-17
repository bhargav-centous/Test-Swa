import React from 'react';
import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import { Grid, Skeleton } from '@mui/material';

const TableSkleton = ({ length = 5 }) => (
    <Card sx={{ width: 1, py: 2 }}>
        {[...Array(length)].map((_, index) => (
            <Grid container px={1} spacing={3}>
                <Grid mt={2} item xs>
                    <Skeleton />
                </Grid>
                <Grid mt={2} item xs>
                    <Skeleton />
                </Grid>
            </Grid>
        ))}
    </Card>
);

TableSkleton.propTypes = {
    length: PropTypes.number,
}

export default TableSkleton;
