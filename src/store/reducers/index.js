import * as actionTypes from '../actions/actionTypes';
import { updateState } from '../../_utils/updateState';

const initialState = {
    toDoItems: []
};

const start_get_todoItems_flow = ( state ) => {
    return updateState( state, { 
        loading: true 
    });
};

const end_get_todosItems_flow = ( state, action ) => {
    return updateState(state, {
        toDoItems: action.response.data,
        loading: false
    });
};

const error_get_todoItems_flow = (state, action) => {
    return updateState(state, {
        error: action.error,
        loading: false
    });

};

const start_mark_todoItem_api = (state, action) => {
    const id = parseInt(action.id);
    const updatedState = state.toDoItems.map(toDoItem => {
                            if (toDoItem.id === id){
                                return { 
                                    ...toDoItem, 
                                    checked: action.checked
                                }
                            }
                            else {
                                return toDoItem;
                            }
                        });
    return updateState(state, updatedState);
};

export const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.START_GET_TODOITEMS_FLOW: return start_get_todoItems_flow( state );
        case actionTypes.END_GET_TODOITEMS_FLOW: return end_get_todosItems_flow( state, action );
        case actionTypes.ERROR_GET_TODOITEMS_FLOW: return error_get_todoItems_flow( state, action);
        
        case actionTypes.START_MARK_TODOITEM_API: return start_mark_todoItem_api( state, action);
        default: return state;
    }
};
