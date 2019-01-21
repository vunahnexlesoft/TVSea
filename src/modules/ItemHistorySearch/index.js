import React, {Component} from 'react';
import {View, Dimensions, TouchableOpacity} from 'react-native';
import styles from './styles';
import Text from '../../commons/Text/Text';
import global from "../../themes/global";
import PropTypes from "prop-types";
import Divide from "../../commons/Divide";
import IconButton from "../../commons/Button/IconButton";

const {height, width} = Dimensions.get('window');

class ItemHistorySearch extends Component {
    render() {
        const {item, onClick,style,onClickCloseButton} = this.props;
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
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', flex:1,alignItems:'center'}}>
                        <Text text={item}
                              size={global.sizeP15}
                              style={{fontWeight: '500'}}
                              color={global.colorFF}/>
                        <IconButton onClick={onClickCloseButton} nameIcon={'md-close'} btnStyle={{height: global.sizeP25,marginRight:5}} hitSlop={{top:35, bottom:35, right:35, left:35}} iconStyle={{fontSize:global.sizeP25,lineHeight:global.sizeP25, color: global.borderRightColor}}/>
                    </View>

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
    onClickCloseButton: PropTypes.func,
    style: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),

};

export default ItemHistorySearch;


