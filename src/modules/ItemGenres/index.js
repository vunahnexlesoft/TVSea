import React, {Component} from 'react';
import {View, TouchableOpacity, Dimensions, Image} from 'react-native';
import styles from './styles';
import Text from '../../commons/Text/Text';
import PropTypes from 'prop-types';
import global from '../../themes/global';
const { height, width } = Dimensions.get('window');
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
const ItemGenres = ({onClick, item, type}) => {
    let styleDetail = {
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 7, paddingBottom: 8,
        paddingRight: 18, paddingLeft: 18, marginLeft: 3, marginRight: 3,
        backgroundColor: "transparent",
        borderColor: getRandomColor(),
        borderRadius: 8,
        borderWidth:1,};
    let styleDiscover = {
        width: (width - 6 * 4) / 3,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 7, paddingBottom: 8,
        paddingRight: 18, paddingLeft: 18,
        marginTop: 5, marginLeft: 3, marginRight: 3,
        backgroundColor: "transparent",
        borderColor: getRandomColor(),
        borderRadius: 8,
        borderWidth:1,
        flex: 1
    };
    return (
        <TouchableOpacity style={type === 'discover' ? styleDiscover : styleDetail} onPress={onClick}>
                <Text text={item.name_genre}
                      numberOfLines={type === 'discover' ? 2 : 1}
                      color={global.colorFF}
                      size={type === 'discover' ? global.sizeP18 : global.sizeP15}/>
        </TouchableOpacity>
    );
};
ItemGenres.defaultProps = {
    type: 'discover'
};

ItemGenres.propTypes = {
    item: PropTypes.object,
    onClick: PropTypes.func,
    type: PropTypes.string
};

export default ItemGenres;
