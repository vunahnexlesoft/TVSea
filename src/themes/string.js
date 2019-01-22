import Immutable from "seamless-immutable";

export const HEADER = {
    NAME: {
        TODAY:'Hôm nay',
        DISCOVER:'Khám phá',
        SEARCH:'Tìm kiếm',
        HISTORY:'Lịch sử',
        PERSIONAL: 'Cá nhân'
    },
    ROUTE_HOME: [
        {id: 1, name: 'Đang Chiếu'},
        {id: 2, name: 'Sắp Chiếu'},
    ],
    ROUTE_DISCOVER: [
        {id: 1, name: 'Phim lẻ'},
        {id: 2, name: 'Phim bộ'},
        {id: 3, name: 'TV Show'},
        {id: 4, name: 'Anime'}
    ],
    ROUTE_ACCOUNT: [
        {id: 1, name: 'Tài Khoản'},
        {id: 2, name: 'Thông Báo'},
    ],
    ROUTE_HISTORY: [
        {id: 1, name: 'Đã xem'},
        {id: 2, name: 'Đã thích'},
        {id: 3, name: 'Sẽ xem'},
    ],
    ROUTE_DETAIL: [
        {id: 1, name: 'Thông Tin'},
        {id: 2, name: 'Số Tập'},
        {id: 3, name: 'Bình Luận'},
    ],
};

export const VAR = {
    VIDEO_DEFAULT: 'https://firebasestorage.googleapis.com/v0/b/livestreaming-46229.appspot.com/o/guardians2.mp4?alt=media&token=ad0219b2-0b04-4988-9b5c-3783b24801a3',
    STEAMING_URL: 'rtmp://18.222.223.197:1935/live/streaming'//'http://127.0.0.1:5080/live/streaming.m3u8'
};

export const defaultState = {
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
    user: {
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
        recommend:{
            data:[],
            isLoading: false,
            isError: false,
        },
    },
    movies: {
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
    }
};