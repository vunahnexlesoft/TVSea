import React, {Component} from 'react';
import {View, TouchableOpacity, Dimensions, Image, Easing} from 'react-native';
import styles from './styles';
import Text from '../../commons/Text/Text';
import PropTypes from 'prop-types';
import global from '../../themes/global';
import localImage from '../../themes/localImage';
import Rating from "../../commons/Rating/Rating";
import RoundAvatar from "../../commons/Avatar/RoundAvatar";
import Divide from "../../commons/Divide";
import * as UTIL_FUNCTION from '../../util';
const {height, width} = Dimensions.get('window');

const ItemReview = ({onClick, item, style}) => {
    let viewGroup = {
        flex: 1,
        paddingLeft: 5,
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 5,
        justifyContent: 'center',
        backgroundColor: global.backgroundColor23,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.2,
        elevation: 2,
    };
    let imageOneNum = {
        width: 50,
        height: 50,
        borderRadius: 70 / 4
    };
    let viewTop = {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    };
    let viewTopLeft = {
        flexDirection: 'row',
        alignItems: 'center'
    };
    let viewTopRight = {
        alignItems: 'center',
    };
    return (
        <TouchableOpacity activeOpacity={0.85} style={[viewGroup, style]} onPress={onClick}>
            <View style={viewTop}>
                <View style={viewTopLeft}>
                    <RoundAvatar size={'tiny'}
                                 canClick={false}
                                 icSrc={item.url_avatar}/>
                    <View style={{marginLeft: 10}}>
                        <Text text={item.display_name}
                              numberOfLines={2}
                              size={global.sizeP13}
                              color={global.colorFF}/>
                        <Text text={UTIL_FUNCTION.convertTimeToString(item.date)}
                              numberOfLines={2}
                              size={global.sizeP12}
                              color={global.colorFF}
                              style={{marginTop: 2}}/>
                    </View>
                </View>

                <View style={viewTopRight}>
                    <Text text={UTIL_FUNCTION.makeTextReview(parseInt(item.rate))}
                          size={global.sizeP13}
                          color={global.colorFF}/>
                    <Rating
                        editable={false}
                        selectedStar={localImage.icStar}
                        initial={parseInt(item.rate)}
                        unselectedStar={localImage.icStarUnFill}
                        config={{
                            easing: Easing.inOut(Easing.ease),
                            duration: 350
                        }}
                        stagger={80}
                        maxScale={1.1}
                        starStyle={{
                            marginHorizontal:2,
                            width: 10,
                            height: 10
                        }}
                        containerStyle={{marginTop: 3, flexDirection: 'row'}}
                    />
                </View>

            </View>

            <Divide style={{marginTop:5}}/>

            <Text numberOfLines={4}
                  style={{margin:3,marginTop:0}}
                  color={global.grayColor}
                  text={item.comment}/>
        </TouchableOpacity>
    );
};
ItemReview.defaultProps = {};

ItemReview.propTypes = {
    style: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
    onClick: PropTypes.func,
    item: PropTypes.object,
    isNew: PropTypes.bool
};

export default ItemReview;
