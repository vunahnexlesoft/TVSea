import React, {Component} from 'react';
import {View, Dimensions, ScrollView, Animated, Platform, StatusBar, LayoutAnimation, UIManager} from 'react-native';
import global from "../../themes/global";
import PropTypes from "prop-types";
import Video from 'react-native-video';
import localImage from '../../themes/localImage'
import IconButton from "../../commons/Button/IconButton";
import TextComponent from "../../commons/Text/Text";
import FastImage from "react-native-fast-image";
import ButtonWithIcon from "../../commons/Button/ButtonWithIcon";
import moment from "moment";
import ItemGenres from "../../modules/ItemGenres";
import VerticalGirdView from "../../modules/VerticalGirdView";
import ItemMovieNew from "../../modules/ItemMovieNew";
import VerticalListView from "../../modules/VerticalListView";
import RoundAvatar from "../../commons/Avatar/RoundAvatar";
import SearchView from "../SearchView";
import WrapperView from "../../modules/WrapperView";
import ItemChannel from "../../modules/ItemChannel";
import * as STRING from "../../themes/string";
import {dataFetchingCategory} from "../../redux/ActionCreator/actionMovieCreator";
import EmptyView from "../../modules/EmptyView";
import MovieDescriptionView from "../../modules/MovieDescriptionView";
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
} from 'react-native-indicators';
import TabItems from "../../modules/TabItems";
import ReviewModal from "../../modules/ReviewModal";
import ItemReview from "../../modules/ItemReview";
import * as UTIL_FUCTION from "../../util";

const {height, width} = Dimensions.get('window');
const statusBarHeight = Platform.select({
    ios: 24,
    android: StatusBar.currentHeight
});
const HEADER_MAX_HEIGHT = height / 2 + 85;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const headerHeight = 84 - statusBarHeight;
const FastImageAnimated = Animated.createAnimatedComponent(FastImage);
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

