import React, {Component} from 'react';
import {View, Text, Animated, Dimensions} from 'react-native';
import styles from './styles';
import ButtonWithIcon from "../../commons/Button/ButtonWithIcon";
import global from "../../themes/global";
import TextComponent from "../../commons/Text/Text";
import * as STRING from "../../themes/string";
import RoundAvatar from "../../commons/Avatar/RoundAvatar";
import Header from "../../modules/Header";
import SkypeIndicator from "react-native-indicators/src/components/skype-indicator/index";
import IconButton from "../../commons/Button/IconButton";
import ItemMovieCategory from "../../modules/ItemMovieCategory";
import VerticalGirdView from "../../modules/VerticalGirdView";
import * as UTIL_FUNCTION from "../../util";
import ItemGenres from "../../modules/ItemGenres";
import * as URL from "../../services/url";
import * as restClient from "../../services/restClient";
import {
    dataFetchingLike,
    dataFetchingLikeFail,
    dataFetchingLikeSuccess
} from "../../redux/ActionCreator/actionLoginCreators";
import ItemReview from "../../modules/ItemReview";
import VerticalListView from "../../modules/VerticalListView";

const {height, width} = Dimensions.get('window');

export default class ViewAll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: false
        };
        this.generateDataMovies = this.generateDataMovies.bind(this);
        this._navigateToDetail = this._navigateToDetail.bind(this);
        this._pushToAnotherScreen = this._pushToAnotherScreen.bind(this);
        this._renderItem = this._renderItem.bind(this);

    }

    componentDidMount() {
        const {token} = this.props;
        const {type} = this.props.navigation.state.params.data;
        console.log(this.generateDataMovies(type).url, this.generateDataMovies(type).params, token);
        this.setState({
            isLoading: true
        });
        restClient.excuteAPI("get", this.generateDataMovies(type).url, token, this.generateDataMovies(type).params).then(res => {
            console.log(res);
            if (res.success) {
                this.setState({
                    data: res.data, isLoading: false
                });
            } else {
                this.setState({
                    isLoading: false, data: []
                })
            }
        });
    }

    generateDataMovies(type) {
        const {recommendData, dataTopMovie, dataPhimle, dataPhimbo, dataAnime, dataAllGenres, userInfo} = this.props;
        const {id} = this.props.navigation.state.params.data;

        switch (type) {
            case 'PHIM_LE':
                return {url: URL.base_url + URL.GET_MOVIES_BY_CATEGORY, params: {page: 1, size: 50, category: 1}};
            case 'PHIM_BO':
                return {url: URL.base_url + URL.GET_MOVIES_BY_CATEGORY, params: {page: 1, size: 50, category: 2}};
            case 'ANIME':
                return {url: URL.base_url + URL.GET_MOVIES_BY_CATEGORY, params: {page: 1, size: 50, category: 4}};
            case 'RECOMMEND':
                return {url: URL.base_url + URL.GET_RECOMMEND_MOVIES, params: {idMovie: userInfo.id_movie_history}};
            case 'GENRES':
                return {url: URL.base_url + URL.GET_ALL_GENRES, params: {page: 1, size: 50}};
            case 'GENRE':
                return {url: URL.base_url + URL.GET_GENRES_MOVIE, params: {page: 1, size: 50, id}};
            case 'COMMENT':
                return {url: URL.base_url + URL.GET_USER_COMMENT, params: {page: 1, size: 50, id}};
            default:
                return null
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
        UTIL_FUNCTION.navigateToDetail(this.props.usersAction, this.props.navigation, data);
    }

    _pushToAnotherScreen(item) {
        let data = {heading: item.name_genre, type: 'GENRE', id: item.id};
        this.props.navigation.push('ViewAll', {data});
    }

    _renderItem({item, index}) {
        const {data} = this.props.navigation.state.params;
        switch (data.type) {
            case 'GENRES': {
                return <ItemGenres item={item} onClick={() => this._pushToAnotherScreen(item)}/>
            }
            case 'COMMENT': {
                return <ItemReview item={item} style={{marginTop:10}}/>
            }
            default:
                return <ItemMovieCategory numCol={3} item={item} onClick={() => this._navigateToDetail(item)}/>
        }
    }

    render() {
        const {data} = this.props.navigation.state.params;
        return (
            <View style={{flex: 1, backgroundColor: global.backgroundColor}}>
                <Header isMain heading={data.heading} url={this.props.userInfo.url_avatar}
                        onClickBack={() => this.props.navigation.goBack()}/>
                {
                    !this.state.isLoading ? (this.state.data.length > 0 ? <VerticalGirdView
                            numColumns={data.type !== 'COMMENT' ? 3 : 1}
                            ItemSeparatorComponent={data.type !== 'COMMENT' ? null : () => <View
                                style={{
                                    height: 5,
                                    width: "100%",
                                }}
                            />}
                            data={this.state.data}
                            renderItem={this._renderItem}/> : <TextComponent text={'Chưa có dữ liệu vui lòng chọn mục khác'}
                                                 color={global.colorFF}
                                                 size={global.sizeP18}
                                                 style={{
                                                     textAlign: 'center',
                                                     alignSelf: 'center',
                                                     marginTop: height / 2 - 100
                                                 }}/>)
                        : <SkypeIndicator color={global.yellowColor}/>
                }


            </View>
        );
    }
}



