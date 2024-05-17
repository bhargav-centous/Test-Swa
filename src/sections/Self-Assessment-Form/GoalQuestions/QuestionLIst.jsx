import React from 'react'

import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Radio from '@mui/material/Radio'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import FormControlLabel from '@mui/material/FormControlLabel'


const QuestionLIst = () => (
    <>
        <Stack>
            <Typography lineHeight={4} variant='bluishgray'>UN SDG #1 – End poverty in all its forms everywhere</Typography>
            <Typography mb={3} variant='bluishgray'>1. Which NGO’s are you affiliated with to work on SDG Goal #1 End  poverty in all its froms everywhere?</Typography>
            <Stack>
                <Grid container spacing={2}>
                    <Grid item md={8}>
                        <Grid container spacing={2}>
                            {
                                [...Array(6)].map((goal, goalIndex) => (
                                    <Grid key={goalIndex} item xs={6}>
                                        <Stack direction='row' alignItems='center'>
                                            <FormControlLabel
                                                control={
                                                    <Radio name="antoine"
                                                    />
                                                }
                                                label={`Answer ${goalIndex + 1}`}
                                            />
                                        </Stack>
                                    </Grid>
                                ))
                            }

                        </Grid>
                    </Grid>
                    <Grid item md={4} >
                        <Typography color='#6E7C89' lineHeight={3} variant='bluishgray'>Upload Your Evidence</Typography>
                        <Stack sx={{ pl: 1.8, py: 1.5 }} borderRadius={1} border={1} borderColor="#BEC8D0">
                            <input type='file' />
                        </Stack>
                        <Typography lineHeight={2} fontSize={12} fontWeight={300} color='#C51919'>File upload required</Typography>
                    </Grid>
                </Grid>
            </Stack>
        </Stack>
        <Divider sx={{ my: 2 }} />
        <Stack>
            <Typography lineHeight={4} variant='bluishgray'>UN SDG #1 – End poverty in all its forms everywhere</Typography>
            <Typography mb={3} variant='bluishgray'>1. Which NGO’s are you affiliated with to work on SDG Goal #1 End  poverty in all its froms everywhere?</Typography>
            <Stack>
                <Grid container spacing={2}>
                    <Grid item md={8}>
                        <Grid container spacing={2}>
                            {
                                [...Array(6)].map((goal, goalIndex) => (
                                    <Grid key={goalIndex} item xs={6}>
                                        <Stack direction='row' alignItems='center'>
                                            <FormControlLabel
                                                control={
                                                    <Radio name="antoine"
                                                    />
                                                }
                                                label={`Answer ${goalIndex + 1}`}
                                            />
                                        </Stack>
                                    </Grid>
                                ))
                            }

                        </Grid>
                    </Grid>
                    <Grid item md={4} >
                        <Typography color='#6E7C89' lineHeight={3} variant='bluishgray'>Upload Your Evidence</Typography>
                        <Stack sx={{ pl: 1.8, py: 1.5 }} borderRadius={1} border={1} borderColor="#BEC8D0">
                            <input type='file' />
                        </Stack>
                        <Typography lineHeight={2} fontSize={12} fontWeight={300} color='#C51919'>File upload required</Typography>
                    </Grid>
                </Grid>
            </Stack>
        </Stack>
        <Divider sx={{ my: 2 }} />
    </>
)

export default QuestionLIst