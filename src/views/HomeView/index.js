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
const {height, width} = Dimensions.get('window');

export default class HomeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: STRING.HEADER.ROUTE_HOME[0].id,
            routes: STRING.HEADER.ROUTE_HOME,
        };
        this.renderScene = this.renderScene.bind(this);
        this._onIndexChange = this._onIndexChange.bind(this);
    }
    componentDidMount(){
        const {moviesAction:{getDataMoviebyCategory}} = this.props;
        getDataMoviebyCategory({page: 1, category:'Phim lẻ'});
    }
    _onIndexChange(item) {
        LayoutAnimation.easeInEaseOut();
        this.setState({index: item.id});
    }
    renderScene() {
        const{dataPhimle, isPhimleLoading} = this.props;
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
                                          renderItem={({item, index}) =>
                                              <ItemChannel numCol={1}
                                                           onClick={()=> this.props.navigation.navigate('Video',{host:"http://18.222.223.197:5080/live/streaming.m3u8"})}
                                                           uriImage={item.backdrop_path}/>
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
                textDate={'Sunday, Feb 5, 2018'}
                numTab={2}
                onIndexChange={this._onIndexChange}
                renderScene={this.renderScene()}
                routes={this.state.routes}
                index={this.state.index}/>
        );
    }
}



