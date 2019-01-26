import * as NAME_ACTION from '../../Constants/actionTypes';
import * as URL from '../../services/url';
import axios from 'axios';
import * as restClient from "../../services/restClient";
import configureStore from '../Store/configStore'
import {addOrDeleteUserPropertyMoviesSuccess} from "./actionLoginCreators";
import userInfoReducer from "../Reducer/userInfoReducer";
const {persistor, store} = configureStore();

export function dataFetchingCategory() {
    return {
        type: NAME_ACTION.GET_MOVIES_PHIM_LE_ADMIN_FETCHING
    };
}
export function dataFetchingCategorySuccess(data) {
    return {
        type: NAME_ACTION.GET_MOVIES_PHIM_LE_ADMIN_SUCCESS,
        data
    };
}
export function dataFetchingCategoryFail() {
    return {
        type: NAME_ACTION.GET_MOVIES_PHIM_LE_ADMIN_FAIL,
    };
}


export function dataFetchingDetailMovieFail() {
    return {
        type: NAME_ACTION.GET_DETAIL_MOVIE_FAIL,
    }
}

export function dataFetchingRelatedMovie() {
    return {
        type: NAME_ACTION.GET_RECOMMEND_MOVIES_FETCHING
    };
}

export function dataFetchingRelatedMovieSuccess(data) {
    return {
        type: NAME_ACTION.GET_RECOMMEND_MOVIES_SUCCESS,
        data,
    }
}

export function dataFetchingRelatedMovieFail() {
    return {
        type: NAME_ACTION.GET_RECOMMEND_MOVIES_FAIL,
    }
}

export function dataFetchingSearchMovie() {
    return {
        type: NAME_ACTION.GET_SEARCH_MOVIES_FETCHING
    };
}

export function dataFetchingSearchMovieSuccess(data) {
    return {
        type: NAME_ACTION.GET_SEARCH_MOVIES_SUCCESS,
        data,
    }
}

export function dataFetchingSearchMovieFail() {
    return {
        type: NAME_ACTION.GET_SEARCH_MOVIES_FAIL,
    }
}

export function updateSearchHistory(data) {
    return {
        type: NAME_ACTION.UPDATE_HISTORY_SEARCH_MOVIE,
        data
    }
}

export function updateHistory(data) {
    return {
        type: NAME_ACTION.UPDATE_HISTORY_STREAMING_MOVIE,
        data
    }
}
export function updateStateStreaming(data) {
    return {
        type: NAME_ACTION.UPDATE_STATE_STREAMING_MOVIE,
        data
    }
}


export function getDataMoviebyCategory(params) {
    return (dispatch) => {
        let url = URL.base_url + URL.GET_MOVIES_BY_CATEGORY;
        let token = store.getState().userInfoReducer.token;
        dispatch(dataFetchingCategory(params.category));
        restClient.excuteAPI("get",url,token, params).then(res =>{
            console.log(res);
            if(res.success){
                dispatch(dataFetchingCategorySuccess(res.data, params.category))
            }else{
                dispatch(dataFetchingCategoryFail(params.category));
            }
        });
    }
}
