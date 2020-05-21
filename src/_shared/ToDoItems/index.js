import React from 'react';

import { ToDoItem } from './ToDoItem';


export const ToDoItems = (props) => {
    const renderToDoItems = () => {
        const { toDoItems } = props;
        
        return toDoItems.map((toDoItem) => {
                    return <ToDoItem toDoItem={toDoItem} />
                });
    };

     return renderToDoItems();
} 