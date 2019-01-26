import axios from 'axios';

export function excuteAPI(method, url, token, params,data) {
    return axios({
        method,
        url,
        params,
        data,
        headers: {'Authorization': 'Bearer '.concat(token)},
    }).then(res => {return res.data})
        .catch(e =>{return {success: false, data: [], message: e}})
}