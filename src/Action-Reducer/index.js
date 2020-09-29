import {combineReducers} from 'redux'
import Student from './Student/reducer'

const reducers = combineReducers({
    Student:Student,
});

export default reducers;