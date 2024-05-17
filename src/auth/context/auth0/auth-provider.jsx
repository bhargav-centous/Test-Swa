'use client'

// Import statements
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation'
import { useAuth0, Auth0Provider } from '@auth0/auth0-react';
import React, { useMemo, useState, useEffect, useCallback } from 'react';

import { AUTH0_API } from 'src/config-global';

import { AuthContext } from './auth-context';

// AuthProviderWrapper component
function AuthProviderWrapper({ children }) {
  const router = useRouter()
  const { isAuthenticated, user, isLoading, loginWithRedirect, loginWithPopup, logout, getAccessTokenSilently } =
    useAuth0();
  const [popupClick, setPopupClick] = useState(true);

  // LOGIN
  // Handle login with popup
  const handleLoginWithPopup = useCallback(
    async (options) => {
      loginWithPopup?.(options);
      setPopupClick(false);
    },
    [loginWithPopup]
  );

  // LOGOUT
  const handleLogout = useCallback(
    async () => {
      logout?.({ logoutParams: { returnTo: window.location.origin } });
      sessionStorage.removeItem('accessToken');
    },
    [logout]
  );

  // GET ACCESS TOKEN
  const getToken = useCallback(async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      return accessToken;
    } catch (error) {

      if (error.error_description === 'VERIFY_EMAIL') { // Please check and verify your email Address.
        router.push('/auth-demo/modern/verify')
      }
      console.error('Error getting access token:', error);
      throw error;
    }
  }, [getAccessTokenSilently, router]);

  // Determine authentication status
  const checkAuthenticated = isAuthenticated ? 'authenticated' : 'unauthenticated';
  const status = popupClick && isLoading ? 'loading' : checkAuthenticated;

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getToken();
        sessionStorage.setItem('accessToken', token); // Save token to sessionStorage
      } catch (error) {
        console.error('Error fetching access token:', error);
      }
    };

    fetchToken();
  }, [getToken]);

  // Memoize auth context value
  const memoizedValue = useMemo(
    () => ({
      user: {
        ...user,
        displayName: user?.name,
        photoURL: user?.picture,
        role: 'admin',
      },
      method: 'auth0',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      // emailVerified, // Pass email verification status
      loginWithRedirect,
      loginWithPopup: handleLoginWithPopup,
      getToken,
      logout: handleLogout,
    }),
    [handleLoginWithPopup, handleLogout, loginWithRedirect, status, user, getToken]
  );

  return <React.StrictMode><AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider></React.StrictMode>;
}

AuthProviderWrapper.propTypes = {
  children: PropTypes.node,
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const domain = AUTH0_API.domain ?? '';
  const clientId = AUTH0_API.clientId ?? '';
  const redirectUri = AUTH0_API.callbackUrl ?? '';

  // const onRedirectCallback = useCallback((appState) => {
  //   window.location.replace(appState?.returnTo || window.location.pathname);
  // }, []);

  if (!(domain && clientId && redirectUri)) {
    return null;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience: "SWAAPIs"
      }}
      // onRedirectCallback={onRedirectCallback}
      cacheLocation="localstorage"
    >
      <AuthProviderWrapper>{children}</AuthProviderWrapper>
    </Auth0Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};
