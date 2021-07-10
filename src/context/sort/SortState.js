import React, {useReducer} from 'react';
import sortContext from './sortContext';
import sortReducer from './sortReducer';
import {CHANGE_HIGH, CHANGE_LOW} from '../../types/types';

const LanguagesState = (props) => {

    const sort = "high";
    const [state, dispatch] = useReducer(sortReducer, sort);

    const changeSortHig = () => {
        dispatch({type:CHANGE_HIGH});
    } 

    const changeSortLow = () => {
        dispatch({type:CHANGE_LOW});
    } 

    return ( 
        <sortContext.Provider
            value={{            
                changeSortHig,
                changeSortLow,
                sort: state
            }}
        >
            {props.children}
        </sortContext.Provider>
     );
}
 
export default LanguagesState;