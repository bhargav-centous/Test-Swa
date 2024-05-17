'use client'

import useSWR from 'swr';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { fetcher, endpoints, postRequest } from 'src/utils/axios';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import AddNewRoleView from './AddNewRoleView';

const AddNewRole = () => {
    const { enqueueSnackbar } = useSnackbar();
    const URL = endpoints.manageRole.RolesAndPermissions;
    const { data: permissionPages, isLoading, error, isValidating } = useSWR(URL, fetcher);
    const router = useRouter()
    const [permissionList, setPermissionList] = useState([]);
    const settings = useSettingsContext();

    useEffect(() => {
        if (permissionPages) {
            const newData = permissionPages.map(module => ({
                ...module,
                AllSelected: false,
                listPermissions: module.listPermissions.map(permission => ({
                    ...permission,
                    active: false
                }))
            }));
            setPermissionList(newData);
        }
    }, [permissionPages]);

    const onSwitchChange = (id, modulename) => {
        const newPermissionList = permissionList.map(permission => {
            if (permission.moduleName === modulename) {
                permission.listPermissions = permission.listPermissions.map(action => {
                    if (action.permissionID === id) {
                        action.active = !action.active;
                    }
                    return action;
                });
            }
            return permission;
        });
        setPermissionList(newPermissionList);
    }

    const handleSelectAll = (modulename, isChecked) => {
        const newPermissionList = permissionList.map(permission => {
            if (permission.moduleName === modulename) {
                permission.listPermissions = permission.listPermissions.map(action => {
                    action.active = !isChecked;
                    return action;
                });
                permission.AllSelected = !isChecked
            }
            return permission;
        });
        setPermissionList(newPermissionList);
    }

    const onSave = async (role_name) => {
        const tempArray = [...permissionList]
        const allActions = tempArray.flatMap(item => item.listPermissions).map(({ active, permissionID }) => ({ active, permissionID }));
        const payload = {
            roleName: role_name,
            listPermissions: allActions
        }
        const response = await postRequest(endpoints.manageRole.AddRolesAndPermissions, payload);
        if (response.status === 200) {
            enqueueSnackbar('Permission Added.')
            router.push(paths.dashboard.manageRole.list)

        }
    }



    return (
        <Container sx={{ mt: 4 }} maxWidth={settings.themeStretch ? false : 'lg'}>
            <CustomBreadcrumbs
                heading="Add New Role"
                links={[
                    { name: 'Dashboard', href: paths.dashboard.root },
                    { name: 'Add New Role', href: paths.manageRole },
                ]}
                sx={{
                    mb: { xs: 3, md: 5 },
                }}
            />
            <AddNewRoleView
                handleSelectAll={handleSelectAll}
                onSwitchChange={onSwitchChange}
                onSave={onSave}
                permissionPages={permissionList}
            />
        </Container>
    )
}

export default AddNewRole;
