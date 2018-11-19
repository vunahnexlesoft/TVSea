import React, {Component} from 'react';
import {TouchableOpacity, View, Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import TextComponent from "../Text/Text";
import global from "../../themes/global";
import ProgressBar from 'react-native-progress/Bar';
const {height, width} = Dimensions.get('window');
const ProgressTimeVideo = ({onClick, disabled, progress}) => {
    let buttonStyle = {
        alignItems: 'center',
    };
    return (
        <TouchableOpacity activeOpacity={0.85} style={buttonStyle} onPress={onClick} disabled={disabled}>
            <ProgressBar progress={progress}
                         color={global.colorFF}
                         width={width - 110}
                         height={8}
                         unfilledColor={global.transparentPrimary}/>
        </TouchableOpacity>
    );
};
ProgressTimeVideo.defaultProps = {
};
ProgressTimeVideo.propTypes = {
    disabled: PropTypes.bool,
    progress: PropTypes.number,
    onClick: PropTypes.func
};

export default ProgressTimeVideo;
