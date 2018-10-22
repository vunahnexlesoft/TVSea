import React, {Component} from 'react';
import {View, Dimensions,FlatList} from 'react-native';
import global from "../../themes/global";
import PropTypes from "prop-types";
import Video from 'react-native-video';
import localImage from '../../themes/localImage'
import IconButton from "../../commons/Button/IconButton";
const {height, width} = Dimensions.get('window');

class MovieDetailModal extends Component {
    render() {
        const {data, renderItem,style, numColumns} = this.props;
        return (
            <View style={{flex:1, backgroundColor:global.colorFF, position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,zIndex:10}}>

            </View>

        );
    }
}

MovieDetailModal.defaultProps = {
    data: [],
    numColumns: 2
};
MovieDetailModal.propTypes = {
    numColumns: PropTypes.number,
    data: PropTypes.array,
    renderItem: PropTypes.func,
    style: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
};

export default MovieDetailModal;


