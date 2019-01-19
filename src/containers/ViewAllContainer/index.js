import ViewAll from '../../views/ViewAll';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as moviesAction from "../../redux/ActionCreator/actionMovieCreator";
import * as usersAction from "../../redux/ActionCreator/actionLoginCreators";
function mapStateToProps(state) {
    const {genres, top,category} = state.moviesReducer;
    const {recommend} = state.userLoginReducer;
    const userInfo = state.userInfoReducer.data;
    return {
        isAllGenresLoading: genres.isLoading,
        isAllGenresError: genres.isError,
        userInfo,
        token: state.userInfoReducer.token,
        dataTopMovie: top.data,
        isTopMovieLoading: top.isLoading,
        isTopMovieError: top.isError,

        recommendData : recommend.data,
        dataPhimle: category.phimle.data,
        dataPhimbo: category.phimbo.data,
        dataAnime: category.anime.data,
        dataAllGenres: genres.data,

    };
}
function mapDispatchToProps(dispatch) {
    return {
            moviesAction: bindActionCreators(moviesAction, dispatch),
            usersAction: bindActionCreators(usersAction, dispatch),
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(ViewAll);


