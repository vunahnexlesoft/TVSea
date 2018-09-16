import * as NAME_ACTION from '../../Constants/actionTypes';
import defaultState from "./defaultState";

export default function getTopMovieReducer(state = defaultState.movies.top, action){
    switch(action.type){
        case NAME_ACTION.GET_TOP_MOVIE_SUCCESS:
            return state.merge({...state, data: action.data, isLoading: false , isError: false});
        case NAME_ACTION.GET_TOP_MOVIE_FETCHING:
            return state.setIn(['isLoading'], true);
        case NAME_ACTION.GET_TOP_MOVIE_FAIL:
            return state.setIn(['isError'], true);
        default: return state;
    }
}