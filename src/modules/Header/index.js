import React, {Component} from 'react';
import {View, Dimensions, Animated} from 'react-native';
import styles from './styles';
import Text from '../../commons/Text/Text';
import global from "../../themes/global";
import IconButton from "../../commons/Button/IconButton";
import PropTypes from "prop-types";

const {height, width} = Dimensions.get('window');
class Header extends Component{
    render(){
        const {date, heading,styleHeader}=this.props;
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
                        <IconButton nameIcon={'ios-contact'}
                                    iconStyle={{
                                        fontSize: height / 14,
                                        color: global.borderLeftColor,
                                        alignSelf: 'center'
                                    }}/>
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


