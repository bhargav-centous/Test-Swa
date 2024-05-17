
import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
// import DialogActions from '@mui/material/DialogActions';

export function GoalDescriptionModal({
    open,
    onClose,
}) {
    return (
        <Dialog open={open} fullWidth PaperComponent={Card} maxWidth="sm" onClose={onClose}>
            <DialogTitle>Lorem Ipsum is simply dummy text</DialogTitle>

            <Stack spacing={3} sx={{ px: 3, pb: 3 }}>
                Lorem Ipsumis simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                the industrys standard dummy text ever since the 1500s, when an unknown
                printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                sheets containing Lorem Ipsum
            </Stack>
            {/* <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" disabled={amount === 0} onClick={onClose}>
                    Confirm & Transfer
                </Button>
            </DialogActions> */}
        </Dialog>
    );
}

GoalDescriptionModal.propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool,
};
