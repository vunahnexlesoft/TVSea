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
        };
        this.onGoBack = this.onGoBack.bind(this);
        this._renderHeader = this._renderHeader.bind(this);
        this._renderDescription = this._renderDescription.bind(this);
        this._renderSubDescription = this._renderSubDescription.bind(this);
        this._onClickToLike = this._onClickToLike.bind(this);
        this._renderHeading = this._renderHeading.bind(this);
        this.nScroll = new Animated.Value(0);

    }

    componentDidMount() {
        const {moviesAction: {getDataDetailMovieByID, getDataRelatedMovie}} = this.props;
        const {movie} = this.props.navigation.state.params;
        getDataDetailMovieByID({id: movie.id});
    }

    componentWillReceiveProps(nextProps) {
        const {
            moviesAction: {getDataDetailMovieByID, getDataRelatedMovie}, dataDetail: {
                info,
                actor,
                director,
                language,
                genres,
                episodes
            }, dataDetail, isDetailLoading, isDetailError, dataRecommend, isRecommendLoading, isRecommendError
        } = nextProps;
        if (!!genres && genres !== this.props.dataDetail.genres
            && !!actor && actor !== this.props.dataDetail.actor) {
            const params = {
                idMovie: info.id,
                Genres: genres.map((e, i) => {
                    return e.id
                }).join(","),
                Peoples: actor.map((e, i) => {
                    return e.id
                }).join(",")
            };
            getDataRelatedMovie(params);
        }
    }

    onGoBack() {
        const {
            moviesAction: {getDataDetailMovieByID, getDataRelatedMovie, resetStateDataMovies}, navigation
        } = this.props;
        resetStateDataMovies({key: "detail", value: {data: [], isLoading: false, isError: false}});
        navigation.pop();
    }

    _onClickToLike() {
        const {
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
                idUser: 1,
                Key: 2
            }
        };
        usersAction.addUserHistoryMovies(data);
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
                    position: 'absolute', top: height / 3 / 2 - 40 / 2,
                    left: width / 2 - 20,
                    alignSelf: 'center',
                    flex: 1,
                    zIndex: 3
                }}>
                    <ButtonWithIcon nameIcon={'ios-play-outline'}
                                    icoStyle={{fontSize: global.sizeP40, color: global.colorFF, margin: 0}}
                                    style={{
                                        height: 40,
                                        width: 50,
                                        borderRadius: 40 / 3,
                                        backgroundColor: global.transparentWhite2,
                                        borderWidth: 1,
                                        borderColor: global.colorFF,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        paddingLeft: 3,
                                        zIndex: 0
                                    }}/>
                </Animated.View>
            </Animated.View>
        );
    }

    _renderHeading() {
        const {
            dataLike,
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
                backgroundColor: this.state.isShowHeader ? '#232635' : 'transparent',
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
                <Animated.View style={{opacity: textOpacity}}>
                    <TextComponent text={title} size={global.sizeP18} color={global.colorFF}/>
                </Animated.View>
                <IconButton nameIcon={check ? 'ios-heart-outline' : 'ios-heart'}
                            onClick={this._onClickToLike}
                            iconStyle={{
                                fontSize: global.sizeP40,
                                color: check ? global.colorFF : global.yellowColor,
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
                actor,
                director,
                genres,
                episodes
            }, dataRecommend, isRecommendLoading, isRecommendError
        } = this.props;
        console.log(this.props.dataDetail);
        return (
            <View style={{flex: 1}}>
                <WrapperView heading={'Số tập'}
                             styleHeading={{fontSize: global.sizeP16}}
                             children={
                                 <VerticalListView
                                     horizontal={true}
                                     data={episodes}
                                     renderItem={({item, index}) =>
                                         <ItemGenres key={index} item={item} type={'detail'}/>
                                     }/>}/>
                <WrapperView heading={'Thể loại'}
                             styleHeading={{fontSize: global.sizeP16}}
                             children={
                                 <VerticalListView
                                     horizontal={true}
                                     data={genres}
                                     renderItem={({item, index}) =>
                                         <ItemGenres key={index} item={item} type={'detail'}/>
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
                             children={
                                 <View style={{flex: 1}}>
                                     <View style={{
                                         padding:5,
                                         alignItems: 'center',
                                         flexDirection: 'row',
                                         marginBottom: 10,
                                     }}>
                                         <RoundAvatar size={'small'}
                                                      canClick={false}
                                                      icSrc={'https://scontent.fsgn5-2.fna.fbcdn.net/v/t1.0-9/29197246_2062594664016900_292927065248317668_n.jpg?_nc_cat=107&oh=0582839f39e11a69ab0f4ebe2c9b8ea1&oe=5C6341A6'}/>
                                         <ButtonWithIcon buttonText={'Chia sẻ của bạn....'}
                                                         styleText={{fontSize: global.sizeP16}}
                                                         onClick={() => this.refs.modalReview.openModal()}
                                                         style={{
                                                             backgroundColor: 'transparent',
                                                             flex:1,
                                                             paddingLeft:13,
                                                             justifyContent:'flex-start',
                                                             marginLeft:10,
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
                                             data={director}
                                             renderItem={({item, index}) =>
                                                 <ItemReview item={item}/>
                                             }/>
                                 </View>
                             }/>
                <WrapperView heading={'Phim liên quan'}
                             styleHeading={{fontSize: global.sizeP16}}
                             children={
                                 dataRecommend.length > 0 ? (
                                         <VerticalGirdView data={dataRecommend}
                                                           renderItem={({item, index}) =>
                                                               <ItemChannel uriImage={item.poster_path}
                                                                            onClick={() => this.props.navigation.push('MoviesDetail', {movie: item})}/>
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
        const headerTranslate = this.nScroll.interpolate({
            inputRange: [0, height / 3 - 35 / 2 - 5],
            outputRange: [height / 3 - 35 / 2 - 5, 0],
            extrapolate: 'clamp',
        });
        return (
            <View style={{flex: 1, backgroundColor: '#232635'}}>
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
                            style={{backgroundColor: '#232635', paddingLeft: 10, paddingRight: 10, flex: 1, zIndex: 3}}>
                            {this._renderDescription()}
                            {this._renderSubDescription()}
                        </View> : <SkypeIndicator color={global.yellowColor}/>
                    }

                </Animated.ScrollView>
                <ReviewModal
                    {...this.props}
                    styleModalPopupCustom={{backgroundColor: global.backgroundColor23, borderRadius: 10}}
                    ref={'modalReview'}
                />
            </View>

        );
    }
}

export default MoviesDetailView;


