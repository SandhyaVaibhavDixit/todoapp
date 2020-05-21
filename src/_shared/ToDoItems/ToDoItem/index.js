import React from 'react';
import './index.scss';


export const ToDoItem = (props) =>{
    const {title, discription, tag, member, dueDate} = props;

    const renderItem = () => {
        <div className='to-do-item'>
            <div>selected</div>
            <div>{title}</div>
            <div className='tag'>{tag}</div>
            <div>{discription}</div>
            <div>{member}</div>
            <div className='due-date'>{dueDate}</div>
        </div>
    }

    return renderItem;
}

