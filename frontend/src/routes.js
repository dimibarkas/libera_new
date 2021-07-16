import Login from "./views/login-page"
import LandingPage from "./views/landing-page"
import SignUp from "./views/signup-page";
import Dashboard from "./layouts/Dashboard";
import Orders from "./views/orders/orders";
import OrderForm from "./views/orders/order-form";
import Articles from "./views/articles/articles";
import ArticleForm from "./views/articles/article-form";
import Customers from "./views/customers/customers";
import NoMatch from "./views/no-match";
import CustomerForm from "./views/customers/customer-form";

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
    },
    {
        path: "/articles/:id",
        component: ArticleForm,
        guarded: LOGGED_IN
    },
    {
        path: "/customers",
        component: Customers,
        guarded: LOGGED_IN
    },
    {
        path: "/customers/:id",
        component: CustomerForm,
        guarded: LOGGED_IN
    },
    {
        path: "/orders",
        component: Orders,
        guarded: LOGGED_IN
    },
    {
        path: "/orders/:id",
        component: OrderForm,
        guarded: LOGGED_IN
    },
    {
        path: "*",
        component: NoMatch,
    }
];