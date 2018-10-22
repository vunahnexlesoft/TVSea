import React, {Component} from 'react';
import {View, LayoutAnimation, Dimensions, ScrollView, Animated, Platform, StatusBar} from 'react-native';
import styles from './styles';
import global from "../../themes/global";
import * as STRING from '../../themes/string';
import Header from "../../modules/Header";
import TabItems from "../../modules/TabItems";
import VerticalListView from "../../modules/VerticalListView";
import ItemChannel from "../../modules/ItemChannel";
import VerticalGirdView from "../../modules/VerticalGirdView";
import TextComponent from "../../commons/Text/Text";
import ButtonWithIcon from "../../commons/Button/ButtonWithIcon";
import WrapperView from "../../modules/WrapperView";
import HighlightCarouselItem from "../../modules/HighlightCarouselItem";
import CarouselView from "../../modules/CarouselView";
import Carousel from "react-native-snap-carousel";
import ItemMovieNew from "../../modules/ItemMovieNew";
import ItemGenres from "../../modules/ItemGenres";
import ViewTabScrollAnimated from "../../modules/ViewTabScrollAnimated";

const HeaderAnimated = Animated.createAnimatedComponent(Header);

const {height, width} = Dimensions.get('window');
const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const statusBarHeight = Platform.select({
    ios: 24,
    android: StatusBar.currentHeight
});
const headerHeight = 84 - statusBarHeight;

