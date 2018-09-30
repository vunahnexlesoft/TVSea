import React, {Component} from 'react';
import {View, Dimensions,Platform} from 'react-native';
import styles from './styles';
import global from "../../themes/global";
import PropTypes from "prop-types";
import Carousel, { Pagination } from "react-native-snap-carousel";
const {height, width} = Dimensions.get('window');
const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}
const slideHeight = viewportHeight * 0.36;
const slideWidth = wp(85);
const itemHorizontalMargin = wp(7);

const sliderWidth = viewportWidth;
const itemWidth = slideWidth + itemHorizontalMargin;
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
                    onSnapToItem={(index) => this.setState({index})}
                    containerCustomStyle={{flex:1,overflow: 'hidden'}}
                    //contentContainerCustomStyle={{alignItems:'center'}}
                    //containerCustomStyle={styles.slider}
                    activeSlideAlignment={'center'}
                    activeAnimationType={'spring'}
                    contentContainerCustomStyle={{paddingVertical: 10}}
                    inactiveSlideScale={0.9}
                    inactiveSlideOpacity={0.5}
                    sliderWidth={sliderWidth}
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
};

export default CarouselView;


