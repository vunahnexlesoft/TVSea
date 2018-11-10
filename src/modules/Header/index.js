import React, {Component} from 'react';
import {View, Dimensions, Animated} from 'react-native';
import styles from './styles';
import Text from '../../commons/Text/Text';
import global from "../../themes/global";
import IconButton from "../../commons/Button/IconButton";
import PropTypes from "prop-types";
import moment from 'moment';
import RoundAvatar from "../../commons/Avatar/RoundAvatar";
import * as STRING from "../../themes/string";

const {height, width} = Dimensions.get('window');

class Header extends Component {
    render() {
        const {heading, url, styleHeader, isMain, onClickBack} = this.props;
        let date = moment(new Date()).format("dddd, MMM DD, YYYY");
        return isMain ? (<View style={[{
            elevation: 2,
            shadowColor: global.backgroundColor23,
            backgroundColor: global.backgroundColor23,
            paddingTop: 5,
            paddingBottom: 5,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            zIndex: 1,
            shadowOffset: {width: 0, height: 0},
            shadowOpacity: 0.4
        }, {opacity: 1}]}>
            <IconButton nameIcon={'ios-arrow-back-outline'}
                        onClick={onClickBack}
                        iconStyle={{
                            fontSize: global.sizeP35,
                            color: global.colorFF
                        }}
                        btnStyle={{
                            height: 35,
                            width: 40,
                            backgroundColor: 'transparent',
                            alignItems: 'center',
                            justifyContent: 'center',
                            elevation: 1,
                            zIndex: 2
                        }}/>
            <Text text={heading} color={global.colorFF} size={global.sizeP20}/>
            <RoundAvatar size={'tiny'}
                         style={{marginRight: 10}}
                         canClick={false}
                         icSrc={url}/>
        </View>) : (
            <View style={[{
                justifyContent: 'space-between',
                flexDirection: 'row',
                padding: 10,
                height: height / 10,
            }, styleHeader]}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text text={date}
                          color={global.colorA5}
                          size={global.sizeP20}/>
                    <Text text={heading}
                          style={{fontWeight: '700'}}
                          color={global.colorFF}
                          size={global.sizeP25}/>
                </View>
                <RoundAvatar size={'small'}
                             canClick={false}
                             icSrc={url}/>
            </View>
        );
    }
}

Header.defaultProps = {
    heading: '',
    date: '',
    isMain:false
};
Header.propTypes = {
    url:PropTypes.string,
    isMain:PropTypes.bool,
    onClickBack:PropTypes.func,
    heading: PropTypes.string,
    date: PropTypes.string,
    styleHeader: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),

};

export default Header;


