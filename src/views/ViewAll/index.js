import React, {Component} from 'react';
import {View, Text, Animated} from 'react-native';
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

export default class ViewAll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ''
        };
        this.generateDataMovies = this.generateDataMovies.bind(this);
        this._navigateToDetail = this._navigateToDetail.bind(this);

    }
    generateDataMovies(type){
        const {recommendData,dataTopMovie} =this.props;
        switch (type) {
            case 'PHIM_LE':
                return dataTopMovie;
            case 'PHIM_BO':
                return recommendData;
            case 'ANIME':
                return recommendData;
            case 'RECOMMEND':
                return recommendData;
            default: return null
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
    render() {
        const {data} = this.props.navigation.state.params;
        return (
            <View style={{flex: 1, backgroundColor: global.backgroundColor}}>
                <Header isMain heading={data.heading} url={this.props.userInfo.url_avatar} onClickBack={() => this.props.navigation.goBack()}/>
                <VerticalGirdView
                    numColumns={3}
                    data={this.generateDataMovies(data.type)}
                    renderItem={({item, index}) =>
                        <ItemMovieCategory numCol={3} item={item} onClick={() => this._navigateToDetail(item)}/>
                    }/>
            </View>
        );
    }
}



