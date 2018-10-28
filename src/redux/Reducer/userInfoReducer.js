import * as NAME_ACTION from '../../Constants/actionTypes';
import defaultState from "./defaultState";


export default function userInfoReducer(state = defaultState.userInfo, action) {
    switch (action.type) {
        case NAME_ACTION.USER_LOGOUT:
            return {...state, data: {}};
        case NAME_ACTION.USER_LOGIN_SUCCESS:
            return {...state, data: action.userInfo, isLoading: false};
        case NAME_ACTION.USER_LOGIN_LOADING:
            return {...state, isLoading: true};
        case NAME_ACTION.UPDATE_USER_INFO:
            return {...state, data: {...state.data, phoneNumber: action.phoneNumber || "Chưa cập nhật", sex: action.sex || "Chưa cập nhật"}};
        default:return state;
    }
}