import React from 'react';
import './index.scss';
import Momemt from 'moment';

import  { generateKey } from '../../../_utils/generateKey';

export const ToDoItem = (props) =>{
    const {id, title, description, tag, member, dueDate, onInputCheckBoxChangeHandler } = props;
    const profileImage = 'https://picsum.photos/' + generateKey(100, 300);
    const date = Momemt(dueDate).format('DD-MM-yyyy LT');

    const renderItem = () => {
       return (
            <div className='to-do-item'>
                <div className='top'>
                    <div className='select'>
                        <input 
                            type="checkbox" 
                            id={id} 
                            value={id}
                            onChange={onInputCheckBoxChangeHandler}/>
                        <label htmlFor={id}></label>
                    </div>
                    <div className='title-div'>
                        <div>{title}</div>
                        <div>{description}</div>
                    </div>
                    <div className='tag'>{tag}</div>
                </div>
                <div className='bottom'>
                    <div>
                        <img 
                            className='profile-image' 
                            src={profileImage} 
                            alt='user-logo'
                        />
                    </div>
                    <div className='member-date'>
                        <div>{member}</div>
                        <div className='due-date'>Due on {date}</div>
                    </div>
                    <div></div>
                </div>
            </div>
        )
    }

    return renderItem();
}

