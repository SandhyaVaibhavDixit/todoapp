import React, { useEffect, useReducer, useState } from 'react';
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
        error:''
    };

    let checkedItems = [];

    const [ state, dispatch ] = useReducer(reducer, initialState);
    const [ showActive, setShowActive ] = useState(true);
    const [ showCompleted, setShowCompleted ] = useState(false);

    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    
    useEffect(() => {
        const getToDOItems = async() => {
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

        getToDOItems();
    },[]);

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
        // dispatch({
        //     type: actionTypes.END_MARK_TODOITEMS_FLOW,
        //     actionType: markAction,
        //     checkedItems: checkedItems
        // });
        forceUpdate();
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
                    showActive={showActive}
                    showCompleted={showCompleted}
                    onInputCheckBoxChangeHandler={onInputCheckBoxChangeHandler}
                    onMarkAsSelectedHandler={onMarkAsSelectedHandler}/>                                    
            );

            return list;
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
                        buttonClass={showActive === true ? 'active' : 'not-active'}
                        onClick ={onActiveClickHandler}
                        title   ='Active'                
                    />
                </div>
                <div>
                    <Button
                        buttonClass={showCompleted === true ? 'completed' : 'not-completed'}
                        onClick ={onCompletedClickHandler}
                        title   ='Completed'                
                    />

                </div>
            </div>
        </div>
    );
}; 

export default withRouter(ToDoList);