export default class DiscoverView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: STRING.HEADER.ROUTE_DISCOVER[0].id,
            routes: STRING.HEADER.ROUTE_DISCOVER,
            isOpen: false
        };
        this.renderScene = this.renderScene.bind(this);
        this._onIndexChange = this._onIndexChange.bind(this);
    }

    componentDidMount() {
        const {moviesAction: {getDataTopMovie, getAllDataGenres}} = this.props;
        getDataTopMovie({page: 1, size: 6, category: 'Phim le'});
        getAllDataGenres({page: 1, size: 8});
    }

    _onIndexChange(item) {
        LayoutAnimation.easeInEaseOut();
        this.setState({index: item.id});
    }

    renderScene() {
        const {dataTopMovie, dataAllGenres, isAllGenresLoading} = this.props;
        console.log('aaa', isAllGenresLoading);
        switch (this.state.index) {
            case 1:
                return (
                    <View style={{flex: 1, marginTop: 10}}>
                        <WrapperView heading={'Nổi bật'}
                                     children={
                                         <CarouselView
                                             showsPagination
                                             data={dataTopMovie}
                                             renderItem={({item, index}) =>
                                                 <HighlightCarouselItem item={item} onClick={() => this.props.navigation.navigate('MoviesDetail',{movie: item})}/>
                                             }/>}
                        />
                        <WrapperView heading={'Phim mới cập nhật'}
                                     isShowAll
                                     children={
                                         <VerticalListView
                                             ItemSeparatorComponent={() => <View
                                                 style={{
                                                     height: 10,
                                                     width: "100%",
                                                 }}
                                             />}
                                             data={dataTopMovie}
                                             renderItem={({item, index}) =>
                                                 <ItemMovieNew item={item}  onClick={() => this.props.navigation.navigate('MoviesDetail',{movie: item})}/>
                                             }/>}
                        />
                        <WrapperView heading={'Thể loại'}
                                     isShowAll
                                     children={
                                         <VerticalGirdView
                                             numColumns={3}
                                             ItemSeparatorComponent={() => <View
                                                 style={{
                                                     height: 10,
                                                     width: "100%",
                                                 }}
                                             />}
                                             data={dataAllGenres}
                                             renderItem={({item, index}) =>
                                                 <ItemGenres item={item}/>
                                             }/>}
                        />
                    </View>
                );
            case 2:
                return (
                    <View style={{flex: 1, marginTop: 10}}>
                        <WrapperView heading={'Nổi bật'}
                                     children={
                                         <CarouselView
                                             showsPagination
                                             loop={true}
                                             data={dataTopMovie}
                                             renderItem={({item, index}) =>
                                                 <HighlightCarouselItem item={item}/>
                                             }/>}
                        />
                        <WrapperView heading={'Phim mới cập nhật'}
                                     isShowAll
                                     children={
                                         <VerticalListView
                                             ItemSeparatorComponent={() => <View
                                                 style={{
                                                     height: 10,
                                                     width: "100%",
                                                 }}
                                             />}
                                             data={dataTopMovie}
                                             renderItem={({item, index}) =>
                                                 <ItemMovieNew item={item}/>
                                             }/>}
                        />
                        <WrapperView heading={'Thể loại'}
                                     isShowAll
                                     children={
                                         <VerticalGirdView
                                             numColumns={3}
                                             ItemSeparatorComponent={() => <View
                                                 style={{
                                                     height: 10,
                                                     width: "100%",
                                                 }}
                                             />}
                                             data={dataAllGenres}
                                             renderItem={({item, index}) =>
                                                 <ItemGenres item={item}/>
                                             }/>}
                        />
                    </View>
                );
            case 3:
                return (
                    <View style={{flex: 1, marginTop: 10}}>
                        <WrapperView heading={'Nổi bật'}
                                     children={
                                         <CarouselView
                                             showsPagination
                                             loop={true}
                                             data={dataTopMovie}
                                             renderItem={({item, index}) =>
                                                 <HighlightCarouselItem item={item}/>
                                             }/>}
                        />
                        <WrapperView heading={'Phim mới cập nhật'}
                                     isShowAll
                                     children={
                                         <VerticalListView
                                             ItemSeparatorComponent={() => <View
                                                 style={{
                                                     height: 10,
                                                     width: "100%",
                                                 }}
                                             />}
                                             data={dataTopMovie}
                                             renderItem={({item, index}) =>
                                                 <ItemMovieNew item={item}/>
                                             }/>}
                        />
                        <WrapperView heading={'Thể loại'}
                                     isShowAll
                                     children={
                                         <VerticalGirdView
                                             numColumns={3}
                                             ItemSeparatorComponent={() => <View
                                                 style={{
                                                     height: 10,
                                                     width: "100%",
                                                 }}
                                             />}
                                             data={dataAllGenres}
                                             renderItem={({item, index}) =>
                                                 <ItemGenres item={item}/>
                                             }/>}
                        />
                    </View>
                );
            case 4:
                return (
                    <View style={{flex: 1, marginTop: 10}}>
                        <WrapperView heading={'Nổi bật'}
                                     children={
                                         <CarouselView
                                             showsPagination
                                             loop={true}
                                             data={dataTopMovie}
                                             renderItem={({item, index}) =>
                                                 <HighlightCarouselItem item={item}/>
                                             }/>}
                        />
                        <WrapperView heading={'Phim mới cập nhật'}
                                     isShowAll
                                     children={
                                         <VerticalListView
                                             ItemSeparatorComponent={() => <View
                                                 style={{
                                                     height: 10,
                                                     width: "100%",
                                                 }}
                                             />}
                                             data={dataTopMovie}
                                             renderItem={({item, index}) =>
                                                 <ItemMovieNew item={item}/>
                                             }/>}
                        />
                        <WrapperView heading={'Thể loại'}
                                     isShowAll
                                     children={
                                         <VerticalGirdView
                                             numColumns={3}
                                             ItemSeparatorComponent={() => <View
                                                 style={{
                                                     height: 10,
                                                     width: "100%",
                                                 }}
                                             />}
                                             data={dataAllGenres}
                                             renderItem={({item, index}) =>
                                                 <ItemGenres item={item}/>
                                             }/>}
                        />
                    </View>
                );
            default:
                return null;
        }
    }

    render() {
        return (
            <ViewTabScrollAnimated
                {...this.props}
                textHeader={STRING.HEADER.NAME.DISCOVER}
                textDate={'Sunday, Feb 5, 2018'}
                numTab={4}
                onIndexChange={this._onIndexChange}
                renderScene={this.renderScene()}
                routes={this.state.routes}
                index={this.state.index}/>
        );
    }
}



