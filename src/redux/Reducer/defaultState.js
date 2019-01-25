import Immutable from 'seamless-immutable';

export default {
    userInfo: {
        data: {
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
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imh1eXZ1MTExQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMTIzNDU2IiwiaWF0IjoxNTQwMTc1NjczfQ.7nLnF2dwzgbdMK5gmiCI_2_DvqzOC7Stqf2jRaeg-eI",
    },
    user: Immutable({
        history: {
            data: [],
            isLoading: false,
            isError: false
        },
        like:{
            data: [],
            isLoading: false,
            isError: false
        },
        watchlist:{
            data: [],
            isLoading: false,
            isError: false
        },
        recommend:{
            data:[],
            isLoading: false,
            isError: false,
        },
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
            anime: {
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
        },
        search:{
            data:[],
            history:[],
            isLoading: false,
            isError: false,
        },
        navigateState: [],
        channel:{
            data:[],
            isLoading: false,
            isError: false,
        },
        calender:{
            data:[],
            isLoading: false,
            isError: false,
        }
    }),
    admin: Immutable({
        category: {
            phimle: {
                data: [],
                isLoading: false,
                isError: false
            },
        },
        storeStreaming: []
    })
};
