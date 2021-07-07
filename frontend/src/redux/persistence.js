import { applyMiddleware, compose, createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import localStorage from "redux-persist/es/storage";
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import thunk from "redux-thunk";
import combineReducers from "./reducer";

const persistConfig = {
    key: "root",
    storage: localStorage,
    stateReconciler: hardSet
};
const persistedReducer = persistReducer(persistConfig, combineReducers);
const middleware = thunk;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
    persistedReducer,
    process.env.NODE_ENV === "development"
        ? composeEnhancers(applyMiddleware(middleware))
        : applyMiddleware(middleware)
);

export const persistor = persistStore(store);