import VideoView from '../../views/VideoView';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
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
export default connect(mapStateToProps,mapDispatchToProps)(VideoView);


