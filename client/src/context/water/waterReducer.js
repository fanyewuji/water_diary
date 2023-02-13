import { 
    GET_TODAY,
    DRINK_WATER,
    SET_WATER,
    SET_TODAY,
    WATER_ERROR,
    CLEAR_ERRORS,
    LOAD_HISTORY,
    GET_HISTORY,
    HIDE_HISTORY,
    HISTORY_ERROR,
} from '../types';

export default (state, action) => {
    switch(action.type) {
        case GET_TODAY:
            return {
                ...state,
                waterToday: action.payload,
                loading: false
            }
        case LOAD_HISTORY:
            return {
                ...state,
                loadingWaterHistory: true,
            }
        case GET_HISTORY:
            return {
                ...state,
                waterHistory: action.payload,
                loadingWaterHistory: false,
                showWaterHistory: true
            }
        case DRINK_WATER:
            return {
                ...state,
                waterToday: {
                    ...state.waterToday,
                    water: state.waterToday.water + action.payload,
                }
            };
        case SET_WATER:
            return {
                ...state,
                waterToday: {
                    ...state.waterToday,
                    water: action.payload,
                }
            };
        case SET_TODAY:
            return {
                ...state,
                waterToday: action.payload,
                loading: false
            };           
        case HIDE_HISTORY:
            return {
                ...state,
                showWaterHistory: false
            } 
        case WATER_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case HISTORY_ERROR:
            return {
                ...state,
                loadingWaterHistory: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}