import AccountView from '../../views/AccountView';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import userInfoReducer from "../../redux/Reducer/userInfoReducer";
import * as moviesAction from "../../redux/ActionCreator/actionMovieCreator";
function mapStateToProps(state) {
    const userInfo = state.userInfoReducer.data;
    return {
        userInfo
    };
}
function mapDispatchToProps(dispatch) {
  return {
      moviesAction: bindActionCreators(moviesAction, dispatch),
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(AccountView);


