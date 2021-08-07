
import { combineReducers } from "redux";

import { user } from "./store/user/reducer"
import { date } from "./store/orders/reducer";
import { darkMode } from "./store/darkmode/reducer";
import { articlesTable } from "./store/articles/reducer";

const appReducer = combineReducers({
    //User
    user: user,

    //Articles
    articles_table: articlesTable,

    //Orders
    date: date,

    //Darkmode
    darkMode: darkMode
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
}

export default rootReducer;

