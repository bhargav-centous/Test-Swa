import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import { RouterLink } from 'src/routes/components';

import { useAuthContext } from 'src/auth/hooks';

import { useSettingsContext } from '../settings';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const settingContext = useSettingsContext()
  const { authenticated } = useAuthContext();
  const isMini = (settingContext.themeLayout === 'mini')

  const logo = (
    <Box
      ref={ref}
      component="div"
      sx={{
        // width: 40,
        // height: 40,
        ...sx,
        display: 'inline-flex',
        mb: '52px',
      }}
      {...other}
    >
      {authenticated ?
        <img style={{ width: isMini ? '50px' : 150 }} alt='header-icon' src={`/assets/${isMini ? 'mini-logo.svg' : 'swa-logo.svg'}`} /> :
        <img className='23232' style={{ width: isMini ? '50px' : '' }} alt='header-icon' src={`/assets/${isMini ? 'mini-logo.svg' : 'swa-logo.svg'}`} />}

    </Box>
  );

  if (disabledLink) {
    return (
      <Box
        ref={ref}
        component="div"
        sx={{
          // width: 40,
          // height: 40,
          ...sx,
          display: 'inline-flex',
        }}
        {...other}
      >
        <img style={{ width: isMini ? '50px' : '150px' }} alt='header-icon' src="/assets/mini-logo.svg" />
      </Box>
    );
  }

  return (
    <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default Logo;

