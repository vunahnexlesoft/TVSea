import React, {Component} from 'react';
import {View, Dimensions, Animated} from 'react-native';
import styles from './styles';
import Text from '../../commons/Text/Text';
import global from "../../themes/global";
import IconButton from "../../commons/Button/IconButton";
import PropTypes from "prop-types";
import moment from 'moment';
import RoundAvatar from "../../commons/Avatar/RoundAvatar";
const {height, width} = Dimensions.get('window');
class Header extends Component{
    render(){
        const {heading,styleHeader}=this.props;
        let date = moment(new Date()).format("dddd, MMM DD, YYYY");
        return (
                <View style={[{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    padding: 10,
                    height: height / 10,
                },styleHeader]}>
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
                                 icSrc={'https://scontent.fsgn5-2.fna.fbcdn.net/v/t1.0-9/29197246_2062594664016900_292927065248317668_n.jpg?_nc_cat=107&oh=0582839f39e11a69ab0f4ebe2c9b8ea1&oe=5C6341A6'}/>
                        {/*<IconButton nameIcon={'ios-contact'}*/}
                                    {/*iconStyle={{*/}
                                        {/*fontSize: height / 14,*/}
                                        {/*color: global.borderLeftColor,*/}
                                        {/*alignSelf: 'center'*/}
                                    {/*}}/>*/}
                </View>
        );
    }
}
Header.defaultProps = {
    heading: '',
    date: '',
};
Header.propTypes = {
    heading: PropTypes.string,
    date: PropTypes.string,
    styleHeader: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),

};

export default Header;


