import React, {Component} from 'react';
import {View, Dimensions, ScrollView} from 'react-native';
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

const {height, width} = Dimensions.get('window');

class MoviesDetailView extends Component {
    constructor(props) {
        super(props);
        this.onGoBack = this.onGoBack.bind(this);
        this._renderHeader = this._renderHeader.bind(this);
        this._renderDescription = this._renderDescription.bind(this);
        this._renderSubDescription = this._renderSubDescription.bind(this);
        this._onClickToLike = this._onClickToLike.bind(this);
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
        //resetStateDataMovies({key: "recommend", value: {data: [], isLoading: false, isError: false}});
        navigation.pop();
    }
    _onClickToLike(){
        const {
            usersAction,
            dataLike,
            dataDetail: {
                info,
                language,
            }, dataDetail, isDetailLoading, isDetailError, dataRecommend, isRecommendLoading, isRecommendError
        } = this.props;
        let check = !!dataDetail && !!dataDetail.info && dataLike.map((e) => {return e.id}).indexOf(info.id) <= -1;
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
        let {backdrop_path} = this.props.navigation.state.params.movie;
        const {
            dataLike,
            usersAction,
            dataDetail: {
                info,
                language,
            }, dataDetail, isDetailLoading, isDetailError, dataRecommend, isRecommendLoading, isRecommendError
        } = this.props;
        console.log(dataLike);
        let check = !!dataDetail && !!dataDetail.info && dataLike.map((e) => {return e.id}).indexOf(info.id) <= -1;
        return (
            <View style={{flex: 1, zIndex: 2, height: height / 3 + 40 /2,}}>
                <View style={{
                    height: height / 3,
                    width: null,
                    backgroundColor: global.transparentBlack3,
                    flex: 1,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 2
                }}/>
                <ButtonWithIcon nameIcon={'ios-arrow-back-outline'}
                                onClick={this.onGoBack}
                                icoStyle={{fontSize: global.sizeP25, color: global.colorFF, margin: 0}}
                                style={{
                                    height: 35,
                                    width: 45,
                                    borderRadius: 40 / 3,
                                    backgroundColor: global.transparentWhite50,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    paddingRight: 3,
                                    paddingTop: 2,
                                    flex: 1,
                                    elevation: 1,
                                    position: 'absolute', top: height / 3 - 35 / 2, left: 10, zIndex: 2
                                }}/>
                <ButtonWithIcon nameIcon={check ? 'ios-heart-outline' : 'ios-heart'}
                                onClick={this._onClickToLike}
                                icoStyle={{fontSize: global.sizeP40, color: check ? global.colorFF : global.yellowColor, margin: 0}}
                                style={{
                                    height: 35,
                                    width: 40,
                                    borderRadius: 40 / 3,
                                    backgroundColor: 'transparent',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    paddingLeft: 3,
                                    paddingTop: 2,
                                    flex: 1,
                                    elevation: 1,
                                    position: 'absolute', top: height / 3 - 40 / 2, right: 10, zIndex: 2
                                }}/>
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
                                    alignSelf: 'center',
                                    paddingLeft: 3,
                                    flex: 1,
                                    position: 'absolute', top: height / 3 / 2 - 40 / 2,
                                    zIndex: 2
                                }}/>
                <FastImage
                resizeMode={FastImage.resizeMode.cover}
                style={{height: height / 3, width: null,zIndex:0}}
                source={{
                uri: backdrop_path,
                priority: FastImage.priority.normal,
                }}/>
            </View>
        );
    }

    _renderDescription() {
        const {
            dataDetail: {
                info,
                language,
            }, dataDetail, isDetailLoading, isDetailError, dataRecommend, isRecommendLoading, isRecommendError
        } = this.props;
        let {title, overview, backdrop_path} = this.props.navigation.state.params.movie;
        let {partAndEpisode, releaseDate, languageAndRuntime, genreMovie} = '';
        if (dataDetail && info) {
            partAndEpisode = info.part + "/" + info.episode_number;
            releaseDate = moment(info.release_date).format("DD/MM/YYYY");
            languageAndRuntime = language.map((e, i) => e.name_language + " ") + "- " + info.run_time;
        }
        return (
            <MovieDescriptionView title={title}
                                  overview={overview}
                                  languageAndRuntime={languageAndRuntime}
                                  releaseDate={releaseDate}
                                  partAndEpisode={partAndEpisode}/>
        );
    }

    _renderSubDescription() {
        const {
            dataDetail: {
                actor,
                director,
                genres,
            }, dataRecommend, isRecommendLoading, isRecommendError
        } = this.props;
        return (
            <View style={{flex: 1}}>
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

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#232635'}}>
                <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
                    {this._renderHeader()}
                    <View style={{paddingLeft: 10,paddingRight:10, flex: 1, zIndex: 0}}>
                        {this._renderDescription()}
                        {this._renderSubDescription()}
                    </View>
                </ScrollView>
            </View>

        );
    }
}

export default MoviesDetailView;


