import React, {Component} from 'react';
import {View, TouchableOpacity, Dimensions, StyleSheet, Image} from 'react-native';
import styles from './styles';
import Text from '../../commons/Text/Text';
import PropTypes from 'prop-types';
import global from '../../themes/global';
const { height, width } = Dimensions.get('window');

const TabItem = ({text, styleText, onChangeTabView, isActive, size, isUpperCase, numTab}) => {
    let viewGroup = {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    };
    let textStyle = {
        color: isActive ? global.borderRightColor : global.colorA5,
        fontSize: size,
        textAlign: 'center'
        //fontFamily: isActive ? global.fontBold : (type === 0 ? global.fontRegular : global.fontSemiBold)
    };
    let TEXT_STRING = isUpperCase ? text.toUpperCase() : text;
    const renderItem = () => {
                return (
                    <View style={viewGroup}>
                        <Text text={TEXT_STRING}
                              style={[textStyle, styleText]}
                        />
                        <View style={{marginTop: 2,
                            opacity: isActive ? 1 : 0,
                            height: 3,
                            width: width / numTab,
                            position: 'absolute',
                            bottom: 0,
                            backgroundColor: global.borderRightColor}}/>
                    </View>
                );
        };
    return (
        <TouchableOpacity style={viewGroup} onPress={onChangeTabView}>
            {renderItem()}
        </TouchableOpacity>
    );
};
TabItem.defaultProps = {
    text: '',
    size: global.sizeP14,
    isActive: true,
    isUpperCase: false,
};

TabItem.propTypes = {
    text: PropTypes.string,
    size: PropTypes.number,
    numTab: PropTypes.number,
    styleText: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
    onChangeTabView: PropTypes.func,
    isActive: PropTypes.bool,
    isUpperCase: PropTypes.bool,
};

export default TabItem;
