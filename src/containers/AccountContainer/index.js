import AccountView from '../../views/AccountView';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import userInfoReducer from "../../redux/Reducer/userInfoReducer";
function mapStateToProps(state) {
    const userInfo = state.userInfoReducer.data;
    return {
        userInfo
    };
}
function mapDispatchToProps(dispatch) {
  return {
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(AccountView);


