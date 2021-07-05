import Login from "./views/login-page"
import LandingPage from "./views/landing-page"

export const routes = [
    {
        path: "/",
        exact: true,
        component: LandingPage,
    },
    {
        path: "/login",
        component: Login,
    },
];