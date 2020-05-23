import * as actionTypes from '../actions/actionTypes';
import { updateState } from '../../_utils/updateState';

const initialState = {
    toDoItems: {},
    loading: true,
    error:''
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

const end_mark_todoItems_flow = ( state, action ) => {
    switch(action.actionType) {
        case 'done':  
                    const updatedToDoItems = state.toDoItems.map(toDoItem => {
                        if (action.checkedItems.includes(toDoItem.id)){
                            return {
                                ...toDoItem, 
                                isActive: false
                            }
                        }
                        else {
                            return toDoItem;
                        }
                    });

                    return updateState(state, {
                        toDoItems: updatedToDoItems }); 
        case 'delete': 
                    const toDoItems = state.toDoItems.filter(todoItem => action.checkedItems.includes(todoItem.id) === false );
                    console.log(toDoItems);
                    return updateState(state, {
                        toDoItems: toDoItems
                    }); 
        default: return state;
    }
}

export const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.START_GET_TODOITEMS_FLOW: return start_get_todoItems_flow( state );
        case actionTypes.END_GET_TODOITEMS_FLOW: return end_get_todosItems_flow( state, action );
        case actionTypes.ERROR_GET_TODOITEMS_FLOW: return error_get_todoItems_flow( state, action );
        
        case actionTypes.END_MARK_TODOITEMS_FLOW: return end_mark_todoItems_flow( state, action )
        default: return state;
    }
};
