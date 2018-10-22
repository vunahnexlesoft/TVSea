import DiscoverView from '../../views/DiscoverView';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as moviesAction from '../../redux/ActionCreator/actionMovieCreator';

function mapStateToProps(state) {
    const {genres, top} = state.moviesReducer;
    return {
        dataAllGenres: genres.data,
        isAllGenresLoading: genres.isLoading,
        isAllGenresError: genres.isError,

        dataTopMovie: top.data,
        isTopMovieLoading: top.isLoading,
        isTopMovieError: top.isError
    };
}

function mapDispatchToProps(dispatch) {
    return {
        moviesAction: bindActionCreators(moviesAction, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverView);


