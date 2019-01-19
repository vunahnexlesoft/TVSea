import React, {Component} from 'react';
import {View, Dimensions} from 'react-native';
import styles from './styles';
import Text from '../../commons/Text/Text';
import global from "../../themes/global";
import PropTypes from "prop-types";
import ButtonWithIcon from "../../commons/Button/ButtonWithIcon";

const {height, width} = Dimensions.get('window');
class WrapperView extends Component{
    render(){
        const {heading, children, isShowAll,styleHeading,onClickViewAll}=this.props;
        return (
            <View style={{flex:1, marginTop: 15, marginBottom:10}}>
                <View style = {{flexDirection:'row', justifyContent: 'space-between'}}>
                    <View style ={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{height: 8, width:8, borderRadius:4, backgroundColor: global.yellowColor, marginRight: 5, alignSelf: 'center'}}/>
                        <Text text={heading}
                                       size={global.sizeP20}
                                       style={[{fontWeight: '500'},styleHeading]}
                                       color={global.colorFF}/>
                    </View>
                    {
                        isShowAll ? <ButtonWithIcon buttonText={'Tất cả'}
                                                    onClick={onClickViewAll}
                                                    styleText={{fontSize: global.sizeP14}}
                                                    style={{backgroundColor:'transparent', height:null ,padding: 5}}/> : null
                    }
                </View>
                <View style={{flex:1,marginTop:15}}>
                    {children}
                </View>
            </View>
        );
    }
}
WrapperView.defaultProps = {
    heading: '',
    isShowAll: false,
};
WrapperView.propTypes = {
    heading: PropTypes.string,
    isShowAll: PropTypes.bool,
    children: PropTypes.object,
    onClickViewAll: PropTypes.func
};

export default WrapperView;


