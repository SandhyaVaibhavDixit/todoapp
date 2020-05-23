import React, { Fragment, useCallback } from 'react';

import { InputElements } from "../InputElements";
import { Button } from '../Button';

import useForm from '../../_hooks/useForm';

export const AddForm = ({formInputs, updateParentState, onSubmitHandler}) => {

    const onFormSubmit = useCallback((values) => {
        const updatedData = {   
                isActive: true,
                ...values 
            };

        updateParentState(updatedData);
        onSubmitHandler(updatedData);
    }, [onSubmitHandler, updateParentState]);

    const {
        values,
        errors,
        onChange,
        onUpdateDate,
        onSubmit,
    } = useForm(onFormSubmit, formInputs);


    const renderForm = () => (
        <Fragment>
            <form onSubmit={onSubmit} className='form'>
            {                
                formInputs.map(({ name, label, elementType, config, validation })  => {
                    const formElement = (
                        <div key={name} className='form-div'>
                            <InputElements
                                key={name}
                                name={name}
                                value={values[name] || ''}
                                label={label}
                                elementType={elementType}
                                options={config.options}
                                placeholder={config.placeholder}
                                validation={validation}
                                onChange={onChange}
                                onUpdateDate={onUpdateDate}
                            />
                            {errors[name] && (
                                <p className="is-danger">{errors[name]}</p>
                            )}
                        </div>
                    );

                    return (
                        formElement
                    )
                })
            }
            <div className='form-bottom'>
                <Button
                    title='Add'
                    type='Submit'
                />
            </div>
        </form>
        </Fragment>
    )
    
    return (
         renderForm() 
    )
}