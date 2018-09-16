
import React, {Component} from "react";
import {TextInput,View} from "react-native";
import PropTypes from 'prop-types';
import TextComponent from "../Text/Text";
import styles from './styles'
import global from "../../Styles/global";
import Icon from 'react-native-vector-icons/Ionicons';

const TextSingleInput = ({numberOfLines,returnKeyLabel,maxLength,nameIcon,multiline,value, placeholder, placeholderTextColor, style,
                                onChangeText,autoCapitalize,secureTextEntry,
                                returnKeyType,onSubmitEditing,keyboardType,blurOnSubmit,onFocus,onBlur, ref,warning}) => {
    const borderColor = warning ? styles.borderWarning : null;
    const height = multiline ? 100 : 40;
    return (
        <View style={borderColor}>
            <View style ={{
                backgroundColor: 'white',
                borderRadius: 6,
                height:height,
                flexDirection:'row'
            }}>
                <Icon name = {nameIcon} style={{marginLeft:10,alignSelf: 'center',fontSize:30, color: global.darkBlue}}/>
                {
                    multiline ?  <View style={[styles.divider, {height: 145}]}/> : <View style={styles.divider}/>
                }

                <TextInput
                    ref={ref}
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor={placeholderTextColor ? global.colorA5 :placeholderTextColor}
                    style={[{height, width: '75%'},style]}
                    onChangeText={onChangeText}
                    underlineColorAndroid={"rgba(255, 255, 255, 0)"}
                    autoCapitalize={autoCapitalize}
                    secureTextEntry={secureTextEntry}
                    returnKeyType={returnKeyType}
                    onSubmitEditing={onSubmitEditing}
                    keyboardType={keyboardType}
                    blurOnSubmit={blurOnSubmit}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    multiline={multiline}
                    editable = {true}
                    maxLength={maxLength}
                    returnKeyLabel={returnKeyLabel}
                    numberOfLines={numberOfLines}
                />
            </View>
            {
                warning ? <View style={styles.footerWarningWrapper}>
                    <TextComponent text={'Số điện thoại không đúng'} style={styles.textFooterWarning}/>
                </View> : <View style={{height:20}}/>
            }
        </View>
    );
};

TextSingleInput.defaultProps = {
    autoCapitalize: "none",
    style: {},
    value: "",
    placeholder: "",
    secureTextEntry: false,
    placeholderTextColor: "white",
    warning:false,
    multiline: false
};

TextSingleInput.propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    style: PropTypes.oneOfType([PropTypes.number,PropTypes.object,PropTypes.array]),
    onChangeText: PropTypes.func,
    autoCapitalize: PropTypes.string,
    secureTextEntry: PropTypes.bool,
    placeholderTextColor: PropTypes.string,
    returnKeyType: PropTypes.string,
    onSubmitEditing: PropTypes.func,
    keyboardType: PropTypes.string,
    blurOnSubmit: PropTypes.bool,
    focus: PropTypes.bool,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    ref:PropTypes.func,
    warning:PropTypes.bool,
    multiline:PropTypes.bool,
    maxLength: PropTypes.number,
    returnKeyLabel:PropTypes.string,
    numberOfLines:PropTypes.number
};
export default TextSingleInput;
