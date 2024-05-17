'use client'

import * as Yup from 'yup';
import { find } from 'lodash';
import PropTypes from 'prop-types';
import 'react-phone-input-2/lib/style.css';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useFieldArray } from 'react-hook-form';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';

import { endpoints, getRequest, putRequest, postRequest } from 'src/utils/axios';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
    RHFSwitch,
    RHFTextField,
    RHFRadioGroup,
    RHFAutocomplete,
} from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function AddGoalQuestionForm({ id = false }) {
    const { enqueueSnackbar } = useSnackbar();
    const [masterData, setMasterData] = useState({
        scoringPartnerType: [],
        scoringPartnerCategory: [],
        goal: [],
        subGoal: [],
        goalScoringPartnerType: [],
    })

    const router = useRouter();

    const getMasterData = async () => {
        const requests = [
            { key: 'scoringPartnerType', url: endpoints.settings.ScoringPartnerTypes },
            { key: 'goalScoringPartnerType', url: endpoints.settings.GoalScoringPartnerType },
            { key: 'goal', url: endpoints.settings.Goals },
            { key: 'subGoal', url: endpoints.settings.SubGoal },
            { key: 'scoringPartnerCategory', url: endpoints.settings.ScoringPartnerCategories }
        ];

        let Obj = {
            scoringPartnerType: [],
            scoringPartnerCategory: [],
            goal: [],
            subGoal: [],
            goalScoringPartnerType: [],
        };

        await Promise.all(requests.map(async ({ key, url }) => {
            const response = await getRequest(`${url}?PageNumber=1&PageSize=1000`);
            Obj = { ...Obj, [key]: response.data.items };
        }));

        setMasterData(Obj)
    };

    useEffect(() => {
        Promise.all([
            getMasterData()
        ])
    }, [])


    useEffect(() => {
        const getQuestionById = async (questionID) => {
            try {
                const response = await getRequest(`${endpoints.goalQuestion.getDataById}/${questionID}`);
                if (response.status === 200) {
                    return response.data;
                }
                return {}; // return an empty object if response status is not 200
            } catch (error) {
                console.error("Error fetching selected staff:", error);
                return {}; // return an empty object if there's an error
            }
        };

        const fetchData = async () => {
            if (id) {
                const selectedQuestion = await getQuestionById(id);
                // setValue('firstName', selectedStaff.firstName)
                // setValue('lastName', selectedStaff.lastName)
                // setValue('email', selectedStaff.email)
                // // setValue('photoURL', selectedStaff.photoURL)
                // setValue('contactNumber', selectedStaff.contactNumber)
                // setValue('userRoleID', selectedStaff.userRoleName)
                // setValue('countryCodeID', selectedStaff?.countryCodeID?.toString())
            }
        };

        fetchData(); // Call the async function

    }, [id]);

    const UpdateUserSchema = Yup.object().shape({
        heading: Yup.string().required('Heading is required').trim(),
        question: Yup.string().required('Question is required').trim(),
        isEvidenceRequired: Yup.boolean().required('Evidence is required'),
        scoringPartnerType: Yup.string().required('Scoring Partner Type is required'),
        goalScoringPartnerType: Yup.string().required('Goal Scoring Partner Type is required'),
        subGoal: Yup.string().required('Sub Goal is required'),
        goal: Yup.string().required('Goal is required'),
        scoringPartnerCategory: Yup.string().required('Scoring Partner Category is required'),
        listQuestionAnswerVM: Yup.array().of(
            Yup.object().shape({
                answer: Yup.string().required('Answer name is required').trim(),
                points: Yup.string().required('Points are required').min(0, 'Points must be greater than or equal to 0').trim(),
            })
        ).required('At least one answer is required'),
        status: Yup.boolean()
    });

    const defaultValues = {
        heading: '',
        question: '',
        isEvidenceRequired: false,
        scoringPartnerType: '',
        goalScoringPartnerType: '',
        goal: '',
        subGoal: '',
        scoringPartnerCategory: '',
        status: true,
        listQuestionAnswerVM: [{ answer: '', points: "" }]
    };

    const methods = useForm({
        resolver: yupResolver(UpdateUserSchema),
        defaultValues,
    });

    const { control, handleSubmit, formState: { isSubmitting } } = methods;

    const { fields, append, remove } = useFieldArray({
        control,
        name: "listQuestionAnswerVM",
    });

    const handleAddAnswer = () => {
        append({ answer: '', points: "" });
    };
    const handleRemoveAnswer = (index) => {
        remove(index);
    };

    const onSubmit = async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            const obj = {
                scoringPartnerType: find(masterData.scoringPartnerType, { partnerTypeCode: data.scoringPartnerType })?.id,
                scoringPartnerCategory: find(masterData.scoringPartnerCategory, { scoringPartnerCategoryTypeCode: data.scoringPartnerCategory })?.id,
                goal: find(masterData.goal, { goalName: data.goal })?.id,
                subGoal: find(masterData.subGoal, { subGoalName: data.subGoal })?.id,
                goalScoringPartnerType: find(masterData.goalScoringPartnerType, { scoringPartnerTypeCode: data.goalScoringPartnerType })?.id,
            }
            const payload = { ...data, ...obj }
            if (id) { // when Id is not undefined
                payload.id = id
            }
            let response;
            if (id) { // Update Time Call
                response = await putRequest(`${endpoints.addStaff.editStaff}/${id}`, payload)
            } else { // Create Time Call.
                response = await postRequest(endpoints.goalQuestion.addGoalQuestion, payload)
            }
            if (response.status === 200) {
                enqueueSnackbar(`Data ${id ? "Update" : "Add"} successfully.`)
                if (!id) {
                    setTimeout(() => {
                        router.push(paths.dashboard.goalQuestion.root)
                    }, [500])
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <Card sx={{ pb: 2, mb: 3 }}>
                        <Typography sx={{ px: 3, py: 2, fontWeight: 500, color: '#1D2630', fontSize: 14 }}>Goal Categories</Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Box sx={{ px: 3, mt: 2 }}>
                            <RHFTextField
                                name="heading"
                                required
                                label="Heading"
                            />
                        </Box>
                        <Box sx={{ px: 3, mt: 2 }}>
                            <RHFTextField
                                name="question"
                                required
                                label="Question"
                            />
                        </Box>
                        <Stack spacing={2} sx={{ px: 3, mt: 2 }}>
                            <Grid container spacing={2} alignItems='center'>
                                {fields.map((field, index) => (
                                    <React.Fragment key={field.id}>
                                        <Grid item md={5} sm={5}>
                                            <RHFTextField
                                                fullWidth
                                                name={`listQuestionAnswerVM[${index}].answer`}
                                                required
                                                label="Answer"
                                            />
                                        </Grid>
                                        <Grid item md={5} sm={5}>
                                            <RHFTextField
                                                name={`listQuestionAnswerVM[${index}].points`}
                                                required
                                                type="number"
                                                label="Points"
                                            />
                                        </Grid>
                                        {fields?.length > 1 &&
                                            <Grid item md={2} sm={2}>
                                                <Button
                                                    sx={{ mt: 3, border: '1px solid error.main' }}
                                                    onClick={() => handleRemoveAnswer(index)}
                                                    variant="text"
                                                >
                                                    <Iconify width={25} sx={{ color: 'text.secondary', }} icon="solar:trash-bin-trash-bold" />
                                                </Button>
                                            </Grid>}
                                    </React.Fragment>
                                ))}
                            </Grid>
                            <Stack direction='row'>
                                <Button
                                    onClick={handleAddAnswer}
                                    variant="contained"
                                >
                                    <Iconify icon="mingcute:add-line" />
                                </Button>
                            </Stack>
                        </Stack>
                        <Stack spacing={3} alignItems='center' direction='row' sx={{ px: 3, mt: 2 }}>
                            <Typography fontSize={14}>Do you want to evidence required?</Typography>
                            <RHFRadioGroup
                                row
                                name="isEvidenceRequired"
                                spacing={4}
                                options={[
                                    { value: true, label: 'Yes' },
                                    { value: false, label: 'No' },
                                ]}
                            />
                        </Stack>
                        <Box sx={{ px: 3, mt: 2 }}>
                            <Grid container spacing={2} alignItems='center'>
                                <Grid item md={6} sm={12}>
                                    <RHFAutocomplete
                                        options={masterData?.scoringPartnerType?.map((option) => option.partnerTypeCode)}
                                        name="scoringPartnerType"
                                        getOptionLabel={(option) => option}
                                        required
                                        label="Scoring Partner Type"
                                    />
                                </Grid>
                                <Grid item md={6} sm={12}>
                                    <RHFAutocomplete
                                        options={masterData?.goalScoringPartnerType?.map((option) => option.scoringPartnerTypeCode)}
                                        name="goalScoringPartnerType"
                                        getOptionLabel={(option) => option}
                                        required
                                        label="Goal Scoring Partner Type"
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                        <Box sx={{ px: 3, mt: 2 }}>
                            <Grid container spacing={2} alignItems='center'>
                                <Grid item md={6} sm={12}>
                                    <RHFAutocomplete
                                        options={masterData?.goal?.map((option) => option.goalName)}
                                        name="goal"
                                        getOptionLabel={(option) => option}
                                        required
                                        label="Manage Goal"
                                    />
                                </Grid>
                                <Grid item md={6} sm={12}>
                                    <RHFAutocomplete
                                        options={masterData?.subGoal?.map((option) => option.subGoalName)}
                                        name="subGoal"
                                        getOptionLabel={(option) => option}
                                        required
                                        label="Sub Goal"
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                        <Box sx={{ px: 3, mt: 2 }}>
                            <Grid container spacing={2} alignItems='center'>
                                <Grid item md={6} sm={12}>
                                    <RHFAutocomplete
                                        options={masterData?.scoringPartnerCategory?.map((option) => option.scoringPartnerCategoryTypeCode)}
                                        name="scoringPartnerCategory"
                                        getOptionLabel={(option) => option}
                                        required
                                        label="Scoring Partner Category"
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                        <Box sx={{ px: 3, mt: 2 }}>
                            <Stack spacing={2} direction='row' alignItems='center'>
                                <Typography variant='h5' fontWeight={400}>Status</Typography>
                                <RHFSwitch
                                    name="status"
                                    label="Active"
                                />
                            </Stack>
                        </Box>
                        <Stack spacing={3} alignItems="flex-end" sx={{ mt: 2, mb: 1, px: 3 }}>
                            <LoadingButton sx={{ bgcolor: 'background.green', color: 'common.white' }} type="submit" variant="contained" loading={isSubmitting}>
                                {id ? "Save" : "Add"}
                            </LoadingButton>
                        </Stack>
                    </Card>
                </Grid>
            </Grid>
        </FormProvider >
    );
}

AddGoalQuestionForm.propTypes = {
    id: PropTypes.string,
}