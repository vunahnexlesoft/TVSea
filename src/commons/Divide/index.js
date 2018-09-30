import React, {Component} from 'react';
import {TouchableNativeFeedback, View, Image, Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import global from "../../themes/global";
const {height, width} = Dimensions.get('window');

const Divide = ({style}) => {
    let styleDivide = {
        height: 0.5,
        width: width,
        alignSelf:'center',
        marginTop:10,marginBottom:10,
        backgroundColor: global.darkBlue};
    return (
        <View style={[styleDivide,style]}/>
    );
};

Divide.propTypes = {
    style: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
};

export default Divide;
