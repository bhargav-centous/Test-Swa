import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { useResponsive } from 'src/hooks/use-responsive';

import Logo from 'src/components/logo';
// ----------------------------------------------------------------------

export default function AuthClassicLayout({ children, image, title }) {
  const mdUp = useResponsive('up', 'md');

  const renderLogo = (
    <Logo
      sx={{
        zIndex: 9,
        m: { xs: 2, md: 5 },
        width: '90%',
        position: 'absolute',
        height: !mdUp ? '100px' : '120px',
        justifyContent: 'center'
      }}
    />
  );

  const renderContent = (
    <Stack
      sx={{
        width: 1,
        mx: 'auto',
        maxWidth: 600,
        px: { xs: 2, md: 8 },
        pt: { xs: 15, md: 0 },
        pb: { xs: 15, md: 0 },
      }}
    >
      {children}
    </Stack>
  );

  const renderSection = (
    <Stack
      flexGrow={1}
      spacing={1}
      alignItems="center"
      justifyContent="center"
      sx={{
        backgroundImage: 'url(/assets/background/Auth-bg.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Logo
        sx={{
          zIndex: 9,
          justifyContent: 'center',
          marginTop: '-60px'
        }}
      />
      <Box
        pt={10}
        component="img"
        alt="auth"
        src={image || '/assets/illustrations/illustration_dashboard.png'}
        sx={{
          maxWidth: {
            xs: 480,
            lg: 544,
            xl: 720,
          },
        }}
      />
    </Stack>
  );

  return (
    <Stack
      component="main"
      direction="row"
      sx={{
        minHeight: '100vh',
      }}
    >

      {mdUp && renderSection}
      {!mdUp && renderLogo}

      {renderContent}
    </Stack>
  );
}

AuthClassicLayout.propTypes = {
  children: PropTypes.node,
  image: PropTypes.string,
  title: PropTypes.string,
};
