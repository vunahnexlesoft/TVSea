import * as NAME_ACTION from '../../Constants/actionTypes';
import * as URL from '../../services/url';
import axios from 'axios';
import * as restClient from "../../services/restClient";
import configureStore from '../Store/configStore'
const {persistor, store} = configureStore();

export function dataFetchingCategory(category) {
    switch(category){
        case 'Phim lẻ':
            return {
                type: NAME_ACTION.GET_MOVIES_PHIM_LE_FETCHING
            };
        case 'Phim bộ':
            return {
                type: NAME_ACTION.GET_MOVIES_PHIM_BO_FETCHING
            };
        case 'TV Show':
            return {
                type: NAME_ACTION.GET_MOVIES_TV_SHOW_FETCHING
            };
        default: return null;
    }
}
export function dataFetchingCategorySuccess(data, category) {
    switch(category){
        case 'Phim lẻ':
            return {
                type: NAME_ACTION.GET_MOVIES_PHIM_LE_SUCCESS,
                data
            };
        case 'Phim bộ':
            return {
                type: NAME_ACTION.GET_MOVIES_PHIM_BO_SUCCESS,
                data
            };
        case 'TV Show':
            return {
                type: NAME_ACTION.GET_MOVIES_TV_SHOW_SUCCESS,
                data
            };
        default: return null;
    }
}
export function dataFetchingCategoryFail(category) {
    switch(category){
        case 'Phim lẻ':
            return {
                type: NAME_ACTION.GET_MOVIES_PHIM_LE_FAIL,
            };
        case 'Phim bộ':
            return {
                type: NAME_ACTION.GET_MOVIES_PHIM_BO_FAIL,
            };
        case 'TV Show':
            return {
                type: NAME_ACTION.GET_MOVIES_TV_SHOW_FAIL,
            };
        default: return null;
    }
}
export function dataFetchingTop() {
    return {
        type: NAME_ACTION.GET_TOP_MOVIE_FETCHING
    };
}

export function dataFetchingTopSuccess(data) {
    return {
        type: NAME_ACTION.GET_TOP_MOVIE_SUCCESS,
        data,
    }
}

export function dataFetchingTopFail() {
    return {
        type: NAME_ACTION.GET_TOP_MOVIE_FAIL,
    }
}

export function dataFetchingAllGenres() {
    return {
        type: NAME_ACTION.GET_ALL_GENRES_FETCHING
    };
}

export function dataFetchingAllGenresSuccess(data) {
    return {
        type: NAME_ACTION.GET_ALL_GENRES_SUCCESS,
        data
    }
}

export function dataFetchingAllGenresFail() {
    return {
        type: NAME_ACTION.GET_ALL_GENRES_FAIL,
    }
}

export function dataFetchingDetailMovie() {
    return {
        type: NAME_ACTION.GET_DETAIL_MOVIE_FETCHING
    };
}

export function dataFetchingDetailMovieSuccess(data) {
    return {
        type: NAME_ACTION.GET_DETAIL_MOVIE_SUCCESS,
        data,
    }
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

export function resetStateDataMovies(data) {
    return {
        type: NAME_ACTION.RESET_STATE_MOVIES,
        data
    }
}
export function getDataMoviebyCategory(params) {
    return (dispatch) => {
        let url = URL.base_url + URL.GET_MOVIES_BY_CATEGORY;
        let token = store.getState().userLoginReducer.token;
        dispatch(dataFetchingCategory(params.category));
        restClient.excuteAPI("get",url,token,params).then(res =>{
            if(res.success){
                dispatch(dataFetchingCategorySuccess(res.data, params.category))
            }else{
                dispatch(dataFetchingCategoryFail(params.category));
            }
        });
    }
}

export function getDataTopMovie(params) {
    return (dispatch) => {
        let url = URL.base_url + URL.GET_TOP_MOVIES_BY_CATEGORY;
        let token = store.getState().userLoginReducer.token;
        dispatch(dataFetchingTop());
        restClient.excuteAPI("get",url,token,params).then(res =>{
            if(res.success){
                dispatch(dataFetchingTopSuccess(res.data))
            }else{
                dispatch(dataFetchingTopFail());
            }
        });
    }
}

export function getAllDataGenres(params) {
    return (dispatch) => {
        var url = URL.base_url + URL.GET_ALL_GENRES;
        let token = store.getState().userLoginReducer.token;
        dispatch(dataFetchingAllGenres());
        restClient.excuteAPI("get",url,token,params).then(res =>{
            if(res.success){
                dispatch(dataFetchingAllGenresSuccess(res.data));
            }else{
                dispatch(dataFetchingAllGenresFail());
            }
        })
    }
}

export function getDataDetailMovieByID(params) {
    return (dispatch) => {
        var url = URL.base_url + URL.GET_DETAIL_MOVIES_BY_ID;
        let token = store.getState().userLoginReducer.token;
        dispatch(dataFetchingDetailMovie());
        restClient.excuteAPI("get",url,token,params).then(res =>{
            if(res.success){
                dispatch(dataFetchingDetailMovieSuccess(res.data));
            }else{
                dispatch(dataFetchingDetailMovieFail());
            }
        })
    }
}

export function getDataRelatedMovie(params) {
    return (dispatch) => {
        var url = URL.base_url + URL.GET_RECOMMEND_MOVIES;
        let token = store.getState().userLoginReducer.token;
        dispatch(dataFetchingRelatedMovie());
        restClient.excuteAPI("get",url,token,params).then(res =>{
            if(res.success){
                dispatch(dataFetchingRelatedMovieSuccess(res.data));
            }else{
                dispatch(dataFetchingRelatedMovieFail());
            }
        })
    }
}

export function getDataSearchMovie(params) {
    return (dispatch) => {
        var url = URL.base_url + URL.GET_SERACH_MOVIES;
        let token = store.getState().userLoginReducer.token;
        dispatch(dataFetchingSearchMovie());
        restClient.excuteAPI("get",url,token,params).then(res =>{
            console.log(res,params);
            if(res.success){
                dispatch(dataFetchingSearchMovieSuccess(res.data));
            }else{
                dispatch(dataFetchingSearchMovieFail());
            }
        })
    }
}