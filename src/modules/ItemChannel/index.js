import React, {Component} from 'react';
import {View, TouchableOpacity, Dimensions, Image} from 'react-native';
import styles from './styles';
import Text from '../../commons/Text/Text';
import PropTypes from 'prop-types';
import global from '../../themes/global';
const { height, width } = Dimensions.get('window');

const ItemChannel = ({uriImage, onClick, numCol}) => {
    let viewGroup = {
        flex:1,
        alignItems: numCol === 1 ? 'center' : null,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        elevation: 2,
    };
    let imageTwoNum = {
        width: (width - 6 * 4) / 2,
        margin: 5,
        height: 250,
        backgroundColor: "white",
        borderRadius: 8,
        flex: 1};
    let imageOneNum = {
        width: width - 20,
        borderRadius: 10,
        height: 200};
    return (
        <TouchableOpacity style={viewGroup} onPress={onClick}>
            <View style={viewGroup}>
                <Image
                    resizeMode={'cover'}
                    style={numCol === 1 ? imageOneNum : imageTwoNum}
                    source={{uri: uriImage, cache: 'force-cache'}}/>
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
