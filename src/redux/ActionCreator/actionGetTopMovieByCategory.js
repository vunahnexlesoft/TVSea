import * as NAME_ACTION from '../../Constants/actionTypes';
import * as URL from '../../services/url';
import axios from 'axios';


export function dataFetching() {
    return {
        type: NAME_ACTION.GET_TOP_MOVIE_FETCHING
    };
}

export function dataFetchingSuccess(data) {
    return {
        type: NAME_ACTION.GET_TOP_MOVIE_SUCCESS,
        data,
    }
}

export function dataFetchingFail() {
    return {
        type: NAME_ACTION.GET_TOP_MOVIE_FAIL,
    }
}

export function fetchingDataTopMovieByCategory(category) {
    return (dispatch) => {
        let url = URL.base_url + URL.GET_TOP_MOVIES_BY_CATEGORY;
        dispatch(dataFetching());
        axios.get(url, {
            params: {
                category: category
            },
        }).then(data => {
            dispatch(dataFetchingSuccess(data.data))
        }).catch(e => dispatch(dataFetchingFail()))
    }
}