import * as NAME_ACTION from '../../Constants/actionTypes';
import * as STRING from '../../themes/string';
import defaultState from "./defaultState";

export default function moviesReducer(state = defaultState.admin, action) {
    switch (action.type) {
        //Phim le
        case NAME_ACTION.GET_MOVIES_PHIM_LE_ADMIN_FETCHING:
            return state.setIn(['category', 'phimle', 'isLoading'], true);
        case NAME_ACTION.GET_MOVIES_PHIM_LE_ADMIN_SUCCESS:
            return state.merge({
                ...state,
                category: {...state.category, phimle: {data: action.data, isLoading: false, isError: false}}
            });
        case NAME_ACTION.GET_MOVIES_PHIM_LE_ADMIN_FAIL:
            return state.merge({
                ...state,
                category: {...state.category, phimle: {data: [], isLoading: false, isError: true}}
            });
        //UPDATE HISTORY
        case NAME_ACTION.UPDATE_HISTORY_STREAMING_MOVIE: {
            let updateObject = [];
            let index = state.storeStreaming.map((e) => {
                return e.id
            }).indexOf(action.data.data.id);
            if (action.data.actionType === 'ADD' && index <= -1) {
                updateObject = [...state.storeStreaming];
                updateObject.push(action.data.data);
            }else if (action.data.actionType === 'REMOVE' && index > -1) {
                let removeFromArray = [...state.storeStreaming];
                removeFromArray.splice(index, 1);
                updateObject = removeFromArray;
            }
            return state.setIn(['storeStreaming'], updateObject);
        }
        default:
            return state;
    }
}