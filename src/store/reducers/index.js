import * as actionTypes from '../actions/actionTypes';

export const updateState = (previousState, updatedState) => {
    return {
        ...previousState,
        ...updatedState
    };
};

const initialState = {
    toDoItems: []
};

const startToDoItemsFlow = ( state ) => {
    return updateState( state, { loading: true } );
};

const endToDoItemsFlow = ( state, action ) => {
    console.log(action);
    return updateState(state, {
        toDoItems: action.response.data,
        loading: false
    });
};

const errorToDoItemsFlow = (state, action) => {
    return updateState(state, {
        error: action.error,
        loading: false
    });

}

export const reducer = ( state = initialState, action ) => {
    console.log(action.type);    
    switch ( action.type ) {
        case actionTypes.START_GET_TODOITEMS_FLOW: return startToDoItemsFlow( state );
        case actionTypes.END_GET_TODOITEMS_FLOW: return endToDoItemsFlow( state, action );
        case actionTypes.ERROR_GET_TODOITEMS_FLOW: return errorToDoItemsFlow(state, action)
        default: return state;
    }
};
