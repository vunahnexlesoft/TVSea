import Immutable from 'seamless-immutable';

export default {
    user: Immutable({
        userInfo: {},
        isLoading: false,
        isError: false,
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imh1eXZ1MTExQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMTIzNDU2IiwiaWF0IjoxNTQwMTc1NjczfQ.7nLnF2dwzgbdMK5gmiCI_2_DvqzOC7Stqf2jRaeg-eI"
    }),
    movies: Immutable({
        detail: {
            data: [],
            isLoading: false,
            isError: false
        },
        category: {
            phimle: {
                data: [],
                isLoading: false,
                isError: false
            },
            phimbo: {
                data: [],
                isLoading: false,
                isError: false
            },
            tvshow: {
                data: [],
                isLoading: false,
                isError: false
            }
        },
        top: {
            data: [],
            isLoading: false,
            isError: false
        },
        genres:{
            data:[],
            isLoading: false,
            isError: false,
        },
        recommend:{
            data:[],
            isLoading: false,
            isError: false,
        }
    })
};
