import React, {Component} from 'react';
import {View, LayoutAnimation, Dimensions,ScrollView} from 'react-native';
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

const {height, width} = Dimensions.get('window');

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: STRING.HEADER.ROUTE_DISCOVER[0].id,
            routes: STRING.HEADER.ROUTE_DISCOVER,
        };
        this._onIndexChange = this._onIndexChange.bind(this);
        this.renderScene = this.renderScene.bind(this);
    }

    renderScene() {
        const {data, isLoading} = this.props;
        switch (this.state.index) {
            case 1:
                return (
                    <View style={{flex: 1, marginTop: 10}}>
                        <WrapperView heading={'Nổi bật'}
                                     children={
                                         <CarouselView
                                             showsPagination
                                             data={data}
                                             renderItem={({item,index})=>
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
                                             data={data}
                                             renderItem={({item,index})=>
                                                 <ItemMovieNew item={item}/>
                                             }/>}
                        />
                        <WrapperView heading={'Thể loại'}
                                     isShowAll
                                     children={
                                         <VerticalGirdView
                                             ItemSeparatorComponent={() => <View
                                                 style={{
                                                     height: 10,
                                                     width: "100%",
                                                 }}
                                             />}
                                             data={data}
                                             renderItem={({item,index})=>
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
                                             data={data}
                                             renderItem={({item,index})=>
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
                                             data={data}
                                             renderItem={({item,index})=>
                                                 <ItemMovieNew item={item}/>
                                             }/>}
                        />
                        <WrapperView heading={'Thể loại'}
                                     isShowAll
                                     children={
                                         <VerticalGirdView
                                             ItemSeparatorComponent={() => <View
                                                 style={{
                                                     height: 10,
                                                     width: "100%",
                                                 }}
                                             />}
                                             data={data}
                                             renderItem={({item,index})=>
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
                                             data={data}
                                             renderItem={({item,index})=>
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
                                             data={data}
                                             renderItem={({item,index})=>
                                                 <ItemMovieNew item={item}/>
                                             }/>}
                        />
                        <WrapperView heading={'Thể loại'}
                                     isShowAll
                                     children={
                                         <VerticalGirdView
                                             ItemSeparatorComponent={() => <View
                                                 style={{
                                                     height: 10,
                                                     width: "100%",
                                                 }}
                                             />}
                                             data={data}
                                             renderItem={({item,index})=>
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
                                             data={data}
                                             renderItem={({item,index})=>
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
                                             data={data}
                                             renderItem={({item,index})=>
                                                 <ItemMovieNew item={item}/>
                                             }/>}
                        />
                        <WrapperView heading={'Thể loại'}
                                     isShowAll
                                     children={
                                         <VerticalGirdView
                                             ItemSeparatorComponent={() => <View
                                                 style={{
                                                     height: 10,
                                                     width: "100%",
                                                 }}
                                             />}
                                             data={data}
                                             renderItem={({item,index})=>
                                                 <ItemGenres item={item}/>
                                             }/>}
                        />
                    </View>
                );
            default:
                return null;
        }
    }

    _onIndexChange(item) {
        this.props.getTopMovie.fetchingDataTopMovieByCategory('Phim lẻ');
        LayoutAnimation.easeInEaseOut();
        this.setState({index: item.id});
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: global.backgroundColor}}>
                <Header date={'Sunday, Sep 16, 2018'}
                        heading={STRING.HEADER.NAME.DISCOVER}/>
                <TabItems
                    routes={this.state.routes}
                    onIndexChange={this._onIndexChange}
                    selectedTabItem={this.state.index}
                    isUpperCase
                    numTab={4}
                    styleText={{fontSize: global.sizeP14, fontWeight: '700'}}
                    styleTab={{
                        height: height / 18,
                        width: width,
                    }}
                />
                <View style={{flex: 1, marginRight: 10, marginLeft: 10}}>
                    <ScrollView style={{flex:1}} >
                        {this.renderScene()}
                    </ScrollView>
                </View>
            </View>
        );
    }
}



