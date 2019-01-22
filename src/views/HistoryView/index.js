import React, {Component} from 'react';
import {View, Dimensions, LayoutAnimation, Image, FlatList} from 'react-native';
import styles from './styles';
import global from "../../themes/global";
import Header from "../../modules/Header";
import * as STRING from '../../themes/string';
import TextComponent from "../../commons/Text/Text";
import TabItems from "../../modules/TabItems";
import VerticalListView from "../../modules/VerticalListView";
import VerticalGirdView from "../../modules/VerticalGirdView"
import ItemChannel from "../../modules/ItemChannel";
import ViewTabScrollAnimated from "../../modules/ViewTabScrollAnimated";
import ItemMovieNew from "../../modules/ItemMovieNew";
import * as UTIL_FUNCTION from "../../util";
import EmptyView from "../../modules/EmptyView";

const {height, width} = Dimensions.get('window');

export default class HistoryView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: STRING.HEADER.ROUTE_HISTORY[0].id,
            routes: STRING.HEADER.ROUTE_HISTORY,
            dataHistory: this.props.dataHistory,
            dataLike: this.props.dataLike,
            dataWatchList: this.props.dataWatchList
        };
        this._isFirstOpen = false;
        this.renderScene = this.renderScene.bind(this);
        this._onIndexChange = this._onIndexChange.bind(this);
        this._navigateToDetail = this._navigateToDetail.bind(this);
        this._removeItemView = this._removeItemView.bind(this);
    }

    componentDidMount() {
        const {usersAction: {getDataUserHistoryMovie, getDataUserLikeMovie, getDataUserWatchListMovie}, userInfo} = this.props;
        getDataUserHistoryMovie({id: userInfo.id});
        getDataUserLikeMovie({id: userInfo.id});
        getDataUserWatchListMovie({id: userInfo.id});

    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (UTIL_FUNCTION.compareDifference(nextProps.dataHistory, prevState.dataHistory)
            || UTIL_FUNCTION.compareDifference(nextProps.dataLike, prevState.dataLike)) {
            return {
                dataHistory: nextProps.dataHistory,
                dataLike: nextProps.dataLike,
                dataWatchList: nextProps.dataWatchList
            }
        }
        return null;
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        //console.log('getSnapshotBeforeUpdate',prevProps,prevState);
        return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //console.log('componentDidUpdate ',prevProps,prevState,snapshot);

    }

    _onIndexChange(item) {
        LayoutAnimation.easeInEaseOut();
        this.setState({index: item.id});
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

    _removeItemView(movie, type) {
        let Key;
        switch (type) {
            case 'HISTORY':
                Key = 1;
                break;
            case 'LIKE':
                Key = 2;
                break;
            case 'WATCHLIST':
                Key = 3;
                break;
        }
        let data = {
            movie,
            type: type,
            actionType: 'REMOVE',
            params: {
                idMovie: movie.id,
                idUser: this.props.userInfo.id,
                Key
            }
        };
        this.props.usersAction.addUserHistoryMovies(data);
    }

    renderScene() {
        const {dataHistory, dataLike,dataWatchList} = this.state;
        switch (this.state.index) {
            case 1: {
                return (
                    <View key={1} style={{flex: 1, marginTop: 10}}>
                        {
                            dataHistory.length > 0 ? <VerticalListView
                                    ItemSeparatorComponent={() => <View
                                        style={{
                                            height: 15,
                                            width: "100%",
                                        }}
                                    />}
                                    data={dataHistory}
                                    renderItem={({item, index}) =>
                                        <ItemMovieNew type={'HISTORY'} disabledClickDetail
                                                      onClickToRemove={this._removeItemView}
                                                      onClickToReSee={this._navigateToDetail} isNew={false} item={item}/>
                                    }/> :
                                <EmptyView style={{marginTop: height / 3 - 50}} nameIcon={'ios-book'} textDes={'Bạn chưa có lịch sử xem phim'}/>
                        }

                    </View>
                );
            }
            case 2: {
                return (
                    <View key={2} style={{flex: 1, marginTop: 10}}>
                        {
                            dataLike.length > 0 ? <VerticalListView
                                    ItemSeparatorComponent={() => <View
                                        style={{
                                            height: 15,
                                            width: "100%",
                                        }}
                                    />}
                                    data={dataLike}
                                    renderItem={({item, index}) =>
                                        <ItemMovieNew type={'LIKE'} disabledClickDetail
                                                      onClickToRemove={this._removeItemView}
                                                      onClickToReSee={this._navigateToDetail} isNew={false} item={item}/>
                                    }/> :
                                <EmptyView style={{marginTop: height / 3 - 50}} nameIcon={'ios-book'} textDes={'Bạn chưa yêu thích bất kỳ bộ phim nào'}/>
                        }
                    </View>
                );
            }
            case 3: {
                return (
                    <View key={3} style={{flex: 1, marginTop: 10}}>
                        {
                            dataWatchList.length > 0 ? <VerticalListView
                                    ItemSeparatorComponent={() => <View
                                        style={{
                                            height: 15,
                                            width: "100%",
                                        }}
                                    />}
                                    data={dataWatchList}
                                    renderItem={({item, index}) =>
                                        <ItemMovieNew type={'WATCHLIST'} disabledClickDetail
                                                      onClickToRemove={this._removeItemView}
                                                      onClickToReSee={this._navigateToDetail} isNew={false} item={item}/>
                                    }/> :
                                <EmptyView style={{marginTop: height / 3 - 50}} nameIcon={'ios-book'} textDes={'Bạn chưa chọn bất kỳ bộ phim nào'}/>
                        }
                    </View>
                );
            }
            default:
                return null;
        }
    }

    render() {
        return (
            <ViewTabScrollAnimated
                {...this.props}
                textHeader={STRING.HEADER.NAME.HISTORY}
                url={this.props.userInfo.url_avatar}
                numTab={3}
                onIndexChange={this._onIndexChange}
                renderScene={this.renderScene()}
                routes={this.state.routes}
                index={this.state.index}/>
        );
    }
}



