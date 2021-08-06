import { CHANGE_ACTUAL_DATE } from "../../../types";

const initilizeState = () => {
    let currentDate = new Date()
    currentDate.setHours(12, 0, 0, 0);
    return currentDate
}

const initialState = {
    date: initilizeState()
}

export default function dateReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_ACTUAL_DATE:
            return {
                ...state,
                date: action.payload
            };
        default:
            return {
                ...state,
            };
    }
}