import { LOGIN, LOGOUT } from "../../../types"

export const login = (accessToken, refreshToken) => {
    return {
        type: LOGIN,
        payload: {
            accessToken: accessToken,
            refreshToken: refreshToken
        }
    };
};

export const logout = () => {
    return {
        type: LOGOUT,
    };
};