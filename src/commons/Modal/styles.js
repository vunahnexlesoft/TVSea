import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';

const {height, width} = Dimensions.get('window');

export const imageWidth = width;
export const imageHeight = (imageWidth / 500) *330;

export default StyleSheet.create({
    //  modalOder
    modalOder: {
        borderRadius: 6,
        backgroundColor: 'white',
        width: width - 20,
        paddingTop: 24,
        paddingBottom: 10,
        paddingLeft: width >= 375 ? 15 : 9,
        paddingRight: width >= 375 ? 15 : 9,
        alignSelf: 'center',
        justifyContent: 'center',
    },
});