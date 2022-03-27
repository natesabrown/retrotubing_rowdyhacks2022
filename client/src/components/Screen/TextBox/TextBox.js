import React from 'react';
import useText from './useText';

export default function TextBox({recording}){
    const text = useText(recording);

    return (
        <div>
            {text}
        </div>
    );
}