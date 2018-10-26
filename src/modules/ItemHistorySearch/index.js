import React, {Component} from 'react';
import {View, Dimensions, TouchableOpacity} from 'react-native';
import styles from './styles';
import Text from '../../commons/Text/Text';
import global from "../../themes/global";
import PropTypes from "prop-types";
import Divide from "../../commons/Divide";

const {height, width} = Dimensions.get('window');

class ItemHistorySearch extends Component {
    render() {
        const {item, onClick,style} = this.props;
        console.log(item);
        return (
            <TouchableOpacity activeOpacity={0.8} style={[{flex: 1},style]} onPress={onClick}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{
                        height: 5,
                        width: 5,
                        borderRadius: 4,
                        backgroundColor: global.borderRightColor,
                        marginRight: 5,
                        alignSelf: 'center'
                    }}/>
                    <Text text={item}
                          size={global.sizeP15}
                          style={{fontWeight: '500'}}
                          color={global.colorFF}/>
                </View>
                <Divide/>
            </TouchableOpacity>
        );
    }
}

ItemHistorySearch.defaultProps = {
    item: '',
};
ItemHistorySearch.propTypes = {
    item: PropTypes.string,
    onClick: PropTypes.func,
    style: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),

};

export default ItemHistorySearch;


