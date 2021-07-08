import React, {useReducer} from 'react';
import languagesContext from './laguagesContext';
import languagesReducer from './laguagesReducer';
import {CHANGE} from '../../types/types';

const LanguagesState = (props) => {

    const language = true;
    const [state, dispatch] = useReducer(languagesReducer, language);

    const changeLanguage = () => {
        dispatch({type:CHANGE});
    } 

    return ( 
        <languagesContext.Provider
            value={{            
                changeLanguage,
                language: state
            }}
        >
            {props.children}
        </languagesContext.Provider>
     );
}
 
export default LanguagesState;