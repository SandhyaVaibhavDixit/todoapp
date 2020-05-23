import React, { Fragment } from 'react';

import { ToDoItem } from './ToDoItem';
import { Button } from '../Button';
export const ToDoItems = (props) => {
    const { toDoItems, showActive, showCompleted, onInputCheckBoxChangeHandler, onMarkAsSelectedHandler } = props;
    
    const renderToDoItems = () => {    
        let filterToDoItem;
        if ( showActive === true) {
            filterToDoItem = toDoItems.filter(({ isActive }) => isActive === 1 );
        }
        else if ( showCompleted === true) {
            filterToDoItem = toDoItems.filter(({ isActive }) => isActive === 0 );
        }

        return filterToDoItem.map(({id, title, description, tag, dueDate, member, isActive}) => {

                    return <ToDoItem key={id} 
                                     id={id}
                                     title={title}
                                     description={description}
                                     tag={tag}
                                     dueDate={dueDate}
                                     member={member}
                                     isActive={isActive} 
                                     onInputCheckBoxChangeHandler={onInputCheckBoxChangeHandler}/>
                });
    };

    const renderMarkDoneButton = () =>{
        return showActive === true ?
                <Button
                    buttonClass='mark-done'
                    onClick ={() => onMarkAsSelectedHandler('done')}
                    title   ='Mark Done Selected'                
                />:
                '';
    }
     return (
         <Fragment>
            { renderToDoItems() }
            { renderMarkDoneButton() }
            <br></br>
            <Button
                buttonClass='mark-delete'
                onClick ={() => onMarkAsSelectedHandler('delete')}
                title   ='Delete Selected'                
            />
        </Fragment>
    )
} 