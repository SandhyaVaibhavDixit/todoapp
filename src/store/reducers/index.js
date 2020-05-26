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
                                isActive: 0
                            }
                        }
                        else {
                            return toDoItem;
                        }
                    });

                    console.log(updatedToDoItems);
                    return updateState(state, {
                        toDoItems: updatedToDoItems }); 
        case 'delete': 
                    const toDoItems = state.toDoItems.filter(todoItem => action.checkedItems.includes(todoItem.id) === false );
                    return updateState(state, {
                        toDoItems: toDoItems
                    }); 
        default: return state;
    }
}

const start_set_active_api = ( state, action) => {
    return updateState( state, {
        showActive: action.showActive,
        showCompleted: action.showCompleted
    });
}

const start_set_completed_api = ( state, action) => {
    return updateState( state, {
        showActive: action.showActive,
        showCompleted: action.showCompleted
    });
}

export const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.START_GET_TODOITEMS_FLOW: return start_get_todoItems_flow( state );
        case actionTypes.END_GET_TODOITEMS_FLOW: return end_get_todosItems_flow( state, action );
        case actionTypes.ERROR_GET_TODOITEMS_FLOW: return error_get_todoItems_flow( state, action );
        
        case actionTypes.END_MARK_TODOITEMS_FLOW: return end_mark_todoItems_flow( state, action )

        case actionTypes.START_SET_ACTIVE_API: return start_set_active_api( state, action);
        case actionTypes.START_SET_COMPLETED_API: return start_set_completed_api( state, action);
        default: return state;
    }
};
