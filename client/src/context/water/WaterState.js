import React, { useReducer, useCallback, useMemo } from 'react';
import WaterContext from './waterContext';
import waterReducer from './waterReducer';
import axios from 'axios';

import { 
    GET_TODAY,
    GET_HISTORY,
    DRINK_WATER,
    SET_WATER,
    SET_TODAY,
    WATER_ERROR,
    HISTORY_ERROR,
    CLEAR_ERRORS,
    HIDE_HISTORY,
    LOAD_HISTORY,
} from '../types';

const WaterState = props => {
    const initialState = {
        waterToday: null,
        waterHistory: null,
        loading: true,
        loadingWaterHistory: false,
        showWaterHistory: false,
        error: null,
    };

    const [state, dispatch] = useReducer(waterReducer, initialState);

    const getToday = async () => {
        const config = {
            headers: {
                'x-timezone-offset': new Date().getTimezoneOffset()
            }
        }

        try {
            const res = await axios.get('/api/water', config);
            dispatch({
                type: GET_TODAY,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: WATER_ERROR,
                payload: err.response.data.msg
            })
        }
        
    }

    const getWaterHistory = async () => {
        dispatch({ type: LOAD_HISTORY });
        
        try {
            const res = await axios.get('/api/water/all');
            dispatch({
                type: GET_HISTORY,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: HISTORY_ERROR,
                payload: err.response.data.msg
            })
        }
    }

    const waterRecordId = useMemo(() => {
        return state.waterToday?._id || null
    }, [state.waterToday?._id])

    const update = useCallback(async (waterRecord) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.put(`api/water/${waterRecordId}`, waterRecord, config);

            dispatch({
                type: SET_TODAY,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: WATER_ERROR,
                payload: err.response.data.msg || err.response.data.errors[0].msg
            })
        }    
    }, [waterRecordId])
    
    // update today's water
    const updateWater = useCallback(amountToday => {
        update({ 'water': amountToday });
    }, [update]); 

    const setWater = waterAmount => {
        dispatch({
            type: SET_WATER,
            payload: waterAmount
        });
    }
    
    // Set the goal for drinking water
    const updateGoal = goal => {
        update({ 'goal': goal });
    }

    // Set Cup Size
    const updateCupAmount = cupSize => {
        update({ 'cupSize': cupSize });
    }  

    // drink water and update today's water
    const drinkWater = amount => {
        dispatch({
            type: DRINK_WATER,
            payload: amount
        })
    }

    // hide waterHistory
    const hideWaterHistory = () => {
        dispatch({ type: HIDE_HISTORY })
    }

    const clearErrors = () => {
        dispatch({ type: CLEAR_ERRORS })
    }

    return (
        <WaterContext.Provider
            value={{
                waterToday: state.waterToday,
                waterHistory: state.waterHistory,
                showWaterHistory: state.showWaterHistory,
                error: state.error,
                loading: state.loading,
                loadingWaterHistory: state.loadingWaterHistory,
                getToday,
                getWaterHistory,
                drinkWater,
                setWater,
                updateWater,
                updateGoal,
                updateCupAmount,
                hideWaterHistory,
                clearErrors,
            }}>
            {props.children}
        </WaterContext.Provider>
    )
}

export default WaterState;
