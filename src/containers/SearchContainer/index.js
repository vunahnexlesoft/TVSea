import SearchView from '../../views/SearchView';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actionGetByCategory from '../../redux/ActionCreator/actionGetMovieByCategory'
function mapStateToProps(state) {
    return {
        data: state.getMovieByCategory.phimle.data,
        isLoading: state.getMovieByCategory.phimle.isLoading,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        getData: bindActionCreators(actionGetByCategory, dispatch),
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(SearchView);


