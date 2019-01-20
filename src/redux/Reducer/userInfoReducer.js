import * as NAME_ACTION from '../../Constants/actionTypes';
import defaultState from "./defaultState";
import * as STRING from "../../themes/string";


export default function userInfoReducer(state = defaultState.userInfo, action) {
    switch (action.type) {

        case NAME_ACTION.USER_LOGOUT:
            return {...state, data: {}};

        case NAME_ACTION.USER_LOGIN_SUCCESS:
            return {...state, data: action.data.result, token: action.data.token, isLoading: false};

        case NAME_ACTION.USER_LOGIN_LOADING:
            return {...state, isLoading: true};

        case NAME_ACTION.USER_LOGIN_LOADING_FAIL:
            return {...state, isLoading: false, isError: true};

        case NAME_ACTION.USER_REGISTER_LOADING:
            return {...state, isLoading: true};

        case NAME_ACTION.USER_REGISTER_SUCCESS:
            return {...state, isLoading: false};

        case NAME_ACTION.USER_REGISTER_LOADING_FAIL:
            return {...state, isLoading: false, isError: true};

        case NAME_ACTION.UPDATE_USER_INFO:
            return {
                ...state,
                data: {
                    ...state.data,
                    phoneNumber: action.phoneNumber || "Chưa cập nhật",
                    sex: action.sex || "Chưa cập nhật"
                }
            };
        case NAME_ACTION.LOG_OUT_USER:
            return {...state, data: {
                    id: 1,
                    display_name: 'Huy Vũ',
                    number_phone: '0396075444',
                    sex: 'Nam',
                    email: 'huyvu0505@gmail.com',
                    id_type_user: 4,
                    url_avatar: 'https://scontent.fsgn5-2.fna.fbcdn.net/v/t31.0-8/28947677_2062594664016900_292927065248317668_o.jpg?_nc_cat=107&_nc_ht=scontent.fsgn5-2.fna&oh=1d158bcb754d87391ae93a8a0e600dea&oe=5C5B5F2F',
                },
                isLoading: false,
                isError: false,
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imh1eXZ1MTExQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMTIzNDU2IiwiaWF0IjoxNTQwMTc1NjczfQ.7nLnF2dwzgbdMK5gmiCI_2_DvqzOC7Stqf2jRaeg-eI"};
        default:
            return state;
    }
}