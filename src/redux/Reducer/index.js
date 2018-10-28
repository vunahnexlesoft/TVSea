import { combineReducers } from 'redux';
import userLoginReducer from './userLoginReducer';
import moviesReducer from './moviesReducer';
import userInfoReducer from './userInfoReducer';
const rootReducer = combineReducers ({
    userLoginReducer,
    moviesReducer,
    userInfoReducer
});
export default rootReducer
