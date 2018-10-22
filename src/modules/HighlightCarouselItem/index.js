import React, {Component} from 'react';
import {View, TouchableOpacity, Dimensions, Image, Platform} from 'react-native';
import styles from './styles';
import Text from '../../commons/Text/Text';
import PropTypes from 'prop-types';
import global from '../../themes/global';
import ButtonWithIcon from "../../commons/Button/ButtonWithIcon";
import FastImage from 'react-native-fast-image'

const {height, width} = Dimensions.get('window');
const IS_IOS = Platform.OS === 'ios';
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

function wp(percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideHeight = viewportHeight * 0.36;
const slideWidth = wp(80);
const itemHorizontalMargin = wp(7);

const sliderWidth = viewportWidth;
const itemWidth = slideWidth + itemHorizontalMargin;
const HighlightCarouselItem = ({onClick, item}) => {
    let viewGroup = {
        flex: 1,
        width: itemWidth,
        zIndex:0
    };
    let imageOneNum = {
        width: itemWidth,
        borderRadius: 10,
        height: slideHeight,
        zIndex:0
    };
    return (
        <TouchableOpacity style={viewGroup} disabled>
            <View style={{
                width: itemWidth,
                backgroundColor: global.transparentBlack2,
                position: 'absolute',
                flex:1,
                top: 0,
                left: 0,
                right: 0,
                bottom:0,
                zIndex: 1
            }}/>
            <View style={{
                position: 'absolute',
                bottom: 10,
                left: 10,
                zIndex: 1,
                width: (width - 50) / 2,
                backgroundColor: 'transparent',
                padding: 5,
                borderRadius: 5
            }}>
                <Text text={item.title}
                      numberOfLines={2}
                      color={global.colorFF}
                      size={global.sizeP20}
                />
            </View>
            <ButtonWithIcon buttonText={'Xem ngay'}
                            onClick={onClick}
                            style={{
                                bottom: 10,
                                right: 10,
                                position: 'absolute',
                                height: null,
                                backgroundColor: global.borderRightColor,
                                padding: 8, paddingRight: 10, paddingLeft: 10,
                                zIndex: 1
                            }}
                            styleText={{color: global.colorFF, fontSize: global.sizeP15}}/>
            <FastImage
                resizeMode={FastImage.resizeMode.cover}
                style={imageOneNum}
                source={{
                    uri: item.backdrop_path,
                    priority: FastImage.priority.normal,
                }}/>
        </TouchableOpacity>
    );
};
HighlightCarouselItem.defaultProps = {};

HighlightCarouselItem.propTypes = {
    uriImage: PropTypes.string,
    style: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
    onClick: PropTypes.func,
    item: PropTypes.object
};

export default HighlightCarouselItem;
