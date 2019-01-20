import React, {Component} from 'react';
import {View, TouchableOpacity, Dimensions, Image} from 'react-native';
import styles from './styles';
import Text from '../../commons/Text/Text';
import PropTypes from 'prop-types';
import global from '../../themes/global';
import FastImage from 'react-native-fast-image'
import ButtonWithIcon from "../../commons/Button/ButtonWithIcon";

const {height, width} = Dimensions.get('window');

const ItemChannel = ({uriImage, onClick, numCol, counter, text, type}) => {
    let viewGroup = {
        flex: 1,
        alignItems: numCol === 1 ? 'center' : null,

    };
    let imageTwoNum = {
        width: (width - 6 * 7) / 2,
        margin: 5,
        height: height / 3,
        backgroundColor: "white",
        borderRadius: 8,
        flex: 1
    };
    let imageOneNum = {
        borderColor: numCol === 1 ? 'white' : 'transparent',
        borderWidth: numCol === 1 ? 0.5 : 0,
        width: width - 20,
        borderRadius: 10,
        height: height / 3
    };
    let textStr = type === 'related' ? text : 'Xem vào: ' + text;
    return (
        <TouchableOpacity activeOpacity={0.85} style={viewGroup} onPress={onClick}>
            <FastImage
                resizeMode={FastImage.resizeMode.cover}
                style={numCol === 1 ? imageOneNum : imageTwoNum}
                source={{
                    uri: uriImage,
                    priority: FastImage.priority.normal,
                }}/>
            {
                numCol !== 1 ? <View style={{
                    width: (width - 6 * 7) / 2 + 5,
                    height: 30,
                    backgroundColor: global.transparentBlack5,
                    position: 'absolute',
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 1
                }}/> : null
            }
            {
                numCol !== 1 ? <View style={{
                    position: 'absolute',
                    top: 10,
                    width: (width - 6 * 7) / 2 + 5,
                    left: 10,
                    zIndex: 1,
                    flex:1
                }}>
                    <Text text={textStr} size={global.sizeP16} color={global.colorFF} style={{lineHeight: global.sizeP18}}/>
                </View> : null
            }
            {
                numCol === 1 ? <ButtonWithIcon buttonText={"Live: " + counter} style={{
                    height: 30,
                    //width: 50,
                    paddingHorizontal: 10,
                    borderRadius: 35 / 3,
                    backgroundColor: global.red,
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute', top: 10, right: 10, zIndex: 1
                }}/> : null
            }
            {
                numCol === 1 ? <View style={{
                    position: 'absolute', top: 10, left: 10, zIndex: 1
                }}>
                    <Text text={text} size={global.sizeP16} color={global.colorFF}/>
                </View> : null
            }
            {
                numCol === 1 ? <View style={{
                    position: 'absolute', bottom: 10, left: 10, zIndex: 1
                }}>
                    <Text text={'Đang chiếu: Transformer 4 Kỷ nguyên mới'} size={global.sizeP16}
                          color={global.colorFF}/>
                </View> : null
            }
        </TouchableOpacity>
    );
};
ItemChannel.defaultProps = {};

ItemChannel.propTypes = {
    uriImage: PropTypes.string,
    styleText: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
    onClick: PropTypes.func,
    numCol: PropTypes.number,
    counter: PropTypes.number,
};

export default ItemChannel;
