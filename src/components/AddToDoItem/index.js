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

    const renderForm = () => (
        <div className='form'>
            <div>
                <h5>Add To-Do deatils</h5>
            </div>
            <AddForm
                formInputs={formInputs}
                updateParentState={updateState}
                onSubmitHandler={onSubmitHandler}
            />
        </div>
    );

    return (
         renderForm() 
    );

}

export default withRouter(AddToDoItem);