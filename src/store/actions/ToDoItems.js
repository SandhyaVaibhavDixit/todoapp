import * as actionTypes from './actionTypes';
import axios from "../../_utils/axios";

export const start_get_todoitems_flow = () => {
    console.log("start");
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