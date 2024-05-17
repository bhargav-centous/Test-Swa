
// TO GET THE USER FROM THE AUTHCONTEXT, YOU CAN USE

// CHANGE:
// import { useMockedUser } from 'src/hooks/use-mocked-user';
// const { user } = useMockedUser();

// TO:
// import { useAuthContext } from 'src/auth/hooks';
// const { user } = useAuthContext();

// ----------------------------------------------------------------------

export function useMockedUser() {
  const user = {
    id: '8864c',
    displayName: 'Test User',
    email: 'Test@gmail.cc',
    password: 'test1234',
    phoneNumber: '7776665550',
    country: 'India',
    address: 'Temp Address',
    state: 'Gujrat',
    city: 'Ahemdavad',
    zipCode: '394107',
    about: 'Praesent turpis. Phasellus viverra nulla ut metus varius laoreet. Phasellus tempus.',
    role: 'admin',
    isPublic: true,
  };

  return { user };
}
