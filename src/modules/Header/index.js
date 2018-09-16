import React, {Component} from 'react';
import {View, Dimensions} from 'react-native';
import styles from './styles';
import Text from '../../commons/Text/Text';
import global from "../../themes/global";
import IconButton from "../../commons/Button/IconButton";
import PropTypes from "prop-types";

const {height, width} = Dimensions.get('window');
class Header extends Component{
    render(){
        const {date, heading}=this.props;
        return (
            <View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 10
                }}>
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
                                btnStyle={{flex:1, alignItems: 'center'}}
                                iconStyle={{
                                    fontSize: height / 14,
                                    color: global.borderLeftColor,
                                    alignSelf: 'center'
                                }}/>
                </View>
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
    onIndexChange: PropTypes.func,
    index: PropTypes.number,
    routes: PropTypes.array,
    renderScene: PropTypes.func
};

export default Header;


