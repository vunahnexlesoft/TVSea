import React, {Component} from 'react';
import {View, TouchableOpacity, Dimensions, Image,Platform} from 'react-native';
import styles from './styles';
import Text from '../../commons/Text/Text';
import PropTypes from 'prop-types';
import global from '../../themes/global';
import ButtonWithIcon from "../../commons/Button/ButtonWithIcon";

const {height, width} = Dimensions.get('window');
import FastImage from 'react-native-fast-image'
import Swipeout from 'react-native-swipeout';
import IconButton from "../../commons/Button/IconButton";
import * as STRING from "../../themes/string";

let IS_IOS = Platform.OS === "ios";
class ItemMovieNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openRight: false
        };
    }

    render() {
        const {onClick, item, isNew, disabledSwipe, disabledClick} = this.props;
        let viewGroup = {
            flex: 1,
            flexDirection: 'row',
            paddingLeft: 5,
            paddingRight: 5,
            backgroundColor: global.backgroundColor23,
            borderRadius: 8,
            paddingTop: 3,
            paddingBottom: 3,
            alignItems: 'center',
            elevation: 1,
            shadowColor: "#000",
            shadowOffset: {width: 0, height: 0},
            shadowOpacity: 0.3,
        };
        let imageOneNum = {
            width: 70,
            height: 70,
            borderRadius: 70 / 4
        };
        let buttonText = isNew ? 'Xem ngay' : 'Xem lại';
        let swipeBtns = [{
            component: <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                <IconButton
                    nameIcon={'ios-eye'}
                    iconStyle={{fontSize: global.sizeP35, color: global.colorFF}}
                    disabled
                />
                <Text
                    text={'Xem lại'}
                    color={global.colorFF}
                    size={global.sizeP14}
                    style={{fontWeight: global.fontWeightDark}}
                />
            </View>,
            backgroundColor: 'transparent',
            //onPress: () => { this.deleteNote(rowData) }
        }, {
            component: <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                <IconButton
                    nameIcon={'ios-close'}
                    iconStyle={{fontSize: global.sizeP35, color: global.colorFF}}
                    disabled
                />
                <Text
                    text={'Xóa'}
                    color={global.colorFF}
                    size={global.sizeP14}
                    style={{fontWeight: global.fontWeightDark}}
                />
            </View>,
            backgroundColor: '#DC524A',
            //onPress: () => {this.onClickToIgnore()}
        }];
        return (
            <Swipeout right={swipeBtns}
                      autoClose={true}
                      disabled={disabledSwipe}
                      onClose={() => this.setState({openRight: false})}
                      openRight={this.state.openRight}
                      backgroundColor={'transparent'}>
                <TouchableOpacity activeOpacity={0.85} style={viewGroup} disabled={disabledClick}
                                  onPress={() => this.setState({openRight: true})}>
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
                              style={{marginTop: 3}}/>
                    </View>
                    {
                        isNew ? <ButtonWithIcon buttonText={buttonText}
                                                onClick={onClick}
                                                style={{
                                                    bottom: 70 / 3,
                                                    right: 10,
                                                    position: 'absolute',
                                                    height: null,
                                                    backgroundColor: global.borderRightColor,
                                                    padding: 5, paddingRight: 8, paddingLeft: 8,
                                                    zIndex: 1
                                                }}
                                                styleText={{color: global.colorFF, fontSize: global.sizeP14}}/>
                            : <IconButton
                                onClick={() => this.setState({openRight: true})}
                                nameIcon={'ios-add'}
                                iconStyle={{fontSize: global.sizeP35, color: global.colorFF}}
                                btnStyle={{
                                    bottom: IS_IOS ? 70 / 4 : 70 / 3,
                                    right: 20,
                                    position: 'absolute',
                                    height: null,
                                    zIndex: 1
                                }}
                                disabled
                            />
                    }

                </TouchableOpacity>
            </Swipeout>
        );
    }

};
ItemMovieNew.defaultProps = {
    isNew: true
};

ItemMovieNew.propTypes = {
    styleText: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
    onClick: PropTypes.func,
    numCol: PropTypes.number,
    isNew: PropTypes.bool,
    disabledClick: PropTypes.bool,
    disabledSwipe: PropTypes.bool,
};

export default ItemMovieNew;
