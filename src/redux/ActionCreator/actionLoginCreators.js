import * as NAME_ACTION from '../../Constants/actionTypes';
import * as URL from "../../services/url";
import * as restClient from "../../services/restClient";
import configureStore from '../Store/configStore'

const {persistor, store} = configureStore();

export function dataFetchingHistory() {
    return {
        type: NAME_ACTION.USER_GET_HISTORY_LOADING
    };
}

export function dataFetchingHistorySuccess(data) {
    return {
        type: NAME_ACTION.USER_GET_HISTORY_SUCCESS,
        data,
    }
}

export function dataFetchingHistoryFail() {
    return {
        type: NAME_ACTION.USER_GET_HISTORY_LOADING_FAIL,
    }
}

export function dataFetchingLike() {
    return {
        type: NAME_ACTION.USER_GET_LIKE_LOADING
    };
}

export function dataFetchingLikeSuccess(data) {
    return {
        type: NAME_ACTION.USER_GET_LIKE_SUCCESS,
        data,
    }
}

export function dataFetchingLikeFail() {
    return {
        type: NAME_ACTION.USER_GET_LIKE_LOADING_FAIL,
    }
}

export function addOrDeleteUserPropertyMoviesSuccess(data) {
    return {
        type: NAME_ACTION.USER_ADD_OR_DELETE_PROPERTY_MOVIES,
        data,
    }
}

export function getDataUserHistoryMovie(params) {
    return (dispatch) => {
        let generateParams = {...params, key: 1};
        console.log(generateParams);
        let url = URL.base_url + URL.GET_USER_HISTORY_MOVIES;
        let token = store.getState().userLoginReducer.token;
        dispatch(dataFetchingHistory());
        restClient.excuteAPI("get", url, token, generateParams).then(res => {
            if (res.success) {
                dispatch(dataFetchingHistorySuccess(res.data))
            } else {
                dispatch(dataFetchingHistoryFail());
            }
        });
    }
}

export function getDataUserLikeMovie(params) {
    return (dispatch) => {
        let generateParams = {...params, key: 2};
        let url = URL.base_url + URL.GET_USER_LIKE_MOVIES;
        let token = store.getState().userLoginReducer.token;
        dispatch(dataFetchingLike());
        restClient.excuteAPI("get", url, token, generateParams).then(res => {
            if (res.success) {
                dispatch(dataFetchingLikeSuccess(res.data))
            } else {
                dispatch(dataFetchingLikeFail());
            }
        });
    }
}

export function addUserHistoryMovies(data) {
    return (dispatch) => {
        let url = URL.base_url + (data.actionType === 'ADD' ? URL.POST_USER_LIKE_OR_HISTORY_MOVIES : URL.PUT_REMOVE_USER_LIKE_OR_HISTORY_MOVIES);
        let method = data.actionType === 'ADD' ? "post" : "put";
        let token = store.getState().userLoginReducer.token;
        restClient.excuteAPI(method, url, token, null, data.params).then(res => {
            console.log('res', res);
            if (res.success) {
                dispatch(addOrDeleteUserPropertyMoviesSuccess(data))
            } else {
                console.log('Add data fail')
            }
        });
    }

}