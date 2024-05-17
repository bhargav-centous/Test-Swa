import PropTypes from 'prop-types';

import Grid from '@mui/material/Unstable_Grid2';

import MembershipBillingPlan from './membership-billing-plan';
import MembershipBillingHistory from './MembershipBillingHistory';
// ----------------------------------------------------------------------

export default function Membership({ cards, plans, invoices, addressBook }) {
    return (
        <Grid container spacing={5} disableEqualOverflow>
            <Grid xs={12} md={12}>
                <MembershipBillingPlan plans={plans} cardList={cards} addressBook={addressBook} />
            </Grid>
            <Grid xs={12} md={12} mb={3}>
                <MembershipBillingHistory invoices={invoices} />
            </Grid>
        </Grid>
    );
}

Membership.propTypes = {
    addressBook: PropTypes.array,
    cards: PropTypes.array,
    invoices: PropTypes.array,
    plans: PropTypes.array,
};
