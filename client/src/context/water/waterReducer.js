import { 
    DRINK_WATER,
    SET_TODAY,
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
            }
        default:
            return state;
    }
}