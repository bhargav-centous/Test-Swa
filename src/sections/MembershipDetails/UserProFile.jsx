import * as Yup from 'yup';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import Grid from '@mui/material/Unstable_Grid2';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/material/Typography';
import RadioGroup from '@mui/material/RadioGroup';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useMockedUser } from 'src/hooks/use-mocked-user';

import { countries } from 'src/assets/data';

import SvgColor from 'src/components/svg-color';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
    RHFSwitch,
    RHFTextField,
    RHFUploadAvatar,
    RHFAutocomplete,
} from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function UserProfile() {
    const { enqueueSnackbar } = useSnackbar();

    const { user } = useMockedUser();

    const UpdateUserSchema = Yup.object().shape({
        fname: Yup.string().required('First Name is required'),
        lname: Yup.string().required('Last Name is required'),
        email: Yup.string().required('Email is required').email('Email must be a valid email address'),
        photoURL: Yup.mixed().nullable().required('Avatar is required'),
        phoneNumber: Yup.string().required('Phone number is required'),
        country: Yup.string().required('Country is required'),
        address: Yup.string().required('Address is required'),
        state: Yup.string().required('State is required'),
        city: Yup.string().required('City is required'),
        zipCode: Yup.string().required('Zip code is required'),
        about: Yup.string().required('About is required'),
        // not required
        isPublic: Yup.boolean(),
    });

    const defaultValues = {
        fname: 'Gaurav',
        lname: 'Gurjar',
        email: user?.email || '',
        photoURL: user?.photoURL || null,
        phoneNumber: user?.phoneNumber || '',
        country: user?.country || '',
        address: user?.address || '',
        state: user?.state || '',
        city: user?.city || '',
        zipCode: user?.zipCode || '',
        about: user?.about || '',
        isPublic: user?.isPublic || false,
    };

    const methods = useForm({
        resolver: yupResolver(UpdateUserSchema),
        defaultValues,
    });

    const {
        setValue,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = handleSubmit(async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            enqueueSnackbar('Update success!');
            console.info('DATA', data);
        } catch (error) {
            console.error(error);
        }
    });

    const handleDrop = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];

            const newFile = Object.assign(file, {
                preview: URL.createObjectURL(file),
            });

            if (file) {
                setValue('photoURL', newFile, { shouldValidate: true });
            }
        },
        [setValue]
    );

    return (
        <FormProvider methods={methods} onSubmit={onSubmit}>
            <Grid container spacing={3}>
                <Grid xs={12} md={4}>
                    <Card sx={{ pt: 8, pb: 5, px: 3, textAlign: 'center' }}>
                        <RHFUploadAvatar
                            name="photoURL"
                            maxSize={3145728}
                            onDrop={handleDrop}
                        />
                        <Typography mt={2}>User Name</Typography>
                        <RHFSwitch
                            name="isPublic"
                            labelPlacement="start"
                            label="Publish Your Profile"
                        />
                        <RHFSwitch
                            name="isRating"
                            labelPlacement="start"
                            label="Show Your Ratings"
                        />

                        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <SvgColor sx={{ bgcolor: 'text.secondary' }} src="/assets/icons/membership/organization-type-icon.svg" />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={<Typography color="text.grayishblue" fontSize={14}>Organization Type</Typography>}
                                    secondary={
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            Individual
                                        </Typography>
                                    }
                                />
                            </ListItem>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <SvgColor sx={{ bgcolor: 'text.secondary' }} src="/assets/icons/membership/membership-plan-icon.svg" />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={<Typography color="text.grayishblue" fontSize={14}>Membership Plan</Typography>}
                                    secondary={
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            Basic
                                        </Typography>
                                    }
                                />
                            </ListItem>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <SvgColor sx={{ bgcolor: 'text.secondary' }} src="/assets/icons/membership/user-profile-icon.svg" />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={<Typography color="text.grayishblue" fontSize={14}>Membership Number</Typography>}
                                    secondary={
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            354624
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        </List>
                    </Card>
                </Grid>

                <Grid xs={12} md={8}>
                    <Card sx={{ pb: 2, mb: 3 }}>
                        <Typography sx={{ px: 3, py: 2, fontSize: 14, fontWeight: 500 }}>Personal Information</Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Box
                            rowGap={3}
                            columnGap={2}
                            sx={{ px: 3 }}
                            display="grid"
                            gridTemplateColumns={{
                                xs: 'repeat(1, 1fr)',
                                sm: 'repeat(2, 1fr)',
                            }}
                        >
                            <RHFTextField name="fname" label="First Name" />
                            <RHFTextField name="lname" label="Last Name" />
                            <RHFTextField name="email" label="Email Address" />
                            <RHFTextField name="phoneNumber" label="Contact" />
                        </Box>
                        <FormControl sx={{ my: 2, px: 4, }}>
                            <FormLabel id="demo-row-radio-buttons-group-label">Subscribe To Newsletter</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                <FormControlLabel value="no" control={<Radio />} label="No" />
                            </RadioGroup>
                        </FormControl>
                        <Divider sx={{ mb: 2 }} />
                        <Typography sx={{ mb: 3, px: 3, fontSize: 14, fontWeight: 500 }}>Enter Address Information</Typography>
                        <Box sx={{ mb: 3, px: 3 }}>
                            <RHFTextField name="address" label="Address line 1" />
                        </Box>
                        <Box
                            rowGap={3}
                            columnGap={2}
                            sx={{ px: 3, }}
                            display="grid"
                            gridTemplateColumns={{
                                xs: 'repeat(1, 1fr)',
                                sm: 'repeat(2, 1fr)',
                            }}
                        >
                            <RHFTextField name="city" label="City" />
                            <RHFTextField name="state" label="State/Region" />
                            <RHFTextField name="zipCode" label="Zip/Code" />
                            <RHFAutocomplete
                                name="country"
                                type="country"
                                label="Country"
                                placeholder="Choose a country"
                                options={countries.map((option) => option.label)}
                                getOptionLabel={(option) => option}
                            />
                        </Box>

                        <Stack spacing={3} alignItems="flex-end" sx={{ mt: 2, mb: 1, px: 3 }}>
                            <LoadingButton sx={{ bgcolor: 'background.green', color: 'common.white' }} type="submit" variant="contained" loading={isSubmitting}>
                                Save
                            </LoadingButton>
                        </Stack>
                    </Card>
                </Grid>
            </Grid>
        </FormProvider>
    );
}
