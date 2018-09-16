import React, {Component} from 'react';
import {View, Dimensions,Platform} from 'react-native';
import styles from './styles';
import global from "../../themes/global";
import PropTypes from "prop-types";
import Carousel, { Pagination } from "react-native-snap-carousel";
const {height, width} = Dimensions.get('window');
class CarouselView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
        };
        this._renderPagination = this._renderPagination.bind(this);
    }
    _renderPagination(data, index) {
        return (
            <Pagination
                dotsLength={data.length}
                activeDotIndex={index}
                containerStyle={{paddingVertical: 8,paddingHorizontal: 10}}
                dotStyle={{backgroundColor: global.yellowColor,
                    width: 7,
                    height: 7,
                    borderRadius: 3.5,
                    marginTop: 5,}}
                inactiveDotStyle={{backgroundColor: global.colorFF,
                    width: 7,
                    height: 7,
                    borderRadius: 3.5,
                    marginTop: 5,}}
                inactiveDotOpacity={1}
                inactiveDotScale={1}
            />
        );
    }
    render(){
        const {data,showsPagination,renderItem}=this.props;
        return (
            <View style={{flex:1}}>
                <Carousel
                    {...this.props}
                    data={data}
                    renderItem={renderItem}
                    useScrollView
                    onSnapToItem={(index) => this.setState({index})}
                    containerCustomStyle={{flex:1}}
                    contentContainerCustomStyle={{alignItems:'center'}}
                    //inactiveSlideScale={0.9}
                    //inactiveSlideOpacity={1}
                    sliderWidth={Math.round((100 * width) / 100)}
                    itemWidth={width - 50}
                />
                {
                    showsPagination ? this._renderPagination(data, this.state.index) : null
                }
            </View>
        );
    }
}
CarouselView.defaultProps = {
    data: [],
    showsPagination: false
};
CarouselView.propTypes = {
    data: PropTypes.array,
    showsPagination: PropTypes.bool,
    renderItem: PropTypes.func,
};

export default CarouselView;


