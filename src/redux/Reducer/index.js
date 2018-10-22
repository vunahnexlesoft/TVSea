import { combineReducers } from 'redux';
import userLoginReducer from './userLoginReducer';
import moviesReducer from './moviesReducer';
const rootReducer = combineReducers ({
    userLoginReducer,
    moviesReducer
});
export default rootReducer
