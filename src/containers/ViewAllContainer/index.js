import ViewAll from '../../views/ViewAll';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
function mapStateToProps(state) {
    const {genres, top} = state.moviesReducer;
    const userInfo = state.userInfoReducer.data;
    return {
        dataAllGenres: genres.data,
        isAllGenresLoading: genres.isLoading,
        isAllGenresError: genres.isError,
        userInfo,
        dataTopMovie: top.data,
        isTopMovieLoading: top.isLoading,
        isTopMovieError: top.isError
    };
}
function mapDispatchToProps(dispatch) {
    return {
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(ViewAll);


