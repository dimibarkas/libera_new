import Login from "./views/login-page"
import LandingPage from "./views/landing-page"
import SignUp from "./views/signup-page";
import Dashboard from "./layouts/Dashboard";
import Orders from "./layouts/Orders";
import Articles from "./views/articles/articles";

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
    },
    {
        path: "/orders",
        component: Orders,
        guarded: LOGGED_IN
    },
    {
        path: "/articles",
        component: Articles,
        guarded: LOGGED_IN
    }
];