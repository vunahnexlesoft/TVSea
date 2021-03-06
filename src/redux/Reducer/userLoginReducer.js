import * as NAME_ACTION from '../../Constants/actionTypes';
import defaultState from "./defaultState";
import * as STRING from "../../themes/string";


export default function loginReducer(state = defaultState.user, action) {
    switch (action.type) {
        case NAME_ACTION.USER_GET_HISTORY_LOADING:
            return state.setIn(['history', 'isLoading'], true);
        case NAME_ACTION.USER_GET_HISTORY_SUCCESS:
            return state.merge({...state, history: {data: action.data, isLoading: false, isError: false}});
        case NAME_ACTION.USER_GET_HISTORY_LOADING_FAIL:
            return state.merge({...state, history: {data: [], isLoading: false, isError: true}});
        case NAME_ACTION.USER_GET_LIKE_LOADING:
            return state.setIn(['like', 'isLoading'], true);
        case NAME_ACTION.USER_GET_LIKE_SUCCESS:
            return state.merge({...state, like: {data: action.data, isLoading: false, isError: false}});
        case NAME_ACTION.USER_GET_LIKE_LOADING_FAIL:
            return state.merge({...state, like: {data: [], isLoading: false, isError: true}});
        case NAME_ACTION.USER_GET_WATCH_LIST_LOADING:
            return state.setIn(['watchlist', 'isLoading'], true);
        case NAME_ACTION.USER_GET_WATCH_LIST_SUCCESS:
            return state.merge({...state, watchlist: {data: action.data, isLoading: false, isError: false}});
        case NAME_ACTION.USER_GET_WATCH_LIST_LOADING_FAIL:
            return state.merge({...state, watchlist: {data: [], isLoading: false, isError: true}});
        case NAME_ACTION.USER_ADD_OR_DELETE_PROPERTY_MOVIES:
            let updateObject = [];
            let date_save = new Date();
            if (action.data.type === "HISTORY") {
                if (action.data.actionType === 'ADD' && state.history.data.map((e) => {return e.id}).indexOf(action.data.movie.id) <= -1) {
                    updateObject = [...state.history.data];
                    let dataInsert = {...action.data.movie, date_save};
                    updateObject.unshift(dataInsert);
                } else if(action.data.actionType === 'REMOVE' && state.history.data.map((e) => {return e.id}).indexOf(action.data.movie.id) > -1) {
                    let removeFromArray = [...state.history.data];
                    let index = removeFromArray.map((e) => {
                        return e.id
                    }).indexOf(action.data.movie.id);
                    removeFromArray.splice(index, 1);
                    updateObject = removeFromArray;
                }else {
                    updateObject = [...state.history.data];
                }
                return state.setIn(['history', 'data'], updateObject);
            } else if(action.data.type === "LIKE") {
                if (action.data.actionType === 'ADD' && state.like.data.map((e) => {return e.id}).indexOf(action.data.movie.id) <= -1) {
                    updateObject = [...state.like.data];
                    let dataInsert = {...action.data.movie, date_save};
                    updateObject.unshift(dataInsert);
                } else if(action.data.actionType === 'REMOVE' && state.like.data.map((e) => {return e.id}).indexOf(action.data.movie.id) > -1) {
                    let removeFromArray = [...state.like.data];
                    let index = removeFromArray.map((e) => {
                        return e.id
                    }).indexOf(action.data.movie.id);
                    removeFromArray.splice(index, 1);
                    updateObject = removeFromArray;
                }else {
                    updateObject = [...state.like.data];
                }
                return state.setIn(['like', 'data'], updateObject);
            }else {
                if (action.data.actionType === 'ADD' && state.watchlist.data.map((e) => {return e.id}).indexOf(action.data.movie.id) <= -1) {
                    updateObject = [...state.watchlist.data];
                    let dataInsert = {...action.data.movie, date_save};
                    updateObject.unshift(dataInsert);
                } else if(action.data.actionType === 'REMOVE' && state.watchlist.data.map((e) => {return e.id}).indexOf(action.data.movie.id) > -1) {
                    let removeFromArray = [...state.watchlist.data];
                    let index = removeFromArray.map((e) => {
                        return e.id
                    }).indexOf(action.data.movie.id);
                    removeFromArray.splice(index, 1);
                    updateObject = removeFromArray;
                }else {
                    updateObject = [...state.watchlist.data];
                }
                return state.setIn(['watchlist', 'data'], updateObject);
            }
        //Related Movie in Days
        case NAME_ACTION.GET_RECOMMEND_MOVIES_FETCHING:
            return state.setIn(['recommend', 'isLoading'], true);
        case NAME_ACTION.GET_RECOMMEND_MOVIES_SUCCESS:
            return state.merge({...state, recommend: {data: action.data, isLoading: false, isError: false}});
        case NAME_ACTION.GET_RECOMMEND_MOVIES_FAIL:
            return state.merge({...state, recommend: {data: [], isLoading: false, isError: true}});
        case NAME_ACTION.LOG_OUT_USER:
            return state.merge({...state, history: {
                    data: [],
                    isLoading: false,
                    isError: false
                },
                like:{
                    data: [],
                    isLoading: false,
                    isError: false
                },
                recommend:{
                    data:[],
                    isLoading: false,
                    isError: false,
                }});
        default:
            return state;
    }
}