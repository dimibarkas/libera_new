import { CHANGE_PAGE } from "../../../types";

const initialState = {
    page: 0
}

export default function dateReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_PAGE:
            return {
                ...state,
                page: action.payload
            };
        default:
            return {
                ...state,
            };
    }
}