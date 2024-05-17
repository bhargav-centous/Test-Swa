import * as Yup from 'yup';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { LoadingButton } from '@mui/lab';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import FormProvider, { RHFTextField } from 'src/components/hook-form';

const DashBorder = styled('div')`
  border: 1px dashed #e8e8e8;
`;

const AddNewRoleView = (({ permissionPages, onSave, onSwitchChange, handleSelectAll }) => {
    const UpdateUserSchema = Yup.object().shape({
        roleName: Yup.string().required('Role name is required').trim(),
    });

    const defaultValues = {
        roleName: '',
    };

    const methods = useForm({
        resolver: yupResolver(UpdateUserSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = handleSubmit(async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            onSave(data?.roleName)
        } catch (e) {
            console.error(e);
        }
    });

    return (
        <FormProvider methods={methods} onSubmit={onSubmit}>
            <Card>
                <Grid item xs={12}>
                    <Typography lineHeight={4} variant="bluishgray" sx={{ px: 3, pb: 2, fontWeight: 500 }}>Personal Information</Typography>
                    <Box
                        rowGap={3}
                        columnGap={2}
                        sx={{ px: 3 }}
                        display="grid"
                        gridTemplateColumns={{
                            xs: 'repeat(1, 1fr)',
                            sm: 'repeat(2, 1fr)',
                        }}
                    />
                    <Box>
                        <Divider sx={{ mb: 2 }} />
                    </Box>
                    <Grid px={3} container mb={3}>
                        <Grid item md={6}>
                            <RHFTextField label="Role Name" required name="roleName" type="roleName" />
                        </Grid>
                    </Grid>
                </Grid>
                <Box>
                    <Divider />
                    <Typography variant="bluishgray" lineHeight={4} sx={{ px: 3, mb: 2, fontWeight: 500 }}>Permission</Typography>
                </Box>
                {permissionPages?.map((item, itemindex) => (
                    <Box key={`${itemindex}permissionPages`} sx={{ px: 3 }}>
                        <Divider />
                        <Typography variant="bluishgray" lineHeight={4} sx={{ mb: 2, fontWeight: 600 }}>{item?.moduleName}</Typography>
                        <Divider />
                        <Stack lineHeight={4} direction="row" justifyContent="space-between" alignItems="center">
                            <Typography >Select All</Typography>
                            <Switch
                                checked={item.listPermissions.every((action) => action.active === true)}
                                onChange={() => handleSelectAll(item?.moduleName, item.AllSelected)} />
                        </Stack>
                        <DashBorder />
                        {item.listPermissions.map((subItem, subItemIndex) => (
                            <React.Fragment key={subItemIndex}>
                                <Stack lineHeight={4} direction="row" justifyContent="space-between" alignItems="center">
                                    <Typography>{subItem.permissionName}</Typography>
                                    <Switch checked={subItem.active} onChange={() => onSwitchChange(subItem.permissionID, item?.moduleName)} />
                                </Stack>
                                <DashBorder />
                            </React.Fragment>
                        ))}
                    </Box>
                ))}
                <Stack p={3} direction="row" justifyContent="end">
                    <LoadingButton sx={{ bgcolor: 'background.green', color: 'common.white' }} type="submit" variant="contained" loading={isSubmitting}>
                        Add
                    </LoadingButton>
                </Stack>
            </Card>
        </FormProvider>
    );
});

AddNewRoleView.propTypes = {
    permissionPages: PropTypes.array,
    onSwitchChange: PropTypes.func,
    handleSelectAll: PropTypes.func,
    onSave: PropTypes.func
};

export default memo(AddNewRoleView);
