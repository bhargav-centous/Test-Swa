import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

export default function LinkItem({ post, index }) {


    const { imageURL, type, email, secondarybtnText, btnText, btnIcon, contactno, title, rating, organizationRegistrationNumber, membershipNumber } = post;


    return (
        <Card sx={{ p: 3, display: 'flex' }}>
            <Box sx={{ position: 'relative', height: '190px', width: '190px' }}>
                <Image alt={title} src={`/assets/images/Link/${imageURL}.png`} />
            </Box>

            <PostContent
                title={title}
                rating={rating}
                membershipNumber={membershipNumber}
                organizationRegistrationNumber={organizationRegistrationNumber}
                contactno={contactno}
                email={email}
                type={type}
                secondarybtnText={secondarybtnText}
                btnIcon={btnIcon}
                btnText={btnText}
            />
        </Card>
    );
}

LinkItem.propTypes = {
    index: PropTypes.number,
    post: PropTypes.object,
};

// ----------------------------------------------------------------------

export function PostContent({ title, type, rating, btnText, email, btnIcon, contactno, secondarybtnText, organizationRegistrationNumber, membershipNumber }) {

    const getBgColor = (renderType) => {
        const obj = {
            pending: 'background.green',
            linked: 'error.main',
            link: 'background.green'
        }
        return obj[renderType]
    }

    return (
        <Stack pl={1.5}>
            <Stack direction='row' mb={2} alignItems='center'>
                <Typography variant="subtitle1">
                    {title}
                </Typography>
                <Chip
                    sx={{
                        color: "background.green",
                        ml: '10px',
                        bgcolor: 'background.lightgreen'
                    }}
                    label="Brand"
                />
            </Stack>
            <Rating value={Number(rating)} readOnly sx={{ color: '#FF6E00', mb: 2 }} />
            <Typography mb={2} variant='caption' color='text.disabled'>Organization Registration Number : {organizationRegistrationNumber}</Typography>
            <Typography mb={2} variant='caption' color='text.disabled'>Membership Number : {membershipNumber}</Typography>
            <Stack direction="row" spacing={5} mb={2}>
                <Stack
                    direction="row"
                    spacing={0.5}
                    alignItems='center'
                >
                    <Iconify sx={{ color: "background.green" }} icon="mage:phone-call" />
                    <Typography variant='caption' color='text.disabled'>{contactno}</Typography>
                </Stack>
                <Stack
                    direction="row"
                    spacing={0.5}
                    alignItems='center'

                >
                    <Iconify sx={{ color: "background.green" }} icon="ion:mail-outline" />
                    <Typography variant='caption' color='text.disabled'>{email}</Typography>
                </Stack>
            </Stack>
            <Stack direction="row" spacing={2} >
                <Button variant='contained' startIcon={btnIcon ? <SvgColor src={`/assets/images/Link/${btnIcon}.svg`} /> : ''} sx={{ bgcolor: getBgColor(type) }}>
                    {btnText}
                </Button>
                {type === 'pending' &&
                    <Button variant='outlined'>
                        {secondarybtnText}
                    </Button>
                }
            </Stack>
        </Stack >
    );
}

PostContent.propTypes = {
    email: PropTypes.string,
    title: PropTypes.string,
    rating: PropTypes.string,
    organizationRegistrationNumber: PropTypes.string,
    membershipNumber: PropTypes.string,
    contactno: PropTypes.string,
    btnIcon: PropTypes.string,
    secondarybtnText: PropTypes.string,
    btnText: PropTypes.string,
    type: PropTypes.string,
};
