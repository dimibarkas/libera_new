
import { combineReducers } from "redux";

import { user } from "./store/user/reducer"
import { darkMode } from "./store/darkmode/reducer";

const appReducer = combineReducers({
    //User
    user: user,

    //Darkmode
    darkMode: darkMode
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
}

export default rootReducer;

