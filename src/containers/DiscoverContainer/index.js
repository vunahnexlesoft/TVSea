import DiscoverView from '../../views/DiscoverView';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actionGetTopMovieByCategory from '../../redux/ActionCreator/actionGetTopMovieByCategory';
function mapStateToProps(state) {
    return {
        data: state.getTopMovie.data,
        isLoading: state.getTopMovie.isLoading,
        isError: state.getTopMovie.isError,
    };
}
function mapDispatchToProps(dispatch) {
  return {
      getTopMovie: bindActionCreators(actionGetTopMovieByCategory, dispatch),
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(DiscoverView);


