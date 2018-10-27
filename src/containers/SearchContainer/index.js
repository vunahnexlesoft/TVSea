import SearchView from '../../views/SearchView';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as moviesAction from "../../redux/ActionCreator/actionMovieCreator";
function mapStateToProps(state) {
    const {search} = state.moviesReducer;
    return {
        dataSearch: search.data,
        isSearchLoading: search.isLoading,
        isSearchError: search.isError,
        dataHistory: search.history,
        search: state.moviesReducer.search
    };
}
function mapDispatchToProps(dispatch) {
    return {
        moviesAction: bindActionCreators(moviesAction, dispatch),
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(SearchView);


