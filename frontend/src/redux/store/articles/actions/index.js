import { CHANGE_PAGE } from "../../../types";

export const changePage = (newPage) => {
    return {
        type: CHANGE_PAGE,
        payload: newPage
    };
};