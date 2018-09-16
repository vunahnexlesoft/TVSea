import * as NAME_ACTION from '../../Constants/actionTypes';
import defaultState from "./defaultState";


export default function loginReducer(state = defaultState.user, action){
    switch(action.type){
        case NAME_ACTION.USER_LOGOUT:
            return state.set('userInfo', {});
        case NAME_ACTION.USER_LOGIN_SUCCESS:
            return state.merge({...state, userInfo: action.data, isLoading: false , isError: false});
        case NAME_ACTION.USER_LOGIN_LOADING:
            return state.setIn(['isLoading'], true);
        case NAME_ACTION.USER_LOGIN_LOADING_FAIL:
            return state.setIn(['isError'], true);
        case NAME_ACTION.UPDATE_USER_INFO:
            state = state.setIn(['userInfo', 'phoneNumber'], action.phoneNumber ||"Chưa cập nhật");
            state = state.setIn(['userInfo', 'sex'], action.sex ||"Chưa cập nhật");
            return state;
        default: return state;
    }
}