import React, {Component} from 'react';
import {View, TouchableOpacity, Dimensions, Image, ImageBackground} from 'react-native';
import styles from './styles';
import Text from '../../commons/Text/Text';
import PropTypes from 'prop-types';
import global from '../../themes/global';
import FastImage from 'react-native-fast-image'
import localImage from "../../themes/localImage";

const {height, width} = Dimensions.get('window');

const ItemMovieCategory = ({item, onClick, numCol}) => {
    let viewGroup = {
        //flex: 1,
        alignItems: 'center',
    };
    let imageOneNum = {
        width: width / 3,
        borderRadius: 10,
        height: height / 4
    };
    let imageThreeNum = {
        backgroundColor:'green',
        width: (width - 6 * 4) / 3,
        margin: 3,
        borderRadius: 10,
        height: height / 4.3
    };
    let iconStyleOneNum = {width: 30, height: 30,
        position:'absolute', top: 0, left:5,
        alignItems: 'center',
        justifyContent: 'center'};
    let iconStyleThreeNum = {width: 25, height: 25,
        position:'absolute', top: 5, left:5,
        alignItems: 'center',
        justifyContent: 'center'};
    return (
        <TouchableOpacity activeOpacity={0.85} style={viewGroup} onPress={onClick}>
            <FastImage
                resizeMode={FastImage.resizeMode.cover}
                style={numCol === 3 ? imageThreeNum : imageOneNum}
                source={{
                    uri: item.poster_path,
                    priority: FastImage.priority.normal,
                }}/>
            <View style={{
                width: numCol === 3 ? ((width - 6 * 2) / 3) : width / 3,
                height: 30,
                backgroundColor: global.transparentBlack2,
                position: 'absolute',
                flex:1,
                borderTopLeftRadius:10,
                borderTopRightRadius:10,
                top: 0,
                left: 0,
                right: 0,
                bottom:0,
                zIndex: 1
            }}/>
            <Text text={item.title}
                  color={global.colorFF}
                  size={global.sizeP16}
                  style={{marginTop:5, width:numCol === 3 ? ((width - 6 * 2) / 3) : width / 3, textAlign:'center'}}
                  numberOfLines={1}/>
            <ImageBackground source={localImage.icStar}
                             style={numCol === 3 ? iconStyleThreeNum : iconStyleOneNum}>
                <Text color={global.colorFF}
                               size={global.sizeP14}
                               style={{textAlign: 'center', lineHeight: global.sizeP14}}
                               text={item.rating}/>
            </ImageBackground>
        </TouchableOpacity>
    );
};
ItemMovieCategory.defaultProps = {
    numCol:1
};

ItemMovieCategory.propTypes = {
    uriImage: PropTypes.string,
    styleText: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
    onClick: PropTypes.func,
    numCol: PropTypes.number
};

export default ItemMovieCategory;
