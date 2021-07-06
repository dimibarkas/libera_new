import jwt_decode from "jwt-decode";
import { LOGIN, LOGOUT } from "../../../types";


export default function userReducer(state, action) {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                loggedIn: true,
                authInfo: {
                    accessToken: action.payload.accessToken,
                    refreshToken: action.payload.refreshToken
                },
                tokenData: jwt_decode(action.payload.accessToken)
            };
        case LOGOUT:
            return {
                ...state,
                loggedIn: false,
                authInfo: null,
                tokenData: null
            };
        default:
            return {
                ...state,
            };
    }

}