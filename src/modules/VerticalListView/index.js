import React, {Component} from 'react';
import {View, Dimensions,FlatList} from 'react-native';
import styles from './styles';
import global from "../../themes/global";
import PropTypes from "prop-types";

const {height, width} = Dimensions.get('window');

class VerticalListView extends Component {
    render() {
        const {data, renderItem,style,num,horizontal} = this.props;
        return (
            <FlatList
                {...this.props}
                style={[{flex:1}, style]}
                data={data}
                scrollEventThrottle={1}
                removeClippedSubviews={false}
                nestedScrollEnabled={true}
                horizontal={horizontal}
                numColumns={num === 2 ? 2 : 1}
                automaticallyAdjustContentInsets={true}
                extraData={this.props}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}/>
        );
    }
}

VerticalListView.defaultProps = {
    data: [],
    horizontal: false
};
VerticalListView.propTypes = {
    num: PropTypes.number,
    data: PropTypes.array,
    renderItem: PropTypes.func,
    horizontal:PropTypes.bool,
    style: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
};

export default VerticalListView;


