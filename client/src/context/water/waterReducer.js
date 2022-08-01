import { 
    DRINK_WATER,
    SET_TODAY,
    SET_GOAL,
    SET_CUP_AMOUNT,
} from '../types';

export default (state, action) => {
    switch(action.type) {
        case DRINK_WATER:
            return {
                ...state,
                waterToday: {
                    ...state.waterToday,
                    water: state.waterToday.water + action.payload,
                }
            };
        case SET_TODAY:
            return {
                ...state,
                waterToday: {
                    ...state.waterToday,
                    water: action.payload,
                }
            };            
        case SET_GOAL:
            return {
                ...state,
                waterToday: {
                    ...state.waterToday,
                    goal: action.payload
                }
            };
        case SET_CUP_AMOUNT:
            return {
                ...state,
                waterToday: {
                    ...state.waterToday,
                    cupSize: action.payload
                }
            };
        default:
            return state;
    }
}