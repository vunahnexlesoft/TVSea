import React, {Component} from 'react';
import {TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import TextComponent from "../Text/Text";
import global from "../../themes/global";

const IconButton = ({nameIcon, btnStyle, iconStyle, badge, onClick,disabled,hitSlop}) => {
    let buttonStyle = {
        alignItems: 'center',
    };
    let badgeStyle = {
        position: 'absolute',
        top: 0, left: 0, bottom: 0, right: 15,
        backgroundColor: global.red,
        borderRadius:10,height:20,width:20,
        textAlign:'center'
    };
    return (
        <TouchableOpacity activeOpacity={0.85} style={[buttonStyle, btnStyle]} hitSlop={hitSlop} onPress={onClick} disabled={disabled}>
                <Icon name={nameIcon} style={iconStyle}/>
                {badge ? <TextComponent text={badge} size={global.sizeP15} color={global.colorF4} style={badgeStyle}/> : null}
        </TouchableOpacity>
    );
};
IconButton.defaultProps = {
    badge: '',
    nameIcon: ''
};
IconButton.propTypes = {
    disabled:PropTypes.bool,
    nameIcon: PropTypes.string,
    badge: PropTypes.string,
    btnStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
    iconStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
    onClick: PropTypes.func
};

export default IconButton;
