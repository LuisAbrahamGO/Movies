import React, {useReducer} from 'react';
import userContext from './userContext';
import userReducer from './userReducer';
import {UNSET_USER, SET_USER} from '../../types/types';

const LanguagesState = (props) => {

    const user = null;
    const [state, dispatch] = useReducer(userReducer, user);

    const loginUser = (user) => {
        dispatch({type:SET_USER, payload: user});
    } 

    const logoutUser = () => {
        dispatch({type:UNSET_USER});
    } 

    return ( 
        <userContext.Provider
            value={{            
                loginUser,
                logoutUser,
                user: state
            }}
        >
            {props.children}
        </userContext.Provider>
     );
}
 
export default LanguagesState;