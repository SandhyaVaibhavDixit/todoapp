import React, { useEffect, useReducer } from 'react';
import axios from "axios";
import { reducer } from "../../store/reducers";
import * as action from "../../store/actions/actionTypes";
import './index.scss';

const initialState = {
    toDoItems: {},
    loading: true,
    error:''
};

export const ToDoList = ( props ) => {
    const initialState = [];

    const [ state, dispatch ] = useReducer(reducer, initialState);

    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

    useEffect(() => {
        const getToDOItems = async() => {
            dispatch({ type: action.START_GET_TODOITEMS_FLOW});
            //https://cors-anywhere.herokuapp.com/
            await axios.get('https://teronext-node-api.herokuapp.com/todos')
                        .then(response => {
                            dispatch({ type: action.END_GET_TODOITEMS_FLOW, response});
                        })
                        .catch(error => {
                            dispatch({ type: action.ERROR_GET_TODOITEMS_FLOW, error: error});
                        });
        }

        getToDOItems();
    },[]);

    return(<div>
                    
        </div>);
}; 
