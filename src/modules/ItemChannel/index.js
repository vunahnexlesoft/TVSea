import React, {Component} from 'react';
import {View, TouchableOpacity, Dimensions, Image} from 'react-native';
import styles from './styles';
import Text from '../../commons/Text/Text';
import PropTypes from 'prop-types';
import global from '../../themes/global';
import FastImage from 'react-native-fast-image'

const { height, width } = Dimensions.get('window');

const ItemChannel = ({uriImage, onClick, numCol}) => {
    let viewGroup = {
        flex:1,
        alignItems: numCol === 1 ? 'center' : null,
    };
    let imageTwoNum = {
        width: (width - 6 * 7) / 2,
        margin: 5,
        height: height / 3,
        backgroundColor: "white",
        borderRadius: 8,
        flex: 1};
    let imageOneNum = {
        width: width - 20,
        borderRadius: 10,
        height: height / 3};
    return (
        <TouchableOpacity activeOpacity={0.85} style={viewGroup} onPress={onClick}>
            <View style={viewGroup}>
                <FastImage
                    resizeMode={FastImage.resizeMode.cover}
                    style={numCol === 1 ? imageOneNum : imageTwoNum}
                    source={{
                        uri: uriImage,
                        priority: FastImage.priority.normal,
                    }}/>
            </View>
        </TouchableOpacity>
    );
};
ItemChannel.defaultProps = {
};

ItemChannel.propTypes = {
    uriImage: PropTypes.string,
    styleText: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
    onClick: PropTypes.func,
    numCol:PropTypes.number
};

export default ItemChannel;
