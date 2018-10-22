import axios from 'axios';

export function excuteAPI(method, url, token, params) {
    return axios({
        method,
        url,
        params,
        headers: {'Authorization': 'Bearer '.concat(token)},
    }).then(res => {return res.data})
        .catch(e =>{return {success: false, data: []}})
}