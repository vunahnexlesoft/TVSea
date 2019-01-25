import { combineReducers } from 'redux';
import userLoginReducer from './userLoginReducer';
import moviesReducer from './moviesReducer';
import userInfoReducer from './userInfoReducer';
import adminReducer from './adminReducer';
const rootReducer = combineReducers ({
    userLoginReducer,
    moviesReducer,
    userInfoReducer,
    adminReducer
});
export default rootReducer
