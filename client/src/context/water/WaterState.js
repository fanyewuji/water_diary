import React, { useReducer } from 'react';
import WaterContext from './waterContext';
import waterReducer from './waterReducer';

import { 
    DRINK_WATER,
    SET_TODAY,
} from '../types';

const WaterState = props => {
    const initialState = {
        waterToday: {
            id: 1,
            date: '2022-04-27',
            water: 100
        }
    };

    const [state, dispatch] = useReducer(waterReducer, initialState);

    // Set today's water

    // drink water and update today's water
    const drinkWater = amount => {
        dispatch({
            type: DRINK_WATER,
            payload: amount
        })
    }

    return (
        <WaterContext.Provider
            value={{
                waterToday: state.waterToday,
                drinkWater
            }}>
            {props.children}
        </WaterContext.Provider>
    )
}

export default WaterState;
