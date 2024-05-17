import { useTheme } from '@emotion/react';
import { usePathname } from 'next/navigation';

import Stack from '@mui/material/Stack';
import { alpha, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function NavUpgrade() {
  const pathname = usePathname()
  // /dashboard/settings/scoring-partner-type/
  const startString = "/dashboard/settings/"

  const theme = useTheme()
  const active = pathname.startsWith(startString)

  return (
    <Stack
      sx={{
        px: 2,
        py: 5,
        textAlign: 'center',
      }}
    > <Stack
      direction='row'
      component={RouterLink}
      href={paths.dashboard.settings.scoringpartnertype}
      sx={{

        cursor: 'pointer',
        textDecoration: 'none',
        color: "text.secondary",
        py: 1, px: 1, borderRadius: 1,
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.04)', // Example background color on hover
        },
        ...(active && {
          color: theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.primary.light,
          backgroundColor: alpha(theme.palette.primary.main, 0.08),
          fontWeight: 700,
          '& .icon': {
            width: 24,
            height: 24,
            flexShrink: 0,
            marginRight: theme.spacing(1.5),
          },
          '& .MuiTypography-body1 ': {
            fontWeight: theme.typography.fontWeightSemiBold,
          },
          '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.16),
          },
        }),
      }}
    >
        {
          active ? <img className="icon" src="/assets/icons/settings/green-setting-icon.svg" alt='setting-icon' /> : <Iconify className="icon" sx={{ mr: 2 }} icon="ant-design:setting-filled" width={24} />
        }

        <Typography>Settings</Typography>
      </Stack>
    </Stack>
  );
}
