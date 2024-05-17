'use client';

import PropTypes from 'prop-types';
import { usePathname } from 'next/navigation';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import { alpha, styled } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';


const SettingsLayout = ({ children }) => {
    const settings = useSettingsContext();

    const pathname = usePathname()

    const getPathWiseString = (path, isbtnText) => {
        const obj = {
            '/dashboard/settings/scoring-partner-type/': isbtnText ? 'Add New Partner Type' : 'Scoring Partner Type',
            '/dashboard/settings/goal-scoring-partner-type/': isbtnText ? 'Add New Goal Partner Type' : 'Goal Scoring Partner Type',
            '/dashboard/settings/manage-goal/': isbtnText ? 'Add New Goal' : 'Goal',
            '/dashboard/settings/sub-goal/': isbtnText ? 'Add New Sub Goal' : 'Sub Goal',
            '/dashboard/settings/scoring-partner-category/': isbtnText ? 'Add New Partner Category' : 'Scoring partner category',
        }
        return obj[path]
    }

    const StyledNavItem = styled(ListItemButton, {
        shouldForwardProp: (prop) => prop !== 'active',
    })(({ active, open, depth, theme }) => {
        const subItem = depth !== 1;
        const opened = open && !active;

        const deepSubItem = Number(depth) > 2;

        const noWrapStyles = {
            width: '100%',
            maxWidth: '100%',
            display: 'block',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
        };

        const baseStyles = {
            item: {
                marginBottom: 4,
                borderRadius: 8,
                color: theme.palette.text.secondary,
                padding: theme.spacing(0.5, 1, 0.5, 1.5),
            },
            icon: {
                width: 24,
                height: 24,
                flexShrink: 0,
                marginRight: theme.spacing(2),
            },
            label: {
                ...noWrapStyles,
                ...theme.typography.body2,
                textTransform: 'capitalize',
                color: active ? theme.palette.primary.main : theme.palette.text.secondary,
                fontWeight: theme.typography[active ? 'fontWeightSemiBold' : 'fontWeightMedium'],
            },
            caption: {
                ...noWrapStyles,
                ...theme.typography.caption,
                color: theme.palette.text.disabled,
            },
            info: {
                display: 'inline-flex',
                marginLeft: theme.spacing(0.75),
            },
            arrow: {
                flexShrink: 0,
                marginLeft: theme.spacing(0.75),
            },
        };

        return {
            // Root item
            ...(subItem && {
                ...baseStyles.item,
                minHeight: 44,
                '& .icon': {
                    ...baseStyles.icon,
                },
                '& .sub-icon': {
                    display: 'none',
                },
                '& .label': {
                    ...baseStyles.label,
                },
                '& .caption': {
                    ...baseStyles.caption,
                },
                '& .info': {
                    ...baseStyles.info,
                },
                '& .arrow': {
                    ...baseStyles.arrow,
                },
                ...(active && {
                    color: theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.primary.light,
                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                    '& .icon': {
                        width: 24,
                        height: 24,
                        flexShrink: 0,
                        marginRight: theme.spacing(1.5),
                    },
                    '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.16),
                    },
                }),
                ...(opened && {
                    color: theme.palette.text.secondary,
                    // backgroundColor: theme.palette.action.hover,
                }),
            }),

            // Deep sub item
            ...(deepSubItem && {
                paddingLeft: `${theme.spacing(Number(depth))} !important`,
            }),
        };
    });

    const getURL = (name) => {
        const obj = {
            'Scoring Partner Type': paths.dashboard.settings.scoringpartnertype,
            'Goal Scoring Partner Type': paths.dashboard.settings.goalscoringpartnertype,
            'Manage Goal': paths.dashboard.settings.managegoal,
            'Sub Goal': paths.dashboard.settings.subgoal,
            'Scoring Partner Category': paths.dashboard.settings.scoringpartnercategory,
        }
        return obj[name]
    }

    return (
        <Container sx={{ mt: 4 }} maxWidth={settings.themeStretch ? false : 'xl'}>
            <CustomBreadcrumbs
                heading={getPathWiseString(pathname, false)}
                links={[
                    { name: 'Dashboard', href: paths.dashboard.root },
                    { name: 'Settings', },
                    { name: getPathWiseString(pathname, false), href: paths.addStaff },
                ]}
                sx={{
                    mb: { xs: 3, md: 5 },
                }}
            />
            <Stack direction='row'>
                <Grid spacing={2} container>
                    <Grid item md={2.5} sx={3}>
                        <Card sx={{ py: 3, px: 1 }}>
                            {/* {['Scoring Partner Type', 'Goal Scoring Partner Type'].map((ele, key) => ( */}
                            {['Scoring Partner Type', 'Goal Scoring Partner Type', 'Manage Goal', 'Sub Goal', 'Scoring Partner Category'].map((ele, key) => (
                                <Link
                                    key={key}
                                    component={RouterLink}
                                    href={getURL(ele)}
                                    color="text.secondary"
                                    underline="none"
                                    sx={{
                                        ...(false && {
                                            cursor: 'default',
                                        }),
                                    }}
                                >
                                    <StyledNavItem
                                        disableGutters
                                        open
                                        active={`${getURL(ele)}/` === `${pathname}`}
                                        className='active'
                                        disabled={false}
                                    >
                                        {`${getURL(ele)}/` === `${pathname}` ?
                                            <img className="icon" src="/assets/icons/settings/green-setting-icon.svg" alt='setting-icon' /> : <img className="icon" src="/assets/icons/settings/setting-icon.svg" alt='setting-icon' />}
                                        <Box component="span" sx={{ flex: '1 1 auto', minWidth: 0 }}>
                                            <Box component="span" className="label">
                                                {ele}
                                            </Box>
                                        </Box>
                                    </StyledNavItem>
                                </Link>
                            ))}
                        </Card>
                    </Grid>
                    <Grid item md={9.5} sx={9}>
                        {children}
                    </Grid>
                </Grid>
            </Stack>
        </Container>
    )
}

SettingsLayout.propTypes = {
    children: PropTypes.node,
};

export default SettingsLayout