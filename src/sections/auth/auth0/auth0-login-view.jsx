'use client'

import Link from 'next/link'
import { useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useSearchParams } from 'src/routes/hooks';

import { useAuthContext } from 'src/auth/hooks';
import { PATH_AFTER_LOGIN } from 'src/config-global';

// ----------------------------------------------------------------------

export default function Auth0LoginView() {
  const { loginWithRedirect } = useAuthContext()

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');


  const handleLoginWithRedirect = useCallback(async () => {
    try {
      await loginWithRedirect?.({
        appState: {
          returnTo: returnTo || PATH_AFTER_LOGIN,
        },
      });
    } catch (error) {
      console.error(error);
    }
  }, [loginWithRedirect, returnTo]);

  const handleRegisterWithRedirect = useCallback(async () => {
    try {
      await loginWithRedirect?.({
        appState: {
          returnTo: returnTo || PATH_AFTER_LOGIN,
        },
        authorizationParams: {
          screen_hint: 'signup',
        },
      });
    } catch (error) {
      console.error(error);
    }
  }, [loginWithRedirect, returnTo]);

  return (
    <Stack position='relative' direction='column' height='100%' justifyContent='center'>
      <Typography fontSize={24} fontWeight={700} textAlign='center' variant="footertext" sx={{ mb: 5 }}>
        Welcome to SWA
      </Typography>
      <Typography color='#464646' variant="body2" textAlign='center' sx={{ mb: 5 }}>
        Login with your SWA account to continue
      </Typography>

      <Stack direction='row' justifyContent='center' spacing={2}>
        <Button
          sx={{ width: '153px', bgcolor: 'background.green' }}
          size="large"
          variant="contained"
          onClick={handleLoginWithRedirect}
        >
          Log in
        </Button>
        <Button
          sx={{ bgcolor: 'background.darkGray', width: '153px' }}
          size="large"
          variant="contained"
          onClick={handleRegisterWithRedirect}
        >
          Sign Up
        </Button>
      </Stack>
      <Stack position='absolute' width={1} bottom={30} direction='row' justifyContent='center'>
        <Link className='next-link' href="">
          <Typography letterSpacing={2} fontWeight={400} fontSize={14} color='#B4B5B9'>Terms of use   |   Privacy policy</Typography>
        </Link>
      </Stack>
    </Stack>
  );
}
