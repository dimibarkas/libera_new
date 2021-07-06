import Login from "./views/login-page"
import LandingPage from "./views/landing-page"
import SignUp from "./views/signup-page";
import Dashboard from "./layouts/Dashboard";

export const LOGGED_IN = "LOGGED_IN";

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
    {
        path: "/register",
        component: SignUp
    },
    {
        path: "/dashboard",
        component: Dashboard,
        guarded: LOGGED_IN
    }
];