import React, { useReducer } from 'react';
import WaterContext from './waterContext';
import waterReducer from './waterReducer';

import { 
    DRINK_WATER,
    SET_TODAY,
    SET_GOAL
} from '../types';

const WaterState = props => {
    const initialState = {
        waterToday: {
            id: 1,
            date: '2022-04-27',
            water: 50,
            goal: 2000
        }
    };

    const [state, dispatch] = useReducer(waterReducer, initialState);

    // Set today's water
    const setToday = amountToday => {
        dispatch({
            type: SET_TODAY,
            payload: amountToday
        })
    } 
    
    // Set the goal for drinking water
    const setGoal = goal => {
        dispatch({
            type: SET_GOAL,
            payload: goal
        })
    }

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
                drinkWater,
                setToday,
                setGoal
            }}>
            {props.children}
        </WaterContext.Provider>
    )
}

export default WaterState;
