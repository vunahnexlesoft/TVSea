import * as NAME_ACTION from '../../Constants/actionTypes';
import * as URL from '../../services/url';
import axios from 'axios';


export function dataFetching() {
    return {
        type: NAME_ACTION.GET_DETAIL_MOVIE_FETCHING
    };
}

export function dataFetchingSuccess(payload) {
    return {
        type: NAME_ACTION.GET_DETAIL_MOVIE_SUCCESS,
        payload,
    }
}

export function dataFetchingFail() {
    return {
        type: NAME_ACTION.GET_DETAIL_MOVIE_FAIL,
    }
}

export function fetchingDataDetailMovieByID(id) {
    return (dispatch) => {
        var url = URL.base_url + URL.GET_DETAIL_MOVIES_BY_ID;
        dispatch(dataFetching());
        axios.get(url, {
            params: {
                id: id
            },
        }).then(data => {
            dispatch(dataFetchingSuccess(data.data))
        })
            .catch(e => dispatch(dataFetchingFail()))
    }
}