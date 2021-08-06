import { CHANGE_ACTUAL_DATE } from "../../../types"

export const changeActualDate = (newDate) => {
    return {
        type: CHANGE_ACTUAL_DATE,
        payload: newDate
    };
};