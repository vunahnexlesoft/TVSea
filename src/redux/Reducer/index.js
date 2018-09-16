import { combineReducers } from 'redux';
import userLoginReducer from './userLoginReducer';
import getMovieByCategory from './getMovieByCategoryReducer';
import getDetailMovie from './getDetailMovieReducer';
import getTopMovie from './getTopMovieReducer';
const rootReducer = combineReducers ({
    userLoginReducer,
    getMovieByCategory,
    getDetailMovie,
    getTopMovie,
});
export default rootReducer
