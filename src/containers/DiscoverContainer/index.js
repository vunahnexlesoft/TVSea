import DiscoverView from '../../views/DiscoverView';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as moviesAction from '../../redux/ActionCreator/actionMovieCreator';
import * as usersAction from "../../redux/ActionCreator/actionLoginCreators";

function mapStateToProps(state) {
    const {genres, top, category} = state.moviesReducer;
    const {recommend} = state.userLoginReducer;
    const userInfo = state.userInfoReducer.data;
    return {
        dataAllGenres: genres.data,
        isAllGenresLoading: genres.isLoading,
        isAllGenresError: genres.isError,
        userInfo,
        dataTopMovie: top.data,
        isTopMovieLoading: top.isLoading,
        isTopMovieError: top.isError,
        recommendData : recommend.data,
        dataPhimle: category.phimle.data,
        dataPhimbo: category.phimbo.data,
        dataAnime: category.anime.data,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        moviesAction: bindActionCreators(moviesAction, dispatch),
        usersAction: bindActionCreators(usersAction, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverView);


