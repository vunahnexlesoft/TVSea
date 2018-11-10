import MoviesDetailView from '../../views/MoviesDetailView';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as moviesAction from "../../redux/ActionCreator/actionMovieCreator";
import * as usersAction from "../../redux/ActionCreator/actionLoginCreators";
function mapStateToProps(state) {
    const {detail,recommend,navigateState} = state.moviesReducer;
    const {like} = state.userLoginReducer;
    const userInfo = state.userInfoReducer.data;
    return {
        navigateState,
        dataDetail: detail.data,
        isDetailLoading: detail.isLoading,
        isDetailError: detail.isError,
        dataRecommend: recommend.data,
        isRecommendLoading: recommend.isLoading,
        isRecommendError: recommend.isError,
        moviesReducer: state.moviesReducer,
        dataLike: like.data,
        userInfo
    };
}
function mapDispatchToProps(dispatch) {
    return {
        moviesAction: bindActionCreators(moviesAction, dispatch),
        usersAction: bindActionCreators(usersAction, dispatch),
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(MoviesDetailView);


