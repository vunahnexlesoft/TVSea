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

const {height, width} = Dimensions.get('window');

const ItemReview = ({onClick, item, style}) => {
    let viewGroup = {
        flex: 1,
        paddingLeft: 5,
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 5,
        justifyContent: 'center',
        backgroundColor: global.backgroundColor,
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
                    <RoundAvatar size={'small'}
                                 canClick={false}
                                 icSrc={'https://scontent.fsgn5-2.fna.fbcdn.net/v/t1.0-9/29197246_2062594664016900_292927065248317668_n.jpg?_nc_cat=107&oh=0582839f39e11a69ab0f4ebe2c9b8ea1&oe=5C6341A6'}/>
                    <View style={{marginLeft: 10}}>
                        <Text text={'Huy Vu'}
                              numberOfLines={2}
                              size={global.sizeP13}
                              color={global.colorFF}/>
                        <Text text={'1 phút trước'}
                              numberOfLines={2}
                              size={global.sizeP12}
                              color={global.colorFF}
                              style={{marginTop: 2}}/>
                    </View>
                </View>

                <View style={viewTopRight}>
                    <Text text={'Tuyet voi'}
                          size={global.sizeP13}
                          color={global.colorFF}/>
                    <Rating
                        editable={false}
                        selectedStar={localImage.icStar}
                        initial={4}
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
                  color={global.grayColor}
                  text={'askjdnkajsndkjsandksandkjsandkjsandkjasndknasdkjnaskdjnaskjndkajsndkjasndksnadkjadkjasadjddadad'}/>
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
