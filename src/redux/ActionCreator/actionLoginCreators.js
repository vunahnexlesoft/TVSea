import * as NAME_ACTION from '../../Constants/actionTypes';

export function userLoading() {
    return {
        type: NAME_ACTION.USER_LOGOUT
    }
}
export function userLoadingSuccess(inforUser) {
    return {
        type: NAME_ACTION.USER_LOADING_SUCCESS,
        inforUser
    }
}
export function userLoadingFail() {
    return {
        type: NAME_ACTION.USER_LOADING_FAIL
    }
}