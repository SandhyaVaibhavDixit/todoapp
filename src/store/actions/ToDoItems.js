import * as actionTypes from './actionTypes';

export const start_get_todoitems_flow = () => {
    return {
        type : actionTypes.START_GET_TODOITEMS_FLOW
    };
} 

export const end_get_todositems_flow = ( toDoItems) => {
    return {
        type : actionTypes.END_GET_TODOITEMS_FLOW,
        toDoItems : toDoItems
    };
}

export const error_get_todoitems_flow = (error) => {
    return {
        type : actionTypes.ERROR_GET_TODOITEMS_FLOW,
        error : error
    };
}

export const end_mark_todoitems_flow = ( actionType ) => {
    return {
        type: actionTypes.END_MARK_TODOITEMS_FLOW,
        actionType: actionType
    }
};
