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
const {height, width} = Dimensions.get('window');

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: STRING.HEADER.ROUTE_HOME[0].id,
            routes: STRING.HEADER.ROUTE_HOME,
        };
        this._onIndexChange = this._onIndexChange.bind(this);
        this.renderScene = this.renderScene.bind(this);
    }
    renderScene() {
        const{data,isLoading} = this.props;
        console.log(data,isLoading);
        switch (this.state.index) {
            case 1:
                return (
                    <View style={{flex: 1,marginTop:10}}>
                        <VerticalListView data={data}
                                          ItemSeparatorComponent={() => <View
                                              style={{
                                                  height: 10,
                                                  width: "100%",
                                              }}
                                          />}
                                          renderItem={({item, index}) =>
                                              <ItemChannel numCol={1}
                                                           uriImage={item.backdrop_path}/>
                                          }/>
                    </View>
                );
            case 2:
                return (
                    <View style={{flex: 1,marginTop:10}}>
                        <VerticalGirdView data={data}
                                          renderItem={({item, index}) =>
                                              <ItemChannel uriImage={item.poster_path}/>
                                          }/>
                    </View>
                );
            default:
                return null;
        }
    }

    _onIndexChange(item) {
        this.props.getData.fetchingDataMoviebyCategory(1,'Phim lẻ');
        LayoutAnimation.easeInEaseOut();
        this.setState({index: item.id});
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: global.backgroundColor}}>
                <Header date={'Sunday, Sep 16, 2018'}
                        heading={STRING.HEADER.NAME.TODAY}/>
                <TabItems
                    routes={this.state.routes}
                    onIndexChange={this._onIndexChange}
                    selectedTabItem={this.state.index}
                    isUpperCase
                    numTab={2}
                    styleText={{fontSize: global.sizeP14, fontWeight: '700'}}
                    styleTab={{
                        height: height / 18,
                        width: width,
                    }}
                />
                <View style={{flex: 1}}>
                    {this.renderScene()}
                </View>
            </View>
        );
    }
}



