import React, { useState } from 'react';
import { withRouter } from 'react-router'; 

import { AddItemForm as formInputs } from '../../_utils/Form/AddItemForm';
import { AddForm } from '../../_shared/AddForm';
import { create } from "../../_services/ToDoItemServices";

import './index.scss';

const AddToDoItem = (props) => {
    const initialState = {
        data: {},
        error: ''   
    };

    const [ state, setState ] = useState(initialState);
    const updateState = data => setState(prevState => ({ ...prevState, ...data}));

    const onSubmitHandler = (data) =>{ 
        createToDoItem(data);
    };

    const createToDoItem = async(data) => {
        await create(data)
                .then(resonse => {
                    console.log(resonse);
                    props.history.push('/');
                })
                .catch(error =>{
                    console.log(error);
                });
    }

    const renderHeader = () => {
        return (
            <div>
                <h5>Add To-Do deatils</h5>
            </div>
        )
    }

    const renderForm = () => {
        return (
            <AddForm
                formInputs={formInputs}
                data={state}
                updateParentState={updateState}
                onSubmitHandler={onSubmitHandler}
            />
        )
    }

    return (
        <div className='form'>
         { renderHeader() }
         { renderForm() } 
         </div>
    );
}

export const EnhancedAddItem = withRouter(AddToDoItem);