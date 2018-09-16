import Immutable from 'seamless-immutable';

export default {
    user: Immutable({
        userInfo: {},
        isLoading: false,
        isError: false
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
        }
    })
};