class MoviesDetailView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowHeader: false,
            idMovie: this.props.dataDetail.info ? this.props.dataDetail.info.id : null
        };
        this.onGoBack = this.onGoBack.bind(this);
        this._renderHeader = this._renderHeader.bind(this);
        this._renderDescription = this._renderDescription.bind(this);
        this._renderSubDescription = this._renderSubDescription.bind(this);
        this._onClickToLike = this._onClickToLike.bind(this);
        this._renderHeading = this._renderHeading.bind(this);
        this._onGotoRelated = this._onGotoRelated.bind(this);
        this._onAddComment = this._onAddComment.bind(this);
        this._onGotoReview = this._onGotoReview.bind(this);
        this._navigateVideo = this._navigateVideo.bind(this);
        this._onClickToWatchList = this._onClickToWatchList.bind(this);
        this.nScroll = new Animated.Value(0);
    }

    componentDidMount() {
        const {moviesAction: {getDataDetailMovieByID, getDataRelatedMovie}} = this.props;
        const {movie} = this.props.navigation.state.params;
        getDataDetailMovieByID({id: movie.id});
    }

    onGoBack() {
        const {
            moviesAction: {getDataDetailMovieByID, getDataRelatedMovie, resetStateDataMovies}, navigation, navigateState
        } = this.props;
        let removeFromArray = [...navigateState];
        if (removeFromArray.length > 0) {
            let index = removeFromArray.indexOf(this.state.idMovie);
            removeFromArray.splice(index, 1);
            resetStateDataMovies({key: 'navigateState', value: removeFromArray});
        } else {
            resetStateDataMovies({key: "detail", value: {data: [], isLoading: false, isError: false}});
        }
        navigation.pop();
    }

    _onGotoRelated(item) {
        const {
            moviesAction: {getDataDetailMovieByID, getDataRelatedMovie, resetStateDataMovies}, navigation, navigateState
        } = this.props;
        let navArr = [...navigateState];
        resetStateDataMovies({key: 'navigateState', value: navArr.concat(item.id)});
        navigation.push('MoviesDetail', {movie: item});
    }

    _onClickToLike() {
        const {
            userInfo,
            usersAction,
            dataLike,
            dataDetail: {
                info,
                language,
            }, dataDetail, isDetailLoading, isDetailError, dataRecommend, isRecommendLoading, isRecommendError
        } = this.props;
        let check = !!dataDetail && !!dataDetail.info && dataLike.map((e) => {
            return e.id
        }).indexOf(info.id) <= -1;
        let data = {
            movie: info,
            type: 'LIKE',
            actionType: check ? 'ADD' : 'REMOVE',
            params: {
                idMovie: info.id,
                idUser: userInfo.id,
                Key: 2
            }
        };
        usersAction.addUserHistoryMovies(data);
    }
    _onClickToWatchList() {
        const {
            userInfo,
            usersAction,
            dataLike,
            dataWatchList,
            dataDetail: {
                info,
                language,
            }, dataDetail, isDetailLoading, isDetailError, dataRecommend, isRecommendLoading, isRecommendError
        } = this.props;
        let check = !!dataDetail && !!dataDetail.info && dataWatchList.map((e) => {
            return e.id
        }).indexOf(info.id) <= -1;
        let data = {
            movie: info,
            type: 'WATCHLIST',
            actionType: check ? 'ADD' : 'REMOVE',
            params: {
                idMovie: info.id,
                idUser: userInfo.id,
                Key: 3
            }
        };
        usersAction.addUserHistoryMovies(data);
    }

    _onAddComment(dataComment) {
        const {
            userInfo,
            moviesAction: {updateCommentMovie}, dataDetail: {
                info
            }
        } = this.props;
        let date = new Date();
        let data = {
            actionType: 'ADD',
            data: {
                comment: dataComment.comment,
                date: date,
                display_name: userInfo.display_name,
                id_movie: info.id,
                id_user: userInfo.id,
                rate: dataComment.rate,
                url_avatar: userInfo.url_avatar
            },
            params: {
                idMovie: info.id,
                idUser: userInfo.id,
                rate: dataComment.rate,
                comment: dataComment.comment
            }
        };
        updateCommentMovie(data);
    }

    _onGotoReview() {
        const {
            moviesAction: {updateCommentMovie}, dataDetail: {
                info, comment
            }, userInfo
        } = this.props;
        let {note, rating} = '';
        comment.map((item, index) => {
            if (item.id_user === userInfo.id) {
                note = item.comment;
                rating = item.rate;
            }
        });
        console.log(note, rating);
        this.refs.modalReview.openModal({note, rating})
    }
    _navigateVideo(item){
        this.props.navigation.navigate('Video', {
            host: item.url_link,//STRING.VAR.VIDEO_DEFAULT,
            type: "on-demend"
        })
    }
    _renderHeader() {
        const {
            dataLike,
            usersAction,
            dataDetail: {
                info,
                language,
            }, dataDetail, isDetailLoading, isDetailError, dataRecommend, isRecommendLoading, isRecommendError
        } = this.props;
        let {backdrop_path} = this.props.navigation.state.params.movie;
        const imageOpacity = this.nScroll.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [1, 0, 0],
            extrapolate: 'clamp',
        });
        const imageTranslate = this.nScroll.interpolate({
            inputRange: [0, height / 3 - 35 / 2],
            outputRange: [0, height / 3 - 35 / 2],
            extrapolate: 'clamp',
        });
        return (
            <Animated.View style={{
                flex: 1,
                zIndex: 2,
                opacity: imageOpacity, transform: [{translateY: imageTranslate}],
                height: height / 3 + 40 / 2,
            }}>
                <Animated.View style={{
                    height: height / 3,
                    width: null,
                    backgroundColor: global.transparentBlack3,
                    flex: 1,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1,

                }}/>
                <FastImageAnimated
                    resizeMode={FastImage.resizeMode.cover}
                    style={{
                        height: height / 3,
                        width: null,
                        zIndex: 0,
                    }}
                    source={{
                        uri: backdrop_path,
                        priority: FastImage.priority.normal,
                    }}/>
                <Animated.View style={{
                    position: 'absolute', top: height / 3 / 2 - 20,
                    left: width / 2 - 10,
                    alignSelf: 'center',
                    flex: 1,
                    zIndex: 3
                }}>
                    <IconButton nameIcon={'ios-play'}
                                onClick={this._navigateVideo.bind(this, info)}
                                hitSlop={{top:35, bottom:35, left:35, right:35}}
                                iconStyle={{
                                    fontSize: global.sizeP45,
                                    color: global.colorFF
                                }}

                                btnStyle={{
                                    backgroundColor: 'transparent',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    elevation: 1,
                                    zIndex: 3
                                }}/>
                </Animated.View>
            </Animated.View>
        );
    }

    _renderHeading() {
        const {
            dataLike,
            dataWatchList,
            usersAction,
            dataDetail: {
                info,
                language,
            }, dataDetail, isDetailLoading, isDetailError, dataRecommend, isRecommendLoading, isRecommendError
        } = this.props;
        let {title, overview, backdrop_path} = this.props.navigation.state.params.movie;
        let check = !!dataDetail && !!dataDetail.info && dataLike.map((e) => {
            return e.id
        }).indexOf(info.id) <= -1;
        let checkWatch = !!dataDetail && !!dataDetail.info && dataWatchList.map((e) => {
            return e.id
        }).indexOf(info.id) <= -1;
        const imageTranslate = this.nScroll.interpolate({
            inputRange: [0, height / 3 - 35 / 2 - 5],
            outputRange: [height / 3 - 35 / 2 - 5, 0],
            extrapolate: 'clamp',
        });
        const textOpacity = this.nScroll.interpolate({
            inputRange: [0, height / 3 - 35 / 2],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        });
        return Object.keys(dataDetail).length > 0 ? (
            <Animated.View style={[{
                backgroundColor: this.state.isShowHeader ? global.backgroundColor : 'transparent',
                paddingLeft: 5,
                paddingRight: 5,
                zIndex: 3,
                padding: 5,
                flex: 1,
                alignItems: 'center',
                flexDirection: 'row',
                width: width,
                elevation: this.state.isShowHeader ? 1 : 0,
                shadowColor: "#000",
                shadowOffset: {width: 0, height: 0},
                shadowOpacity: 0.3,
                justifyContent: 'space-between',
                position: 'absolute', top: 0
            }, {
                transform: [
                    {translateY: imageTranslate},
                ],
            }]}>
                <ButtonWithIcon nameIcon={'ios-arrow-back-outline'}
                                onClick={this.onGoBack}
                                icoStyle={{
                                    fontSize: this.state.isShowHeader ? global.sizeP30 : global.sizeP25,
                                    color: global.colorFF,
                                    margin: 0
                                }}
                                style={{
                                    height: 35,
                                    width: 45,
                                    borderRadius: 40 / 3,
                                    backgroundColor: this.state.isShowHeader ? null : global.transparentWhite50,
                                    borderColor: 'transparent',
                                    borderWidth: 0,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    paddingRight: 3,
                                    paddingTop: 2,
                                    zIndex: 2
                                }}/>
                <Animated.View style={{opacity: textOpacity, width: width - 150, alignItems:'center', paddingLeft:25}}>
                    <TextComponent text={title} size={global.sizeP18} color={global.colorFF} style={{textAlign: 'center'}}/>
                </Animated.View>
                <View style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                }}>
                    <IconButton nameIcon={'ios-list-box'}
                                onClick={this._onClickToWatchList}
                                iconStyle={{
                                    fontSize: global.sizeP35,
                                    color: checkWatch ? global.colorFF : global.yellowColor,
                                }}
                                btnStyle={{
                                    height: 35,
                                    width: 40,
                                    backgroundColor: 'transparent',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    elevation: 1,
                                    zIndex: 2
                                }}/>
                    <IconButton nameIcon={check ? 'ios-heart-outline' : 'ios-heart'}
                                onClick={this._onClickToLike}
                                iconStyle={{
                                    fontSize: global.sizeP35,
                                    color: check ? global.colorFF : global.orangeColor,
                                }}
                                btnStyle={{
                                    height: 35,
                                    width: 40,
                                    backgroundColor: 'transparent',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    elevation: 1,
                                    zIndex: 2
                                }}/>
                </View>
            </Animated.View>
        ) : null;
    }

    _renderDescription() {
        const {
            dataDetail: {
                info,
                language,
            }, dataDetail, isDetailLoading, isDetailError, dataRecommend, isRecommendLoading, isRecommendError
        } = this.props;
        let {title, overview, backdrop_path} = this.props.navigation.state.params.movie;
        let {partAndEpisode, releaseDate, languageAndRuntime, genreMovie, rating} = '';
        if (dataDetail && info) {
            rating = info.rating;
            partAndEpisode = info.part + "/" + info.episode_number;
            releaseDate = moment(info.release_date).format("DD/MM/YYYY");
            languageAndRuntime = language.map((e, i) => e.name_language + " ") + "- " + info.run_time;
        }
        return (
            <MovieDescriptionView title={title}
                                  rating={rating}
                                  overview={overview}
                                  languageAndRuntime={languageAndRuntime}
                                  releaseDate={releaseDate}
                                  partAndEpisode={partAndEpisode}/>
        )
    }

    _renderSubDescription() {
        const {
            dataDetail: {
                info,
                actor,
                director,
                genres,
                episodes,
                comment,
                related
            }, dataRecommend, isRecommendLoading, isRecommendError, userInfo
        } = this.props;
        let check = comment.map((e) => {
            return e.id_user
        }).indexOf(userInfo.id) > -1;
        return (
            <View style={{flex: 1}}>
                <WrapperView heading={'Số tập'}
                             styleHeading={{fontSize: global.sizeP16}}
                             children={
                                 <VerticalListView
                                     horizontal={true}
                                     data={episodes}
                                     renderItem={({item, index}) =>
                                         <ItemGenres key={index} onClick={this._navigateVideo.bind(this, item)} item={item} type={'detail'}/>
                                     }/>}/>
                <WrapperView heading={'Thể loại'}
                             styleHeading={{fontSize: global.sizeP16}}
                             children={
                                 <VerticalListView
                                     horizontal={true}
                                     data={genres}
                                     renderItem={({item, index}) =>
                                         <ItemGenres key={index} onClick={() => UTIL_FUCTION.navigateToViewAll(null,this.props.navigation,{heading: item.name_genre, type:'GENRE', id: item.id})} item={item} type={'detail'}/>
                                     }/>}/>
                <WrapperView heading={'Diễn viên'}
                             styleHeading={{fontSize: global.sizeP16}}
                             children={
                                 <VerticalListView
                                     horizontal={true}
                                     data={actor}
                                     renderItem={({item, index}) =>
                                         <View style={{flex: 1, margin: 5, alignItems: 'center'}}>
                                             <RoundAvatar style={{borderWidth: 0}}
                                                          icSrc={"https://i2.wp.com/www.ahfirstaid.org/wp-content/uploads/2014/07/avatar-placeholder.png"}/>
                                             <TextComponent text={item.name_people} color={global.colorFF}
                                                            style={{textAlign: 'center'}}
                                                            size={global.sizeP13}/>
                                         </View>
                                     }/>}/>
                <WrapperView heading={'Tác giả'}
                             styleHeading={{fontSize: global.sizeP16}}
                             children={
                                 <VerticalListView
                                     horizontal={true}
                                     data={director}
                                     renderItem={({item, index}) =>
                                         <View style={{flex: 1, margin: 5}}>
                                             <RoundAvatar style={{borderWidth: 0}}
                                                          icSrc={"https://i2.wp.com/www.ahfirstaid.org/wp-content/uploads/2014/07/avatar-placeholder.png"}/>
                                             <TextComponent text={item.name_people} color={global.colorFF}
                                                            size={global.sizeP13}/>
                                         </View>
                                     }/>}/>
                <WrapperView heading={'Đánh giá'}
                             styleHeading={{fontSize: global.sizeP16}}
                             isShowAll
                             onClickViewAll={() => UTIL_FUCTION.navigateToViewAll(null,this.props.navigation,{heading: 'Đánh giá', type:'COMMENT', id: info.id})}
                             children={
                                 <View style={{flex: 1}}>
                                     <View style={{
                                         padding: 5,
                                         alignItems: 'center',
                                         flexDirection: 'row',
                                         marginBottom: 10,
                                     }}>
                                         <RoundAvatar size={'small'}
                                                      canClick={false}
                                                      icSrc={this.props.userInfo.url_avatar}/>
                                         <ButtonWithIcon
                                             buttonText={check ? 'Xem đánh giá phim của bạn' : 'Đánh giá ngay....'}
                                             styleText={{fontSize: global.sizeP16}}
                                             onClick={this._onGotoReview}
                                             style={{
                                                 backgroundColor: 'transparent',
                                                 flex: 1,
                                                 paddingLeft: 13,
                                                 justifyContent: 'flex-start',
                                                 marginLeft: 10,
                                                 height: 40,
                                                 borderWidth: 1,
                                                 borderColor: global.darkBlue,
                                                 borderRadius: 20
                                             }}/>
                                     </View>
                                     <VerticalListView
                                         ItemSeparatorComponent={() => <View
                                             style={{
                                                 height: 10,
                                                 width: "100%",
                                             }}
                                         />}
                                         data={comment}
                                         renderItem={({item, index}) =>
                                             <ItemReview item={item}/>
                                         }/>
                                 </View>
                             }/>
                <WrapperView heading={'Phim liên quan'}
                             styleHeading={{fontSize: global.sizeP16}}
                             children={
                                 related.length > 0 ? (
                                         <VerticalGirdView data={related}
                                                           renderItem={({item, index}) =>
                                                               <ItemChannel uriImage={item.poster_path}
                                                                            type={'related'}
                                                                            text={item.title}
                                                                            onClick={this._onGotoRelated.bind(this, item)}/>
                                                           }/>) :
                                     <EmptyView nameIcon={'ios-pulse'} textDes={'Không có phim liên quan'}/>
                             }/>
            </View>
        );
    }

    _onScroll(event) {
        const currentOffset = event.nativeEvent.contentOffset.y;
        const onScrolling = currentOffset >= height / 3 - 35 / 2;
        if (
            onScrolling !== this.state.isShowHeader
        ) {
            LayoutAnimation.linear();
            this.setState({isShowHeader: onScrolling});
        }
    }

    render() {
        const {
            dataDetail: {
                info,
                language,
            }, dataDetail, isDetailLoading, isDetailError, dataRecommend, isRecommendLoading, isRecommendError
        } = this.props;
        console.log(dataDetail);
        const headerTranslate = this.nScroll.interpolate({
            inputRange: [0, height / 3 - 35 / 2 - 5],
            outputRange: [height / 3 - 35 / 2 - 5, 0],
            extrapolate: 'clamp',
        });
        console.log('dataWatchList',this.props.dataWatchList);
        return (
            <View style={{flex: 1, backgroundColor: global.backgroundColor}}>
                {this._renderHeading()}
                <Animated.ScrollView
                    scrollEventThrottle={1}
                    overScrollMode={'never'}
                    removeClippedSubview={true}
                    style={{flex: 1}}
                    onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {y: this.nScroll}}}],
                        {useNativeDriver: true, listener: this._onScroll.bind(this)}
                    )} showsVerticalScrollIndicator={false}>
                    {this._renderHeader()}
                    {
                        Object.keys(dataDetail).length > 0 ? <View
                            style={{
                                backgroundColor: global.backgroundColor,
                                paddingLeft: 10,
                                paddingRight: 10,
                                flex: 1,
                                zIndex: 3
                            }}>
                            {this._renderDescription()}
                            {this._renderSubDescription()}
                        </View> : <SkypeIndicator color={global.yellowColor}/>
                    }

                </Animated.ScrollView>
                <ReviewModal
                    {...this.props}
                    onAddComment={this._onAddComment}
                    styleModalPopupCustom={{backgroundColor: global.backgroundColor23, borderRadius: 10}}
                    ref={'modalReview'}
                />
            </View>

        );
    }
}

export default MoviesDetailView;


