import React, {Component} from 'react';
import {View, LayoutAnimation, Dimensions, ScrollView, Animated, Platform, StatusBar, Image} from 'react-native';
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
import * as restClient from "../../services/restClient";
import * as UTIL_FUCTION from "../../util";
import TextSingleInput from "../../commons/TextInput/TextSingleInput";
import ItemHistorySearch from "../../modules/ItemHistorySearch";
import EmptyView from "../../modules/EmptyView";
import ItemMovieCategory from "../../modules/ItemMovieCategory"
import SkypeIndicator from "react-native-indicators/src/components/skype-indicator/index";
import RoundAvatar from "../../commons/Avatar/RoundAvatar";
import Swiper from "../../commons/Swipe/Swiper";
import localImage from "../../themes/localImage";
import IconButton from "../../commons/Button/IconButton";

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
            isOpen: false,
        };
        this.scrollY = new Animated.Value(0);
        this.renderScene = this.renderScene.bind(this);
        this._navigateToDetail = this._navigateToDetail.bind(this);
    }

    componentDidMount() {
        const {moviesAction: {getDataTopMovie, getAllDataGenres, getDataMoviebyCategory}, usersAction: {getDataUserHistoryMovie, getDataUserLikeMovie,getDataRelatedMovie}, userInfo} = this.props;

        getDataTopMovie({page: 1, size: 6, category: 'Phim le'});

        getDataMoviebyCategory({page: 1, size: 5, category: 1});
        getDataMoviebyCategory({page: 1, size: 5, category: 2});
        getDataMoviebyCategory({page: 1, size: 5, category: 4});

        getAllDataGenres({page: 1, size: 100});
        getDataUserHistoryMovie({id: userInfo.id});
        getDataUserLikeMovie({id: userInfo.id});

        if(userInfo.id_movie_history){
            getDataRelatedMovie({idMovie: userInfo.id_movie_history})
        }
    }

    _navigateToDetail(movie) {
        //{type: LIKE : HISTORY, actionType: ADD : REMOVE, MOVIE : DATAMOVIE , PARAMS: IDUSER, IDMOVIE, KEY: 1 HISTORY, 2 LIKE}
        let data = {
            movie,
            type: 'HISTORY',
            actionType: 'ADD',
            params: {
                idMovie: movie.id,
                idUser: this.props.userInfo.id,
                Key: 1
            }
        };
        UTIL_FUCTION.navigateToDetail(this.props.usersAction, this.props.navigation, data);
    }

    renderScene() {
        const {dataTopMovie, dataAllGenres, isAllGenresLoading, recommendData, userInfo,dataPhimle,dataPhimbo,dataAnime} = this.props;
        return (
            <View style={{
                backgroundColor: global.backgroundColor,
                flex: 1,
                marginTop: 10,
                paddingLeft: 10,
                paddingRight: 10,
                zIndex: 1
            }}>
                <WrapperView heading={'Nổi bật'}
                             children={
                                 <CarouselView
                                     keyAccess={1}
                                     loop={true}
                                     autoplay={true}
                                     autoplayDelay={1000}
                                     loopClonesPerSide={2}
                                     autoplayInterval={3000}
                                     showsPagination
                                     data={dataTopMovie}
                                     renderItem={({item, index}) =>
                                         <HighlightCarouselItem item={item}
                                                                onClick={() => this._navigateToDetail(item)}/>
                                     }/>}
                />
                {
                    recommendData.length > 0 ?  <WrapperView heading={'Có thể bạn thích'}
                                                             isShowAll
                                                             onClickViewAll={() => UTIL_FUCTION.navigateToViewAll(null,this.props.navigation,{heading: 'Recommend', type:'RECOMMEND'})}
                                                             children={
                                                                 <VerticalListView
                                                                     horizontal={true}
                                                                     ItemSeparatorComponent={() => <View
                                                                         style={{
                                                                             width: 15,
                                                                         }}
                                                                     />}
                                                                     data={recommendData}
                                                                     renderItem={({item, index}) =>
                                                                         <ItemMovieCategory item={item}
                                                                                            onClick={() => this._navigateToDetail(item)}/>
                                                                     }/>}
                    /> : null
                }
                <WrapperView heading={'Phim mới cập nhật'}
                             onClickViewAll={() => {
                                 UTIL_FUCTION.navigateToViewAll(null,this.props.navigation,{heading: 'Phim Mới',type:'PHIM_MOI'})}}
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
                                         <ItemMovieNew item={item}
                                                       disabledClick
                                                       disabledSwipe
                                                       onClickDetail={() => this._navigateToDetail(item)}
                                                       onClick={() => this._navigateToDetail(item)}/>
                                     }/>}
                />
                <WrapperView heading={'Phim lẻ hay'}
                             isShowAll
                             onClickViewAll={() => UTIL_FUCTION.navigateToViewAll(null,this.props.navigation,{heading: 'Phim Lẻ', type:'PHIM_LE'})}
                             children={
                                 <VerticalListView
                                     horizontal={true}
                                     ItemSeparatorComponent={() => <View
                                         style={{
                                             width: 15,
                                         }}
                                     />}
                                     data={dataPhimle}
                                     renderItem={({item, index}) =>
                                         <ItemMovieCategory item={item}
                                                            onClick={() => this._navigateToDetail(item)}/>
                                     }/>}
                />
                <WrapperView heading={'Phim bộ 2018'}
                             isShowAll
                             onClickViewAll={() => UTIL_FUCTION.navigateToViewAll(null,this.props.navigation,{heading: 'Phim Bộ',type:'PHIM_BO'})}
                             children={
                                 <VerticalListView
                                     horizontal={true}
                                     ItemSeparatorComponent={() => <View
                                         style={{
                                             width: 15,
                                         }}
                                     />}
                                     data={dataPhimbo}
                                     renderItem={({item, index}) =>
                                         <ItemMovieCategory item={item}
                                                            onClick={() => this._navigateToDetail(item)}/>
                                     }/>}
                />

                <Image source={localImage.posterAvd} style={{marginTop: 15, height: height / 6, width: width - 20}}/>

                <WrapperView heading={'Phim hoạt hình'}
                             isShowAll
                             onClickViewAll={() => UTIL_FUCTION.navigateToViewAll(null,this.props.navigation,{heading: 'Phim Hoạt Hình',type:'ANIME'})}
                             children={
                                 <VerticalListView
                                     horizontal={true}
                                     ItemSeparatorComponent={() => <View
                                         style={{
                                             width: 15,
                                         }}
                                     />}
                                     data={dataAnime}
                                     renderItem={({item, index}) =>
                                         <ItemMovieCategory item={item}
                                                            onClick={() => this._navigateToDetail(item)}/>
                                     }/>}
                />
                <WrapperView heading={'Thể loại'}
                             isShowAll
                             onClickViewAll={() => UTIL_FUCTION.navigateToViewAll(null,this.props.navigation,{heading: 'Thể loại',type:'GENRES'})}
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
                                     renderItem={({item, index}) =>{
                                         return index < 9 ? (
                                             <ItemGenres item={item} onClick={() => UTIL_FUCTION.navigateToViewAll(null,this.props.navigation,{heading: item.name_genre, type:'GENRE', id: item.id})}/>
                                         ) : null
                                     }
                                     }/>}
                />
            </View>
        );
    }

    render() {
        const {dataTopMovie, dataAllGenres, isAllGenresLoading} = this.props;
        const Opacity = this.scrollY.interpolate({
            inputRange: [0, 60, 70],
            outputRange: [0, 0.5, 1],
            extrapolate: 'clamp',
        });
        return (
            <View style={{flex: 1, backgroundColor: global.backgroundColor23}}>
                <Animated.View style={[{
                    elevation: 2,
                    shadowColor: "#000",
                    backgroundColor: global.backgroundColor23,
                    paddingTop: 7,
                    paddingBottom: 7,
                    paddingLeft:10, paddingRight:10,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection:'row',
                    position: 'absolute',
                    top: 0, right: 0, left: 0,
                    zIndex: 1,
                    shadowOffset: {width: 2, height: 2},
                    shadowOpacity: 0.4
                }, {opacity: Opacity}]}>
                    <IconButton btnStyle={{height: height/22}}
                                hitSlop={{top:35, left:35, bottom:35,right:35}}
                                iconStyle={{fontSize:height / 20, color:global.colorA5}}
                                nameIcon={'ios-search'} onClick={() => this.props.navigation.navigate('Search')}/>
                    <TextComponent text={STRING.HEADER.NAME.DISCOVER} color={global.colorFF} size={global.sizeP20} style={{lineHeight:global.size20}}/>
                    <RoundAvatar size={'tiny'}
                                 // style={{
                                 //     position: 'absolute',
                                 //     top: 13 / 2, right: 10
                                 // }}
                                 canClick={false}
                                 icSrc={this.props.userInfo.url_avatar}/>
                </Animated.View>
                <Animated.ScrollView
                    scrollEventThrottle={1}
                    overScrollMode={'never'}
                    removeClippedSubview={true}
                    style={{flex: 1, backgroundColor: global.backgroundColor}}
                    onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {y: this.scrollY}}}],
                        {useNativeDriver: true}
                    )} showsVerticalScrollIndicator={false}>
                    <Header heading={STRING.HEADER.NAME.DISCOVER} url={this.props.userInfo.url_avatar}/>
                    {
                        dataTopMovie.length > 0 ?
                            this.renderScene() : <SkypeIndicator color={global.yellowColor}/>
                    }
                </Animated.ScrollView>
            </View>
        );
    }
}



