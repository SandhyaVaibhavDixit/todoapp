import React, { useEffect, useReducer } from 'react';
import axios from "axios";

import { reducer } from "../../store/reducers";
import * as actionTypes from "../../store/actions/actionTypes";
import './index.scss';

import { ToDoItems }  from '../../_shared/ToDoItems';

export const ToDoList = ( props ) => {
    const initialState = {
        toDoItems: {},
        loading: true,
        error:''
    };
    
    const [ state, dispatch ] = useReducer(reducer, initialState);

    useEffect(() => {
        const getToDOItems = async() => {
            dispatch({ type: actionTypes.START_GET_TODOITEMS_FLOW});
            //proxy: https://cors-anywhere.herokuapp.com/
            await axios.get('https://teronext-node-api.herokuapp.com/todos')
                        .then(response => {
                            dispatch({ 
                                type: actionTypes.END_GET_TODOITEMS_FLOW, 
                                response});
                        })
                        .catch(error => {
                            dispatch({ 
                                type: actionTypes.ERROR_GET_TODOITEMS_FLOW, 
                                error: error});
                        });
            }

        getToDOItems();
    },[]);

    const onInputCheckBoxChangeHandler = (e) => {
        const { checked , value } = e.target;
        dispatch({
            type: actionTypes.START_MARK_TODOITEM_API,
            id: value,
            checked: checked
        });
    }

    const onMarkAsSelectedHandler = () => {
    } 

    const renderList = () => {
        const isLoading = state.loading || ( state.error && Boolean(state.error.length !== 0)) ;

        const list = isLoading ? 
            ( <div> Loading.....</div>)
            :    
            (
                <ToDoItems 
                    toDoItems={state.toDoItems} 
                    onInputCheckBoxChangeHandler={onInputCheckBoxChangeHandler}
                    onMarkAsSelectedHandler={onMarkAsSelectedHandler}/>                                    
            );

            return list;
    }

    return(
        <div>
            {renderList()}
        </div>
    );
}; 
