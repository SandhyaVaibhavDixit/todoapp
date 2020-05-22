import React, { useState } from 'react';
import DatePicker from "react-datepicker";

import './index.scss';
import "react-datepicker/dist/react-datepicker.css"; 

export const DateInput = (props) =>{
    const {
        name,
        value: defaultValue,
        label,
        placeholder,
        onUpdate
    } = props;

    const initialState = {
        value: defaultValue,
    }

    const [state, updateState] = useState(initialState);
    const setState = (state) => updateState(prevState => ({...prevState, ...state}));

    const onBlur = (e) => {
        onUpdate(e)
    }

    const onChange = (date) => {
        setState({ value: date });
    }

    const renderDateElment = () => {
        return (
            <DatePicker
                selected    ={state.value}
                placeholderText ={placeholder}
                className   ='date-element'
                name        ={name}
                onBlur      ={onBlur}
                onChange    ={onChange}
            />
        )
    }

    return(
        <div className='date-div'>
            <label className='label'>{label}</label>
            { renderDateElment() }    
        </div>
    )
} 