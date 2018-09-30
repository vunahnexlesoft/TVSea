import React, {Component} from 'react';
import {View, Dimensions,FlatList} from 'react-native';
import styles from './styles';
import global from "../../themes/global";
import PropTypes from "prop-types";

const {height, width} = Dimensions.get('window');

class VerticalGirdView extends Component {
    render() {
        const {data, renderItem,style, numColumns} = this.props;
        return (
            <FlatList
                {...this.props}
                style={style}
                data={data}
                scrollEventThrottle={1}
                removeClippedSubviews={true}
                nestedScrollEnabled={true}
                horizontal={false}
                numColumns={numColumns}
                automaticallyAdjustContentInsets={true}
                extraData={this.props}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}/>
        );
    }
}

VerticalGirdView.defaultProps = {
    data: [],
    numColumns: 2
};
VerticalGirdView.propTypes = {
    numColumns: PropTypes.number,
    data: PropTypes.array,
    renderItem: PropTypes.func,
    style: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
};

export default VerticalGirdView;


