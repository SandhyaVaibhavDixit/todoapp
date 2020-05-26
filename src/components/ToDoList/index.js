import React, { useEffect, useReducer } from 'react';
import { getAll } from "../../_services/ToDoItemServices";
import { withRouter } from 'react-router'; 
import { Button } from '../../_shared/Button';
import { reducer } from "../../store/reducers";
import { UpdateToDoItems } from '../../_utils/MarkToDoItems';

import * as actionTypes from "../../store/actions/actionTypes";
import './index.scss';

import { ToDoItems }  from '../../_shared/ToDoItems';

const ToDoList = ( props ) => {
    const initialState = {
        toDoItems: {},
        loading: true,
        error:'',
        showActive: true,
        showCompleted: false
    };

    let checkedItems = [];
    const [ state, dispatch ] = useReducer(reducer, initialState);
    
    const GET_TODOITEM_LISTENER = () =>{
        useEffect(() => {
            const getToDoItems = async() => {
                dispatch({ type: actionTypes.START_GET_TODOITEMS_FLOW});
                await getAll()
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

            getToDoItems();
        },[]);
    }

    GET_TODOITEM_LISTENER();

    const onInputCheckBoxChangeHandler = (e) => {
        const { checked , value } = e.target;
        const id = parseInt(value);

        if (checked === true) {
            checkedItems = [...checkedItems, id];
        }
        else {
            checkedItems = checkedItems.filter( checkedItem => checkedItem !== id );
        }
    }

    const onMarkAsSelectedHandler = ( markAction ) => {
        UpdateToDoItems(markAction, state.toDoItems, checkedItems);
        dispatch({
            type: actionTypes.END_MARK_TODOITEMS_FLOW,
            actionType: markAction,
            checkedItems: checkedItems
        });
    }

    const onActiveClickHandler = () => {
        dispatch({
            type: actionTypes.START_SET_ACTIVE_API,
            showActive: true,
            showCompleted: false
        });
    }

    const onCompletedClickHandler = () => {
        dispatch({
            type: actionTypes.START_SET_COMPLETED_API,
            showActive: false,
            showCompleted: true
        });
    }

    const  onShowAddTaskClickkHandler = () => {
         props.history.push('/addToDoItem');
    }

    const renderList = () => {
        const { loading, error, toDoItems } = state;
        const hasError =  ( error && Boolean(error.length !== 0));
        const isLoading = loading || hasError ;

        const list = isLoading ? 
            ( <div> Loading.....</div>)
            :    
            (
                <ToDoItems 
                    toDoItems={toDoItems}
                    showActive={state.showActive}
                    showCompleted={state.showCompleted}
                    onInputCheckBoxChangeHandler={onInputCheckBoxChangeHandler}
                    onMarkAsSelectedHandler={onMarkAsSelectedHandler}/>                                    
            );

            return list;
    }

    const renderAddtaskButton = () => {
        return (
            <Button
                buttonClass='add-task'
                onClick ={onShowAddTaskClickkHandler}
                title   ='Add Task'                
            />
        )
    }

    const renderToggleButtons = () => {
        return (
            <div className='toggle-active'>
                <div>
                    <Button
                        buttonClass={state.showActive === true ? 'active' : 'not-active'}
                        onClick ={onActiveClickHandler}
                        title   ='Active'                
                    />
                </div>
                <div>
                    <Button
                        buttonClass={state.showCompleted === true ? 'completed' : 'not-completed'}
                        onClick ={onCompletedClickHandler}
                        title   ='Completed'                
                    />

                </div>
            </div>
        )
    }
    return(
        <div className='list'>
            <br></br>
            { renderAddtaskButton() }
            <br></br>
            { renderList() }
            <br></br>
            { renderToggleButtons() }
        </div>
    );
}; 

export default withRouter(ToDoList);