import { Auth0LoginView } from 'src/sections/auth/auth0';

// ----------------------------------------------------------------------

export const metadata = {
    title: 'SWA: Login',
};

export default function LoginPage() {
    return <Auth0LoginView />;
}
