import HistoryView from '../../views/HistoryView';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as usersAction from "../../redux/ActionCreator/actionLoginCreators";

function mapStateToProps(state) {
    const {like, history, userInfo} = state.userLoginReducer;
    return {
        dataHistory: history.data,
        isHistoryLoading: history.isLoading,
        isHistoryError: history.isError,
        dataLike: like.data,
        isLikeLoading: like.isLoading,
        isLikeError: like.isError,
        userInfo
    };
}

function mapDispatchToProps(dispatch) {
    return {
        usersAction: bindActionCreators(usersAction, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryView);


