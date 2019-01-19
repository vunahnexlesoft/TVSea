import React, {Component} from 'react';
import {View, Text, Animated, Dimensions, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import ButtonWithIcon from "../../commons/Button/ButtonWithIcon";
import * as STRING from '../../themes/string';
import TextComponent from "../../commons/Text/Text";
import global from "../../themes/global";
import Header from "../../modules/Header";
import VerticalListView from "../../modules/VerticalListView";
import Divide from "../../commons/Divide"
import IconButton from "../../commons/Button/IconButton";
import TextSingleInput from "../../commons/TextInput/TextSingleInput";
import ItemHistorySearch from "../../modules/ItemHistorySearch";
import ItemMovieNew from "../../modules/ItemMovieNew";
import EmptyView from "../../modules/EmptyView";
import * as UTIL_FUCTION from "../../util";
import ViewTabScrollAnimated from "../../modules/ViewTabScrollAnimated";

const {height, width} = Dimensions.get('window');

export default class SearchView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            changeText: false,
        };
        this.addHistoryTimeOut = null;
        this.onChangeTextToSearch = this.onChangeTextToSearch.bind(this);
        this.onClickHistoryItem = this.onClickHistoryItem.bind(this);
        this.onEndEditing = this.onEndEditing.bind(this);
        this._navigateToDetail = this._navigateToDetail.bind(this);
    }

    onChangeTextToSearch(value) {
        const {moviesAction, search} = this.props;
        if (value.length >= 3) {
            moviesAction.getDataSearchMovie({query: UTIL_FUCTION.convertText(value)});
        } else if (value.length <= 0) {
            moviesAction.resetStateDataMovies({key: "search", value: {...search, data: []}})
        }
        this.setState({
            searchText: value,
            changeText: value.length > 0
        });
    }

    onEndEditing() {
        const {moviesAction} = this.props;
        console.log('onSubmitEditing');
        if (this.addHistoryTimeOut) {
            clearTimeout(this.addHistoryTimeOut);
            this.addHistoryTimeOut = null;
        }
        this.addHistoryTimeOut = setTimeout(() => {
            if (this.state.searchText.length >= 3) {
                moviesAction.updateSearchHistory({type: 'ADD_SEARCH_HISTORY_MOVIE', name: this.state.searchText});
            }
            clearTimeout(this.addHistoryTimeOut);
            this.addHistoryTimeOut = null;
        }, 200);
    }

    onClickHistoryItem(value) {
        this.setState({
            searchText: value,
            changeText: true
        }, () => {
            this.props.moviesAction.getDataSearchMovie({query: UTIL_FUCTION.convertText(value)});
        })
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
    render() {
        const {dataSearch, dataHistory} = this.props;
        return (
            <View style={{flex: 1, backgroundColor: global.backgroundColor}}>
                <Header heading={STRING.HEADER.NAME.SEARCH} url={this.props.userInfo.url_avatar}/>
                <View style={{marginLeft: 10, marginRight: 10, flex: 1}}>
                    <TextSingleInput styleForm={{
                        height: height / 18,
                        flexDirection: 'row',
                        backgroundColor: 'transparent',
                        borderWidth: 1,
                        borderColor: global.darkBlue,
                        borderRadius: 8, alignItems: 'center'
                    }}
                                     value={this.state.searchText}
                                     onChangeText={this.onChangeTextToSearch}
                                     onEndEditing={this.onEndEditing}
                                     placeholder={'Tìm kiếm ngay'}
                                     placeholderTextColor={global.darkBlue}
                                     style={{fontSize: global.sizeP18, color: global.colorFF}}
                                     nameIcon={'ios-search'}/>

                    {
                        this.state.searchText.length <= 0 ? <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{
                                height: 8,
                                width: 8,
                                borderRadius: 4,
                                backgroundColor: global.yellowColor,
                                marginRight: 5,
                                alignSelf: 'center'
                            }}/>
                            <TextComponent text={'Lịch sử'}
                                           size={global.sizeP20}
                                           style={{fontWeight: '500'}}
                                           color={global.colorFF}/>
                        </View> : null
                    }
                    {
                        dataHistory.length > 0 || this.state.changeText ?
                            <VerticalListView data={this.state.changeText ? dataSearch : dataHistory}
                                              contentContainerStyle={{paddingTop: height / 50}}
                                              ItemSeparatorComponent={() => <View
                                                  style={{
                                                      height: 5,
                                                      width: "100%",
                                                  }}
                                              />}
                                              renderItem={({item, index}) => {
                                                  return this.state.changeText ? (
                                                          <ItemMovieNew item={item} isNew
                                                                        onClick={this._navigateToDetail.bind(this, item)}/>
                                                      )
                                                      :
                                                      (<ItemHistorySearch item={item}
                                                                          onClick={this.onClickHistoryItem.bind(this, item)}/>);
                                              }}/>
                            : <EmptyView nameIcon={'ios-pulse'} textDes={'Chưa có lịch sử tìm kiếm'}/>
                    }

                </View>
            </View>
        );
    }
}



