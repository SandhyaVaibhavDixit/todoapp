import React, { useEffect, useReducer, useState } from 'react';
import axios from "axios";
import { withRouter } from 'react-router'; 
import { Button } from '../../_shared/Button';
import { reducer } from "../../store/reducers";

import * as actionTypes from "../../store/actions/actionTypes";
import './index.scss';

import { ToDoItems }  from '../../_shared/ToDoItems';

const ToDoList = ( props ) => {
    const initialState = {
        toDoItems: {},
        loading: true,
        error:''
    };
     
    const [ state, dispatch ] = useReducer(reducer, initialState);
    const [ showActive, setShowActive ] = useState(true);
    const [ showCompleted, setShowCompleted ] = useState(false);

    useEffect(() => {
        const getToDOItems = async() => {
            dispatch({ type: actionTypes.START_GET_TODOITEMS_FLOW});
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
                    showActive={showActive}
                    showCompleted={showCompleted}
                    onInputCheckBoxChangeHandler={onInputCheckBoxChangeHandler}
                    onMarkAsSelectedHandler={onMarkAsSelectedHandler}/>                                    
            );

            return list;
    }

    const onActiveClickHandler = () => {
        setShowActive(true);
        setShowCompleted(false);
    }

    const onCompletedClickHandler = () => {
        setShowCompleted(true);
        setShowActive(false);
    }

    const  onShowAddTaskClickkHandler = () => {
         props.history.push('/addToDoItem');
    }

    return(
        <div className='list'>
            <br></br>
            <Button
                onClick ={onShowAddTaskClickkHandler}
                title   ='Add Task'                
            />
            <br></br>
            {renderList()}
            <br></br>
             <div className='toggle-active'>
                <div>
                    <Button
                        onClick ={onActiveClickHandler}
                        title   ='Active'                
                    />
                </div>
                <div>
                    <Button
                        onClick ={onCompletedClickHandler}
                        title   ='Completed'                
                    />

                </div>
            </div>
        </div>
    );
}; 

export default withRouter(ToDoList);