import React, {Component} from 'react';
import {View, TouchableOpacity, Dimensions, Image} from 'react-native';
import styles from './styles';
import Text from '../../commons/Text/Text';
import PropTypes from 'prop-types';
import global from '../../themes/global';
import ButtonWithIcon from "../../commons/Button/ButtonWithIcon";
const { height, width } = Dimensions.get('window');

const HighlightCarouselItem = ({onClick, item}) => {
    let viewGroup = {
        flex:1,
    };
    let imageOneNum = {
        width: width - 50,
        borderRadius: 10,
        height: 250,
        alignSelf: 'center'
    };
    return (
        <TouchableOpacity onPress={onClick}>
            <View style={viewGroup}>
                <View style={{position:'absolute',
                    bottom: 10,
                    left:10,
                    zIndex: 1,
                    width: (width - 50) / 2,
                    backgroundColor: 'transparent',
                    padding:5,
                    borderRadius: 5}}>
                    <Text text={item.title}
                          numberOfLines={2}
                          color={global.colorFF}
                          size={global.sizeP20}
                          />
                </View>
                <ButtonWithIcon buttonText={'Xem ngay'}
                                style={{
                                    bottom: 10,
                                    right:10,
                                    position:'absolute',
                                    height: null,
                                    backgroundColor: global.borderRightColor,
                                    padding: 8, paddingRight:10, paddingLeft:10,
                                    zIndex:1}}
                                styleText={{color: global.colorFF, fontSize: global.sizeP15}}/>
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
