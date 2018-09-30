import React, {Component} from 'react';
import {View, TouchableOpacity, Dimensions, Image} from 'react-native';
import styles from './styles';
import Text from '../../commons/Text/Text';
import PropTypes from 'prop-types';
import global from '../../themes/global';
import localImage from '../../themes/localImage';
const { height, width } = Dimensions.get('window');

const ItemNotification = ({onClick, item,style}) => {
    let viewGroup = {
        flex:1,
        flexDirection:'row',
        paddingLeft:5,
        paddingRight:5,
        alignItems:'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        elevation: 2,
    };
    let imageOneNum = {
        width:50,
        height:50,
        borderRadius: 70 / 4};
    return (
        <TouchableOpacity activeOpacity={0.85} style={[viewGroup,style]} onPress={onClick}>
            <Image
                resizeMode={'cover'}
                style={imageOneNum}
                source={localImage.icApp}/>
            <View style={{marginLeft: 10, width: (width - 30)}}>
                <Text text={item.date}
                      numberOfLines={2}
                      size={global.sizeP13}
                      color={global.colorFF}/>
                <Text text={item.title}
                      numberOfLines={2}
                      size={global.sizeP12}
                      color={global.colorFF}
                      style={{marginTop:2}}/>
            </View>
        </TouchableOpacity>
    );
};
ItemNotification.defaultProps = {
};

ItemNotification.propTypes = {
    style: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
    onClick: PropTypes.func,
    item:PropTypes.object,
    isNew:PropTypes.bool
};

export default ItemNotification;
