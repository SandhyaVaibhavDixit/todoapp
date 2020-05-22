import React, {useState} from 'react';
import { checkValidity } from '../../_utils/CheckValidity';

import './index.scss';
export const TextInput = (props) => {

    const {
        name,
        value: defaultValue,
        label,
        placeholder,
        validation,
        isMultiline, 
        onUpdate
    } = props;

    const initialState = {
        value: defaultValue,
        touched: false,
        isValid: true,
    }

    const [state, updateState] = useState(initialState);
    const setState = (state) => updateState(prevState => ({...prevState, ...state}));

    const classNameIsInputValid = (!(state.isValid) && state.touched) ? 'invalid' : ''; 

    const onFocus = () => {
        setState({ touched: true });
    }

    const onBlur = (e) => {
        onUpdate(e)
    }

    const onChange = ({target: {value}}) => {
        const isValid = checkValidity(value, validation);
        setState({ value, isValid });
    }

    const renderTextElment = () => {
        if (isMultiline === false) {
            return  <input 
                        placeholder ={placeholder}
                        className   ={`input ${classNameIsInputValid}`}
                        type        ='text'
                        name        ={name}
                        value       ={state.value}
                        onFocus     ={onFocus}
                        onBlur      ={onBlur}
                        onChange    ={onChange}
                    />
        }
        else {
            return <textarea
                        placeholder ={placeholder}
                        rows        ={5}
                        cols        ={50}
                        name        ={name}
                        className   ={`textarea ${classNameIsInputValid}`}
                        value       ={state.value}
                        onFocus     ={onFocus}
                        onBlur      ={onBlur}
                        onChange    ={onChange}
                    />
        }
    }

    return (
        <div className='text-input'>
            <label className='label'>{label}</label>
            { renderTextElment() }    
        </div>
    )
}
