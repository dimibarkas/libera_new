import { TOGGLE_DARK_MODE } from "../../../types"

export const toggleDarkMode = () => {
    console.log("toggle action dispatched")
    return {
        type: TOGGLE_DARK_MODE,
    };
};