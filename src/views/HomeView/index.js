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
import firebaseService from "../../services/firebase";
const {height, width} = Dimensions.get('window');
import * as UTIL_FUNCTION from '../../util';
import firebaseUtil from "../../services/firebase";
import firebase from "react-native-firebase";
export default class HomeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: STRING.HEADER.ROUTE_HOME[0].id,
            routes: STRING.HEADER.ROUTE_HOME,
            counter: 0
        };
        this.renderScene = this.renderScene.bind(this);
        this._onIndexChange = this._onIndexChange.bind(this);
        this._onGotoSteamingScreen = this._onGotoSteamingScreen.bind(this);
    }
    componentDidMount(){
        const {moviesAction:{getDataMoviebyCategory}} = this.props;
        getDataMoviebyCategory({page: 1, category:'Phim lẻ'});
        firebase.database().ref('Channel').on('value', (snap) => {
            const items = [];
            snap.forEach((child) => {
                let item = child.val();
                item['key'] = child.key;
                items.push(item);
            });
            this.setState({
                counter: items.length
            });
        });
    }
    _onIndexChange(item) {
        LayoutAnimation.easeInEaseOut();
        this.setState({index: item.id});
    }
    _onGotoSteamingScreen(item){
        firebaseUtil.setNewUserOnline(this.props.userInfo);
        this.props.navigation.navigate('Video',{host: STRING.VAR.STEAMING_URL, url: item.backdrop_path, type:"stream"})
    }
    renderScene() {
        const{dataPhimle, isPhimleLoading, userInfo} = this.props;
        switch (this.state.index) {
            case 1:
                return (
                    <View style={{flex: 1,marginTop:10}}>
                        <VerticalListView data={dataPhimle}
                                          ItemSeparatorComponent={() => <View
                                              style={{
                                                  height: 20,
                                                  width: "100%",
                                              }}
                                          />}
                                          renderItem={({item, index}) => {
                                              return index === 0 ? (
                                                  <ItemChannel numCol={1}
                                                               counter={this.state.counter}
                                                               onClick={this._onGotoSteamingScreen.bind(this, item)}
                                                               uriImage={item.backdrop_path}/>
                                              ): null
                                          }

                                          }/>
                    </View>
                );
            case 2:
                return (
                    <View style={{flex: 1,marginTop:10}}>
                        <VerticalGirdView data={dataPhimle}
                                          renderItem={({item, index}) =>
                                              <ItemChannel uriImage={item.poster_path}/>
                                          }/>
                    </View>
                );
            default:
                return null;
        }
    }
    render() {
        return (
            <ViewTabScrollAnimated
                {...this.props}
                textHeader={STRING.HEADER.NAME.TODAY}
                url={this.props.userInfo.url_avatar}
                numTab={2}
                onIndexChange={this._onIndexChange}
                renderScene={this.renderScene()}
                routes={this.state.routes}
                index={this.state.index}/>
        );
    }
}



