import React, {Component} from 'react';
import {View, TouchableOpacity, Dimensions, Image} from 'react-native';
import styles from './styles';
import Text from '../../commons/Text/Text';
import PropTypes from 'prop-types';
import global from '../../themes/global';
const { height, width } = Dimensions.get('window');

const ItemGenres = ({onClick, item}) => {
    let imageTwoNum = {
        width: (width - 6 * 4) / 2,
        margin: 5,
        marginTop: 3,
        marginBottom:3,
        height: 70,
        backgroundColor: "transparent",
        alignItems:'center',
        justifyContent:'center',
        borderColor: global.borderRightColor,
        borderRadius: 8,
        borderWidth:1,
        flex: 1};
    return (
        <TouchableOpacity style={imageTwoNum} onPress={onClick}>
                <Text text={'Hanh dong'}
                      color={global.colorFF}
                      size={global.sizeP18}/>
        </TouchableOpacity>
    );
};
ItemGenres.defaultProps = {
};

ItemGenres.propTypes = {
    item: PropTypes.object,
    onClick: PropTypes.func,
};

export default ItemGenres;
