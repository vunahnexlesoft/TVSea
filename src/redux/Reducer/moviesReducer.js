import * as NAME_ACTION from '../../Constants/actionTypes';
import * as STRING from '../../themes/string';
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
            return state.setIn(['category', 'phimle', 'isLoading'], true);
        case NAME_ACTION.GET_MOVIES_PHIM_LE_SUCCESS:
            return state.merge({
                ...state,
                category: {...state.category, phimle: {data: action.data, isLoading: false, isError: false}}
            });
        case NAME_ACTION.GET_MOVIES_PHIM_LE_FAIL:
            return state.merge({
                ...state,
                category: {...state.category, phimle: {data: [], isLoading: false, isError: true}}
            });
        //Phim bo
        case NAME_ACTION.GET_MOVIES_PHIM_BO_FETCHING:
            return state.setIn(['category', 'phimbo', 'isLoading'], true);
        case NAME_ACTION.GET_MOVIES_PHIM_BO_SUCCESS:
            return state.merge({
                ...state,
                category: {...state.category, phimbo: {data: action.data, isLoading: false, isError: false}}
            });
        case NAME_ACTION.GET_MOVIES_PHIM_BO_FAIL:
            return state.merge({
                ...state,
                category: {...state.category, phimbo: {data: [], isLoading: false, isError: true}}
            });
        //TV Show
        case NAME_ACTION.GET_MOVIES_TV_SHOW_FETCHING:
            return state.setIn(['category', 'anime', 'isLoading'], true);
        case NAME_ACTION.GET_MOVIES_TV_SHOW_SUCCESS:
            return state.merge({
                ...state,
                category: {...state.category, anime: {data: action.data, isLoading: false, isError: true}}
            });
        case NAME_ACTION.GET_MOVIES_TV_SHOW_FAIL:
            return state.merge({
                ...state,
                category: {...state.category, anime: {data: [], isLoading: false, isError: true}}
            });
        //Top Movie in Days
        case NAME_ACTION.GET_TOP_MOVIE_FETCHING:
            return state.setIn(['top', 'isLoading'], true);
        case NAME_ACTION.GET_TOP_MOVIE_SUCCESS:
            return state.merge({...state, top: {data: action.data, isLoading: false, isError: false}});
        case NAME_ACTION.GET_TOP_MOVIE_FAIL:
            return state.merge({...state, top: {data: [], isLoading: false, isError: true}});
        //Channel
        case NAME_ACTION.GET_CHANNEL_MOVIES_FETCHING:
            return state.setIn(['channel', 'isLoading'], true);
        case NAME_ACTION.GET_CHANNEL_MOVIES_SUCCESS:
            return state.merge({...state, channel: {data: action.data, isLoading: false, isError: false}});
        case NAME_ACTION.GET_CHANNEL_MOVIES_FAIL:
            return state.merge({...state, channel: {data: [], isLoading: false, isError: true}});
        //Calender
        case NAME_ACTION.GET_CALENDER_MOVIES_FETCHING:
            return state.setIn(['calender', 'isLoading'], true);
        case NAME_ACTION.GET_CALENDER_MOVIES_SUCCESS:
            return state.merge({...state, calender: {data: action.data, isLoading: false, isError: false}});
        case NAME_ACTION.GET_CALENDER_MOVIES_FAIL:
            return state.merge({...state, calender: {data: [], isLoading: false, isError: true}});
        // //Related Movie in Days
        // case NAME_ACTION.GET_RECOMMEND_MOVIES_FETCHING:
        //     return state.setIn(['recommend', 'isLoading'], true);
        // case NAME_ACTION.GET_RECOMMEND_MOVIES_SUCCESS:
        //     return state.merge({...state, recommend: {data: action.data, isLoading: false, isError: false}});
        // case NAME_ACTION.GET_RECOMMEND_MOVIES_FAIL:
        //     return state.merge({...state, recommend: {data: [], isLoading: false, isError: true}});
        //Search Movie
        case NAME_ACTION.GET_SEARCH_MOVIES_FETCHING:
            return state.setIn(['search', 'isLoading'], true);
        case NAME_ACTION.GET_SEARCH_MOVIES_SUCCESS:
            return state.merge({
                ...state,
                search: {...state.search, data: action.data, isLoading: false, isError: false}
            });
        case NAME_ACTION.GET_SEARCH_MOVIES_FAIL:
            return state.merge({...state, search: {...state.search, data: [], isLoading: false, isError: true}});
        //COMMENT Movie
        case NAME_ACTION.GET_COMMENT_MOVIES_FETCHING:
            return state.setIn(['search', 'isLoading'], true);
        case NAME_ACTION.GET_COMMENT_MOVIES_SUCCESS:
            return state.merge({
                ...state,
                comment: {...state.comment, data: action.data, isLoading: false, isError: false}
            });
        case NAME_ACTION.GET_COMMENT_MOVIES_FAIL:
            return state.merge({...state, comment: {...state.comment, data: [], isLoading: false, isError: true}});
        //UPDATE HISTORY
        case NAME_ACTION.UPDATE_HISTORY_SEARCH_MOVIE: {
            let updateObject = [];
            if (action.data.type === 'ADD_SEARCH_HISTORY_MOVIE') {
                if (action.data.name && state.search.history.indexOf(action.data.name) <= -1) {
                    updateObject = state.search.history.concat(action.data.name);
                    return state.setIn(['search', 'history'], updateObject);
                }
            } else if (action.data.type === 'REMOVE_SEARCH_HISTORY_MOVIE') {
                let removeFromArray = [...state.search.history];
                let index = removeFromArray.indexOf(action.data.name);
                removeFromArray.splice(index, 1);
                updateObject = removeFromArray;
                return state.setIn(['search', 'history'], updateObject);
            }
            return state;
        }
        case NAME_ACTION.USER_POST_COMMENT: {
            let updateObject = [];
            let index = state.detail.data.comment.map((e) => {
                return e.id_user
            }).indexOf(action.data.data.id_user);
            if (action.data.actionType === 'ADD' && index <= -1) {
                updateObject = [...state.detail.data.comment];
                updateObject.unshift(action.data.data);
            } else {
                updateObject = [...state.detail.data.comment];
                updateObject[index] = {...updateObject[index], comment: action.data.data.comment, rate: action.data.data.rate}
            }
            if (action.data.actionType === 'REMOVE' && index > -1) {
                let removeFromArray = [...state.history.data];
                removeFromArray.splice(index, 1);
                updateObject = removeFromArray;
            }
            return state.setIn(['detail', 'data', 'comment'], updateObject);
        }
        case NAME_ACTION.RESET_STATE_MOVIES:
            return state.merge({...state, [action.data.key]: action.data.value});
        case NAME_ACTION.LOG_OUT_USER:
            return state.merge({...state, detail: {
                    data: [],
                    isLoading: false,
                    isError: false
                },
                category: {
                    phimle: {
                        data: [],
                        isLoading: false,
                        isError: false
                    },
                    phimbo: {
                        data: [],
                        isLoading: false,
                        isError: false
                    },
                    anime: {
                        data: [],
                        isLoading: false,
                        isError: false
                    }
                },
                top: {
                    data: [],
                    isLoading: false,
                    isError: false
                },
                genres:{
                    data:[],
                    isLoading: false,
                    isError: false,
                },
                recommend:{
                    data:[],
                    isLoading: false,
                    isError: false,
                },
                search:{
                    data:[],
                    history:[],
                    isLoading: false,
                    isError: false,
                },
                navigateState: [],
                channel:{
                    data:[],
                    isLoading: false,
                    isError: false,
                },
                calender:{
                    data:[],
                    isLoading: false,
                    isError: false,
                }});
        case NAME_ACTION.GET_MOVIES_DURATION_ADMIN_FETCHING:
            return state.setIn(['duration', 'isLoading'], true);
        case NAME_ACTION.GET_MOVIES_DURATION_ADMIN_SUCCESS:
            return state.merge({...state, duration: {data: action.data, isLoading: false, isError: false}});
        case NAME_ACTION.GET_MOVIES_DURATION_ADMIN_FAIL:
            return state.merge({...state, duration: {data: [], isLoading: false, isError: true}});
        default:
            return state;
    }
}