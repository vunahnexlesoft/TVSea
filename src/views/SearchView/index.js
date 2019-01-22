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
import RoundAvatar from "../../commons/Avatar/RoundAvatar";

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
                <View style={[{
                    elevation: 2,
                    shadowColor: "#000",
                    backgroundColor: global.backgroundColor23,
                    //backgroundColor: 'red',
                    width: width,
                    paddingTop: 5,
                    paddingBottom: 5,
                    paddingLeft:8, paddingRight:8,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection:'row',
                    // position: 'absolute',
                    // top: 0, right: 0, left: 0,
                    zIndex: 1,
                    shadowOffset: {width: 2, height: 2},
                    shadowOpacity: 0.4
                }]}>
                    <IconButton btnStyle={{height: height/22,alignSelf: 'center',marginRight:10,marginBottom: 2}}
                                iconStyle={{fontSize:height / 20, color:global.colorA5}}
                                nameIcon={'ios-arrow-back'}
                                hitSlop={{top:35, left:35, bottom:35,right:35}}
                                onClick={() => this.props.navigation.goBack()}/>
                    <TextSingleInput styleForm={{
                        height: height / 18,
                        marginLeft:5,
                        flexDirection: 'row',
                        backgroundColor: 'transparent',
                        borderWidth: 1,
                        borderColor: global.darkBlue,
                        borderRadius: 8,
                        alignItems: 'center'
                    }}
                                     type={'search'}
                                     value={this.state.searchText}
                                     onChangeText={this.onChangeTextToSearch}
                                     onEndEditing={this.onEndEditing}
                                     placeholder={'Tìm kiếm ngay'}
                                     placeholderTextColor={global.darkBlue}
                                     style={{fontSize: global.sizeP18, color: global.colorFF}}
                                     nameIcon={'ios-search'}/>
                </View>
                {/*<Header heading={STRING.HEADER.NAME.SEARCH} url={this.props.userInfo.url_avatar}/>*/}
                <View style={{marginLeft: 10, marginRight: 10, flex: 1}}>
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
                                                                        onClickDetail={this._navigateToDetail.bind(this, item)}
                                                                        onClick={this._navigateToDetail.bind(this, item)}/>
                                                      )
                                                      :
                                                      (<ItemHistorySearch item={item}
                                                                          onClickCloseButton={()=> this.props.moviesAction.updateSearchHistory({type: 'REMOVE_SEARCH_HISTORY_MOVIE', name: item})}
                                                                          onClick={this.onClickHistoryItem.bind(this, item)}/>);
                                              }}/>
                            : <EmptyView nameIcon={'ios-pulse'} textDes={'Chưa có lịch sử tìm kiếm'}/>
                    }

                </View>
            </View>
        );
    }
}



