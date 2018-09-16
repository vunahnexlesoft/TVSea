import * as NAME_ACTION from '../../Constants/actionTypes';
import * as URL from '../../services/url';
import axios from 'axios';


export function dataFetching(category) {
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
export function dataFetchingSuccess(data, category) {
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
export function dataFetchingFail(category) {
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

export function fetchingDataMoviebyCategory(page, category) {
    return (dispatch) => {
        let url = URL.base_url + URL.GET_MOVIES_BY_CATEGORY;
        dispatch(dataFetching(category));
        axios.get(url, {
            params: {
              page: page,
              category: category
            },
        }).then(data => {
            console.log(data);
            dispatch(dataFetchingSuccess(data.data,category))
        })
        .catch(e => dispatch(dataFetchingFail(category)))
    }
}