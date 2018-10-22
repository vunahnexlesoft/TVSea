import NotificationView from '../../views/HistoryView';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as moviesAction from "../../redux/ActionCreator/actionMovieCreator";
function mapStateToProps(state) {
    const {category} = state.moviesReducer;
    return {
        dataPhimle: category.phimle.data,
        dataPhimbo: category.phimbo.data,
        dataTvshow: category.tvshow.data,

        isPhimleLoading: category.phimle.isLoading,
        isPhimboLoading: category.phimbo.isLoading,
        isTvshowLoading: category.tvshow.isLoading,

        isPhimleError: category.phimle.isError,
        isPhimboError: category.phimbo.isError,
        isTvshowError: category.tvshow.isError,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        moviesAction: bindActionCreators(moviesAction, dispatch),
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(NotificationView);


