import * as Yup from 'yup';
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form';
import React, { memo, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { LoadingButton } from '@mui/lab';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import { Skeleton, Stack, Switch } from '@mui/material';
import Typography from '@mui/material/Typography';

import FormProvider, { RHFTextField } from 'src/components/hook-form';

const DashBorder = styled('div')`
  border: 1px dashed #e8e8e8;
`;

const ManageRoleEditView = ({ role, isLoading, onSwitchChange, handleSelectAll, onSave }) => {
    const UpdateUserSchema = Yup.object().shape({
        roleName: Yup.string().required('Role name is required').trim(),
    });

    const defaultValues = {
        roleName: role?.roleName,
    };

    const methods = useForm({
        resolver: yupResolver(UpdateUserSchema),
        defaultValues,
    });


    const {
        handleSubmit,
        formState: { isSubmitting },
        setValue
    } = methods;

    const onSubmit = handleSubmit(async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            onSave(data?.roleName)
        } catch (e) {
            console.error(e);
        }
    });

    useEffect(() => {
        setValue('roleName', role?.roleName)
    }, [role?.roleName, setValue])


    return (
        <FormProvider methods={methods} onSubmit={onSubmit}>
            <Card>
                {
                    isLoading ? <>
                        <Stack px={3}>
                            <Skeleton
                                variant="text"
                                width="100%"
                                height={50}
                            />
                            <hr />
                            {[...Array(5)].map((ele) => (
                                <Stack mb={2}>
                               { [...Array(4)].map((l) => (
                                    <Stack  direction='row' justifyContent='space-between'>
                                        <Skeleton
                                            variant="text"
                                            width="60%"
                                            height={20}
                                        />
                                        <Skeleton
                                            variant="text"
                                            width="20%"
                                            height={20}
                                        />
                                    </Stack>
                                ))}
                                </Stack>
                            ))}
                        </Stack>
                    </> :
                        <>
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
                            {role?.listModules?.map((item, itemindex) => (
                                <Box key={`${itemindex}listModules`} sx={{ px: 3 }}>
                                    <Divider />
                                    <Typography variant="bluishgray" lineHeight={4} sx={{ mb: 2, fontWeight: 600 }}>{item?.moduleName}</Typography>
                                    <Divider />
                                    <Stack lineHeight={4} direction="row" justifyContent="space-between" alignItems="center">
                                        <Typography >Select All</Typography>
                                        <Switch
                                            checked={item.listPermissions.every((action) => action.status === true)}
                                            onChange={() => handleSelectAll(item?.moduleName, item.AllSelected)}
                                        />
                                    </Stack>
                                    <DashBorder />
                                    {item.listPermissions.map((subItem, subItemIndex) => (
                                        <React.Fragment key={subItemIndex}>
                                            <Stack lineHeight={4} direction="row" justifyContent="space-between" alignItems="center">
                                                <Typography>{subItem.permissionName}</Typography>
                                                <Switch checked={subItem.status} onChange={() => onSwitchChange(subItem.permissionID, item?.moduleName)} />
                                            </Stack>
                                            <DashBorder />
                                        </React.Fragment>
                                    ))}
                                </Box>
                            ))}
                            <Stack p={3} direction="row" justifyContent="end">
                                <LoadingButton sx={{ bgcolor: 'background.green', color: 'common.white' }} type="submit" variant="contained" loading={isSubmitting}>
                                    Save
                                </LoadingButton>
                            </Stack>
                        </>
                }
            </Card>
        </FormProvider>
    );
};

ManageRoleEditView.propTypes = {
    role: PropTypes.object,
    onSwitchChange: PropTypes.func,
    handleSelectAll: PropTypes.func,
    onSave: PropTypes.func,
    isLoading: PropTypes.bool
};

export default memo(ManageRoleEditView);
