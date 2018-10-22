import MoviesDetailView from '../../views/MoviesDetailView';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as moviesAction from "../../redux/ActionCreator/actionMovieCreator";
function mapStateToProps(state) {
    const {detail,recommend} = state.moviesReducer;
    return {
        dataDetail: detail.data,
        isDetailLoading: detail.isLoading,
        isDetailError: detail.isError,
        dataRecommend: recommend.data,
        isRecommendLoading: recommend.isLoading,
        isRecommendError: recommend.isError,
        moviesReducer: state.moviesReducer
    };
}
function mapDispatchToProps(dispatch) {
    return {
        moviesAction: bindActionCreators(moviesAction, dispatch),
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(MoviesDetailView);


