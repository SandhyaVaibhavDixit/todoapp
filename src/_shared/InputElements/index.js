import React from 'react';
import { TextInput } from '../TextInput';
import { DateInput } from '../DateInput';
import './index.scss';

export const InputElements = ( props ) => {
    const { name, label, elementType, placeholder, value, validation, onChange } = props;

    switch ( elementType ) { 
        case ( 'textarea' ):
        return <TextInput
                    key={name}
                    name={name}
                    value={value}
                    label={label}
                    placeholder={placeholder}
                    validation={validation}
                    onUpdate={onChange}
                    isMultiline= {true}
                />
        case ( 'date' ):
            return <DateInput
                        name ={name}
                        value ={value}
                        label ={label}
                        onUpdate ={onChange}
                    />
        case ( 'input' ):
        default:
            return  <TextInput
                        key={name}
                        name={name}
                        value={value}
                        label={label}
                        placeholder={placeholder}
                        validation={validation}
                        onUpdate={onChange}
                        isMultiline= {false}
                    />
        }
}
