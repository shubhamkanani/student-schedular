import {
    ASSIGN_STUDENT
} from '../actionType';


const INIT_STATE = {
    assignStudent:[],
};

export default (state = INIT_STATE, action) => {

    switch (action.type) {

        case ASSIGN_STUDENT:
            return { ...state, assignStudent:action.payload};
    
        default:
            return state;
    }
}