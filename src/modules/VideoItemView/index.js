import React, {Component} from 'react';
import {View, Dimensions,FlatList} from 'react-native';
import global from "../../themes/global";
import PropTypes from "prop-types";
import Video from 'react-native-video';
import localImage from '../../themes/localImage'
import IconButton from "../../commons/Button/IconButton";
const {height, width} = Dimensions.get('window');

class VideoItemView extends Component {
    render() {
        const {data, renderItem,style, numColumns} = this.props;
        const {host} = this.props.navigation.state.params;
        return (
            <View style={{flex:1, backgroundColor:global.blackTab}}>
                <View style={{
                    height: 35,
                    width: 35,
                    borderRadius: 35/3,
                    backgroundColor: global.grayColor,
                    alignItems: 'center',
                    justifyContent:'center',
                    position: 'absolute', top:10, left:10,zIndex:1
                }}>
                    <IconButton nameIcon={'ios-arrow-back-outline'}
                                onClick={()=> this.props.navigation.goBack()}
                                btnStyle={{marginRight: 2}}
                                iconStyle={{fontSize:global.sizeP30, color: global.colorFF}}/>
                </View>
                <Video source={{uri: host}}   // Can be a URL or a local file.
                       style={{
                           position: 'absolute',
                           top: 0,
                           left: 0,
                           bottom: 0,
                           right: 0,
                       }} />
            </View>

        );
    }
}

VideoItemView.defaultProps = {
    data: [],
    numColumns: 2
};
VideoItemView.propTypes = {
    numColumns: PropTypes.number,
    data: PropTypes.array,
    renderItem: PropTypes.func,
    style: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
};

export default VideoItemView;


