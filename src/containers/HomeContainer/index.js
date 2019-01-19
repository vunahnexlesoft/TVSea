import HomeView from '../../views/HomeView';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as moviesAction from "../../redux/ActionCreator/actionMovieCreator";
import moviesReducer from "../../redux/Reducer/moviesReducer";
function mapStateToProps(state) {
    const{category,calender, channel} = state.moviesReducer;
    const userInfo = state.userInfoReducer.data;
    return {
        dataPhimle: category.phimle.data,
        dataPhimbo: category.phimbo.data,
        dataTvshow: category.anime.data,

        isPhimleLoading: category.phimle.isLoading,
        isPhimboLoading: category.phimbo.isLoading,
        isTvshowLoading: category.anime.isLoading,

        isPhimleError: category.phimle.isError,
        isPhimboError: category.phimbo.isError,
        isTvshowError: category.anime.isError,

        dataChannel : channel.data,
        dataCalender : calender.data,
        userInfo
    };
}
function mapDispatchToProps(dispatch) {
  return {
      moviesAction: bindActionCreators(moviesAction, dispatch),
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(HomeView);


