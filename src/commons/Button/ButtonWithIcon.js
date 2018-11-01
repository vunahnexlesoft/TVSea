import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from "prop-types";

const ButtonWithIcon = ({nameIcon, icoStyle, style, buttonText, styleText, onClick}) => {
    let buttonStyle = {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 45,
        backgroundColor: '#EA6355',
        borderRadius: 5
    };
    let iconStyle = {
        alignSelf: 'center',
        fontSize: 40,
        color: '#545454',
        margin: 5
    };
    let textStyle = {
        fontSize: 20,
        textAlign: 'center',
        color: 'white'
    };
    return (
        <TouchableOpacity activeOpacity={0.85} style={[buttonStyle, style]} onPress={onClick}>
            {!nameIcon ? (null) : (<Icon name={nameIcon} style={[iconStyle, icoStyle]}/>)}
            {!buttonText ? (null) : (<Text style={[textStyle, styleText]}>{buttonText}</Text>)}
        </TouchableOpacity>

    );
};

ButtonWithIcon.defaultProps = {
    name: '',
};
ButtonWithIcon.propTypes = {
    nameIcon: PropTypes.string,
    buttonText: PropTypes.string,
    onClick: PropTypes.func,
    icoStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
    style: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
    styleText: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
};


export default ButtonWithIcon;


