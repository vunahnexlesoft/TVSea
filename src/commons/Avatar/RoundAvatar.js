import React, {Component} from 'react';
import {TouchableNativeFeedback, View,Image} from 'react-native';
import PropTypes from 'prop-types';
import global from "../../Styles/global";
import FastImage from 'react-native-fast-image'

const RoundAvatar = ({uriImage, avatarStyle, onClick,disableClick}) => {
    let imageStyle = {
        height:50,
        width:50,
        borderRadius:25,
        borderColor:'white',
        borderWidth:1};
    return (
        <TouchableNativeFeedback onPress={onClick} disable ={disableClick}>
            <FastImage
                resizeMode={FastImage.resizeMode.cover}
                source={{uri:uriImage}}
                style={[imageStyle, avatarStyle]}
            />
        </TouchableNativeFeedback>
    );
};

RoundAvatar.propTypes = {
    uriImage: PropTypes.string,
    avatarStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
    onClick: PropTypes.func,
    disableClick:PropTypes.bool
};

export default RoundAvatar;
