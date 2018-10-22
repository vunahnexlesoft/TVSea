import React, {Component} from 'react';
import {View, Dimensions, Animated} from 'react-native';
import styles from './styles';
import Text from '../../commons/Text/Text';
import global from "../../themes/global";
import IconButton from "../../commons/Button/IconButton";
import PropTypes from "prop-types";
const {height, width} = Dimensions.get('window');
class EmptyView extends Component{
    render(){
        const {nameIcon, textDes,style}=this.props;
        return (
            <View style={[{alignItems:'center', justifyContent:'center', height: 70},style]}>
                <IconButton nameIcon={nameIcon} iconStyle={{fontSize: global.sizeP35,color:global.colorFF}}/>
                <Text text={textDes} color={global.colorFF} size={global.sizeP16}/>
            </View>
        );
    }
}
EmptyView.defaultProps = {
    nameIcon: '',
    textDes: '',
};
EmptyView.propTypes = {
    nameIcon: PropTypes.string,
    textDes: PropTypes.string,
    style: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
};

export default EmptyView;


