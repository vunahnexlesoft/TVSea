import * as NAME_ACTION from '../../Constants/actionTypes';
import * as URL from "../../services/url";
import * as restClient from "../../services/restClient";
import configureStore from '../Store/configStore'

const {persistor, store} = configureStore();

export function dataFetchingRegister() {
    return {
        type: NAME_ACTION.USER_REGISTER_LOADING
    };
}

export function dataFetchingRegisterSuccess(data) {
    return {
        type: NAME_ACTION.USER_REGISTER_SUCCESS,
    }
}

export function dataFetchingRegisterFail() {
    return {
        type: NAME_ACTION.USER_REGISTER_LOADING_FAIL,
    }
}

export function dataFetchingLogin() {
    return {
        type: NAME_ACTION.USER_LOGIN_LOADING
    };
}

export function dataFetchingLoginSuccess(data) {
    return {
        type: NAME_ACTION.USER_LOGIN_SUCCESS,
        data,
    }
}

export function dataFetchingLoginFail() {
    return {
        type: NAME_ACTION.USER_LOGIN_LOADING_FAIL,
    }
}

export function addOrDeleteUserPropertyMoviesSuccess(data) {
    return {
        type: NAME_ACTION.USER_ADD_OR_DELETE_PROPERTY_MOVIES,
        data,
    }
}

export function postDataRegister(data) {
    return (dispatch) => {
        let url = URL.base_url + URL.POST_USER_CREATE_ACCOUNT;
        dispatch(dataFetchingRegister());
        return restClient.excuteAPI("post", url, null, null, data).then(res => {
            if (res.success) {
                dispatch(dataFetchingRegisterSuccess());
            } else {
                dispatch(dataFetchingRegisterFail());
            }
            return res;
        });
    }
}

export function postDataLogin(data) {
    return (dispatch) => {
        let url = URL.base_url + URL.POST_USER_LOGIN;
        dispatch(dataFetchingLogin());
        return restClient.excuteAPI("post", url, null, null, data).then(res => {
            if (res.success) {
                dispatch(dataFetchingLoginSuccess(res))
            } else {
                dispatch(dataFetchingLoginFail());
            }
            return res;
        });
    }
}