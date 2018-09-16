import * as NAME_ACTION from '../../Constants/actionTypes';
import defaultState from "./defaultState";

export default function getMovieByCategoryReducer(state = defaultState.movies.category, action) {
    switch (action.type) {
        case NAME_ACTION.GET_MOVIES_PHIM_LE_FETCHING:
            return state.setIn(['phimle', 'isLoading'], true);
        case NAME_ACTION.GET_MOVIES_PHIM_LE_SUCCESS:
            return state.merge({...state, phimle: {data: action.data, isLoading: false, isError: false}});
        case NAME_ACTION.GET_MOVIES_PHIM_LE_FAIL:
            return state.merge({...state, phimle: {data: [], isLoading: false, isError: true}});

        case NAME_ACTION.GET_MOVIES_PHIM_BO_FETCHING:
            return state.setIn(['phimbo', 'isLoading'], true);
        case NAME_ACTION.GET_MOVIES_PHIM_BO_SUCCESS:
            return state.merge({...state, phimbo: {data: action.data, isLoading: false, isError: false}});
        case NAME_ACTION.GET_MOVIES_PHIM_BO_FAIL:
            return state.merge({...state, phimbo: {data: [], isLoading: false, isError: true}});

        case NAME_ACTION.GET_MOVIES_TV_SHOW_FETCHING:
            return state.setIn(['tvshow', 'isLoading'], true);
        case NAME_ACTION.GET_MOVIES_TV_SHOW_SUCCESS:
            return state.merge({...state, tvshow: {data: action.data, isLoading: false, isError: false}});
        case NAME_ACTION.GET_MOVIES_TV_SHOW_FAIL:
            return state.merge({...state, tvshow: {data: [], isLoading: false, isError: true}});
        default:
            return state;
    }
}