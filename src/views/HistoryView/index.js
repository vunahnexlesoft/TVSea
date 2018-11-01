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

const {height, width} = Dimensions.get('window');

export default class HistoryView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: STRING.HEADER.ROUTE_HISTORY[0].id,
            routes: STRING.HEADER.ROUTE_HISTORY,
        };
        this.renderScene = this.renderScene.bind(this);
        this._onIndexChange = this._onIndexChange.bind(this);
    }

    componentDidMount() {
        const {usersAction: {getDataUserHistoryMovie, getDataUserLikeMovie}, userInfo} = this.props;
        getDataUserHistoryMovie({id: 1});
        getDataUserLikeMovie({id: 1});
    }

    _onIndexChange(item) {
        LayoutAnimation.easeInEaseOut();
        this.setState({index: item.id});
    }

    renderScene() {
        const {dataHistory, dataLike} = this.props;
        console.log(dataHistory, dataLike.map((e) => {
            return e.id
        }).indexOf(1));
        switch (this.state.index) {
            case 1: {
                return (
                    <View key={1} style={{flex: 1, marginTop: 10}}>
                        <VerticalListView
                            ItemSeparatorComponent={() => <View
                                style={{
                                    height: 15,
                                    width: "100%",
                                }}
                            />}
                            data={dataHistory}
                            renderItem={({item, index}) =>
                                <ItemMovieNew isNew={false} item={item}/>
                            }/>
                    </View>
                );
            }
            case 2: {
                return (
                    <View key={2} style={{flex: 1, marginTop: 10}}>
                        <VerticalListView
                            ItemSeparatorComponent={() => <View
                                style={{
                                    height: 15,
                                    width: "100%",
                                }}
                            />}
                            data={dataLike}
                            renderItem={({item, index}) =>
                                <ItemMovieNew isNew={false} item={item}/>
                            }/>
                    </View>
                );
            }
            default:
                return null;
        }
    }

    render() {
        console.log(this.props.dataHistory);
        return (
            <ViewTabScrollAnimated
                {...this.props}
                textHeader={STRING.HEADER.NAME.HISTORY}
                numTab={2}
                onIndexChange={this._onIndexChange}
                renderScene={this.renderScene()}
                routes={this.state.routes}
                index={this.state.index}/>
        );
    }
}



