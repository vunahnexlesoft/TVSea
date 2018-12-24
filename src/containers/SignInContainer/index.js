import SignInView from '../../views/SignInView';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as moviesAction from "../../redux/ActionCreator/actionMovieCreator";
import * as usersAction from "../../redux/ActionCreator/actionLoginCreators";
import * as userInfoAction from "../../redux/ActionCreator/actionUserInfoCreator";

function mapStateToProps(state) {
    const {data, isLoading, isError} = state.userInfoReducer;
    return {
        userInfo: data,
        isLoading,
        isError,
    };
}
function mapDispatchToProps(dispatch) {
  return {
      moviesAction: bindActionCreators(moviesAction, dispatch),
      usersAction: bindActionCreators(usersAction, dispatch),
      userInfoAction: bindActionCreators(userInfoAction, dispatch),
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(SignInView);


