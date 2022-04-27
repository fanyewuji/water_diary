import React, { useReducer } from 'react';
import WaterContext from './waterContext';
import waterReducer from './waterReducer';

import { 
    DRINK_ONE,
    SET_TODAY,
    UPDATE_TODAY,
} from '../types';

const WaterState = props => {
    const initialState = {
        waterToday: {
            id: 1,
            date: '2022-04-27',
            water: 2
        }
    };

    const [state, dispatch] = useReducer(waterReducer, initialState);

    // Set today's water

    // Update today's water

    return (
        <WaterContext.Provider
            value={{
                waterToday: state.waterToday
            }}>
            {props.children}
        </WaterContext.Provider>
    )
}

export default WaterState;
