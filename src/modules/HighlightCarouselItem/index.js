import React, {Component} from 'react';
import {View, TouchableOpacity, Dimensions, Image} from 'react-native';
import styles from './styles';
import Text from '../../commons/Text/Text';
import PropTypes from 'prop-types';
import global from '../../themes/global';
const { height, width } = Dimensions.get('window');

const HighlightCarouselItem = ({onClick, item}) => {
    let viewGroup = {
        flex:1,
    };
    let imageOneNum = {
        width: width - 50,
        borderRadius: 10,
        height: 200,
        alignSelf: 'center'
    };
    return (
        <TouchableOpacity onPress={onClick}>
            <View style={viewGroup}>
                <View style={{position:'absolute',
                    bottom: 10,
                    right:10,
                    zIndex: 1,
                    backgroundColor: global.backgroundColor,
                    padding:5,
                    alignItems: 'center',
                    borderRadius: 5}}>
                    <Text text={item.title}
                          color={global.colorFF}
                          size={global.sizeP15}
                          />
                </View>
                <Image
                    resizeMode={'cover'}
                    style={imageOneNum}
                    source={{uri: item.backdrop_path, cache: 'force-cache'}}/>
            </View>
        </TouchableOpacity>
    );
};
HighlightCarouselItem.defaultProps = {
};

HighlightCarouselItem.propTypes = {
    uriImage: PropTypes.string,
    style: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
    onClick: PropTypes.func,
    item:PropTypes.object
};

export default HighlightCarouselItem;
