import React, {Component} from 'react';
import {View, TouchableOpacity, Dimensions, Image} from 'react-native';
import styles from './styles';
import Text from '../../commons/Text/Text';
import PropTypes from 'prop-types';
import global from '../../themes/global';
import ButtonWithIcon from "../../commons/Button/ButtonWithIcon";
const { height, width } = Dimensions.get('window');
import FastImage from 'react-native-fast-image'

const ItemMovieNew = ({onClick, item,isNew}) => {
    let viewGroup = {
        flex:1,
        flexDirection:'row',
        paddingLeft:5,
        paddingRight:5,
        alignItems:'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        elevation: 2,
    };
    let imageOneNum = {
        width:70,
        height:70,
        borderRadius: 70 / 4};
    let buttonText = isNew ? 'Xem ngay' : 'Xem lại';
    return (
        <View style={viewGroup} onPress={onClick}>
                <FastImage
                    resizeMode={FastImage.resizeMode.cover}
                    style={imageOneNum}
                    source={{
                        uri: item.poster_path,
                        priority: FastImage.priority.normal,
                    }}/>
            <View style={{marginLeft: 10, width: (width / 2) - 30}}>
                <Text text={item.title_en}
                      numberOfLines={2}
                      size={global.sizeP14}
                      color={global.colorFF}/>
                <Text text={item.title}
                      numberOfLines={2}
                      size={global.sizeP13}
                      color={global.colorFF}
                      style={{marginTop:3}}/>
            </View>
            <ButtonWithIcon buttonText={buttonText}
                            onClick={onClick}
                            style={{
                                bottom: 70 / 4,
                                right:10,
                                position:'absolute',
                                height: null,
                                backgroundColor: global.borderRightColor,
                                padding: 5, paddingRight:8, paddingLeft:8,
                                zIndex:1}}
                            styleText={{color: global.colorFF, fontSize: global.sizeP14}}/>
        </View>
    );
};
ItemMovieNew.defaultProps = {
    isNew: true
};

ItemMovieNew.propTypes = {
    styleText: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
    onClick: PropTypes.func,
    numCol:PropTypes.number,
    isNew:PropTypes.bool
};

export default ItemMovieNew;
