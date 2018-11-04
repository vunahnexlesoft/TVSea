import React, {Component} from 'react';
import {View, Dimensions,Platform} from 'react-native';
import styles from './styles';
import global from "../../themes/global";
import PropTypes from "prop-types";
import Carousel, { Pagination } from "react-native-snap-carousel";
import Swiper from '../../commons/Swipe/Swiper';
import SkypeIndicator from "react-native-indicators/src/components/skype-indicator/index";
const {height, width} = Dimensions.get('window');
const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}
const slideHeight = viewportHeight * 0.36;
const slideWidth = wp(95);
const itemHorizontalMargin = wp(3);

const sliderWidth = viewportWidth;
const itemWidth = viewportWidth + itemHorizontalMargin;
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
        const {data,showsPagination,renderItem,keyAccess}=this.props;
        return (
            <View key= {keyAccess} style={{flex:1}}>
                <Carousel
                    {...this.props}
                    data={data}
                    inactiveSlideScale={0.9}
                    inactiveSlideOpacity={0.5}
                    useScrollView
                    renderItem={renderItem}
                    onSnapToItem={(index) => this.setState({index})}
                    containerCustomStyle={{flex:1,overflow: 'hidden'}}
                    contentContainerCustomStyle={{paddingVertical: 10}}
                    sliderWidth={width-20}
                    itemWidth={itemWidth}
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
    keyAccess:PropTypes.number
};

export default CarouselView;


