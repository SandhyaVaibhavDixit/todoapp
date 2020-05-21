import React, { Fragment } from 'react';

import { ToDoItem } from './ToDoItem';
import { Button } from '../Button';
export const ToDoItems = (props) => {
    const { toDoItems, onInputCheckBoxChangeHandler, onMarkAsSelectedHandler } = props;
    
    const renderToDoItems = () => {    
        return toDoItems.map(({id, title, description, tag, dueDate, member, isActive}) => {

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

     return (
         <Fragment>
            { renderToDoItems() }
            <Button
                    onClick ={onMarkAsSelectedHandler}
                    title   ='Mark Done Selected'                
                />
        </Fragment>
    )
} 