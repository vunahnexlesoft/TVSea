import AdminView from '../../views/AdminView';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as adminAction from "../../redux/ActionCreator/actionAdminCreator";
function mapStateToProps(state) {
    const{category, storeStreaming, isStreaming} = state.adminReducer;
    return {
        category,
        storeStreaming,
        isStreaming
    };
}
function mapDispatchToProps(dispatch) {
    return {
        adminAction: bindActionCreators(adminAction, dispatch),
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(AdminView);


