'use client'

import { useSnackbar } from 'notistack';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { endpoints, getRequest, putRequest } from 'src/utils/axios';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ManageRoleEditView from './ManageRoleEditView';


const ManageRoleEdit = () => {
    const settings = useSettingsContext();
    const { enqueueSnackbar } = useSnackbar();
    const [role, setRole] = useState()
    const router = useRouter()
    const [isLoading,setIsLoading] = useState(true)
    const { id } = useParams();

    const getRolebyId = async (roleId) => {
        const URL = `${endpoints.manageRole.editRoleAndPermissions}`; // Using template literals for string interpolation
        const response = await getRequest(`${URL}?RoleID=${roleId}`); // Passing URL and empty data object to putRequest
        if (response.status === 200) {
            setRole(response.data[0])
            setIsLoading(false)
            const tempArray = response.data[0]
            const newData = tempArray?.listModules?.map(module => ({
                ...module,
                AllSelected: module.listPermissions.every((ele) => ele.status === true),
            }));
            setRole({ ...response.data[0], listModules: newData });
        }else{
            setIsLoading(false)
        }
    };
    useEffect(() => {
        getRolebyId(id)
    }, [id])

    const onSwitchChange = (statusID, modulename) => {
        const tempArray = [...role.listModules];
        const newPermissionList = tempArray?.map(permission => {
            if (permission.moduleName === modulename) {
                permission.listPermissions = permission.listPermissions.map(action => {
                    if (action.permissionID === statusID) {
                        action.status = !action.status;
                    }
                    return action;
                });
            }
            return permission;
        });
        setRole({ ...role, listModules: newPermissionList });
    }

    const handleSelectAll = (modulename, isChecked) => {
        const tempArray = [...role.listModules];
        const newPermissionList = tempArray.map(permission => {
            if (permission.moduleName === modulename) {
                permission.listPermissions = permission.listPermissions.map(action => {
                    action.status = !isChecked;
                    return action;
                });
                permission.AllSelected = !isChecked
            }
            return permission;
        });
        setRole({ ...role, listModules: newPermissionList });
    }

    const onSave = async (role_name) => {
        const tempArray = { ...role }
        const allActions = tempArray.listModules.flatMap(({ listPermissions, moduleName }) => ({ listPermissions, moduleName })).flatMap((ele) => ele.listPermissions)
        const payload = {
            roleName: role_name,
            roleID: tempArray?.roleID,
            status: tempArray?.active || true,
            listPermissions: allActions
        }
        const response = await putRequest(`${endpoints.manageRole.editRoleAndPermissions}/${role.roleID}`, payload);
        if (response.status === 200) {
            enqueueSnackbar('Permission Updated.')
            router.push(paths.dashboard.manageRole.list)
        }
    }



    return (
        <Container sx={{ mt: 4 }} maxWidth={settings.themeStretch ? false : 'lg'}>
            <CustomBreadcrumbs
                heading="Edit Role"
                links={[
                    { name: 'Dashboard', href: paths.dashboard.root },
                    { name: 'Edit Role', href: paths.dashboard.manageRole.demo.edit },
                ]}
                sx={{
                    mb: { xs: 3, md: 5 },
                }}
            />
            <ManageRoleEditView
                role={role}
                isLoading={isLoading}
                onSwitchChange={onSwitchChange}
                handleSelectAll={handleSelectAll}
                onSave={onSave}
            />
        </Container>
    )
}

export default ManageRoleEdit;
