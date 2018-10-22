import * as NAME_ACTION from '../../Constants/actionTypes';
import defaultState from "./defaultState";

export default function moviesReducer(state = defaultState.movies, action) {
    switch (action.type) {
        //Detail Movie
        case NAME_ACTION.GET_DETAIL_MOVIE_FETCHING:
            return state.setIn(['detail', 'isLoading'], true);
        case NAME_ACTION.GET_DETAIL_MOVIE_SUCCESS:
            return state.merge({...state, detail: {data: action.data, isLoading: false, isError: false}});
        case NAME_ACTION.GET_DETAIL_MOVIE_FAIL:
            return state.merge({...state, detail: {data: [], isLoading: false, isError: true}});
        //Genres Movie
        case NAME_ACTION.GET_ALL_GENRES_FETCHING:
            return state.setIn(['genres', 'isLoading'], true);
        case NAME_ACTION.GET_ALL_GENRES_SUCCESS:
            return state.merge({...state, genres: {data: action.data, isLoading: false, isError: false}});
        case NAME_ACTION.GET_ALL_GENRES_FAIL:
            return state.merge({...state, genres: {data: [], isLoading: false, isError: true}});
        //Category Movie
            //Phim le
        case NAME_ACTION.GET_MOVIES_PHIM_LE_FETCHING:
            return state.setIn(['category','phimle', 'isLoading'], true);
        case NAME_ACTION.GET_MOVIES_PHIM_LE_SUCCESS:
            return state.merge({...state, category: {...state.category, phimle: {data: action.data, isLoading: false, isError: false}}});
        case NAME_ACTION.GET_MOVIES_PHIM_LE_FAIL:
            return state.merge({...state, category: {...state.category, phimle: {data: [], isLoading: false, isError: true}}});
            //Phim bo
        case NAME_ACTION.GET_MOVIES_PHIM_BO_FETCHING:
            return state.setIn(['category','phimbo', 'isLoading'], true);
        case NAME_ACTION.GET_MOVIES_PHIM_BO_SUCCESS:
            return state.merge({...state, category: {...state.category, phimbo: {data: action.data, isLoading: false, isError: false}}});
        case NAME_ACTION.GET_MOVIES_PHIM_BO_FAIL:
            return state.merge({...state, category: {...state.category, phimbo: {data: [], isLoading: false, isError: true}}});
            //TV Show
        case NAME_ACTION.GET_MOVIES_TV_SHOW_FETCHING:
            return state.setIn(['category','tvshow', 'isLoading'], true);
        case NAME_ACTION.GET_MOVIES_TV_SHOW_SUCCESS:
            return state.merge({...state, category: {...state.category, tvshow: {data: [], isLoading: false, isError: true}}});
        case NAME_ACTION.GET_MOVIES_TV_SHOW_FAIL:
            return state.merge({...state, category: {...state.category, tvshow: {data: [], isLoading: false, isError: true}}});
        //Top Movie in Days
        case NAME_ACTION.GET_TOP_MOVIE_FETCHING:
            return state.setIn(['top', 'isLoading'], true);
        case NAME_ACTION.GET_TOP_MOVIE_SUCCESS:
            return state.merge({...state, top: {data: action.data, isLoading: false, isError: false}});
        case NAME_ACTION.GET_TOP_MOVIE_FAIL:
            return state.merge({...state, top: {data: [], isLoading: false, isError: true}});
        //Related Movie in Days
        case NAME_ACTION.GET_RECOMMEND_MOVIES_FETCHING:
            return state.setIn(['recommend', 'isLoading'], true);
        case NAME_ACTION.GET_RECOMMEND_MOVIES_SUCCESS:
            return state.merge({...state, recommend: {data: action.data, isLoading: false, isError: false}});
        case NAME_ACTION.GET_RECOMMEND_MOVIES_FAIL:
            return state.merge({...state, recommend: {data: [], isLoading: false, isError: true}});
        case NAME_ACTION.RESET_STATE_MOVIES:
            return state.merge({...state, [action.data.key] : action.data.value});
        default:
            return state;
    }
}