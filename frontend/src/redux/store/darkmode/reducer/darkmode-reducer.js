import { TOGGLE_DARK_MODE } from "../../../types";

export default function darkModeReducer(state = [], action) {
    switch (action.type) {
        case TOGGLE_DARK_MODE:
            return {
                ...state,
                isEnabled: !state.isEnabled,
            };
        default:
            return {
                ...state,
            };
    }
}