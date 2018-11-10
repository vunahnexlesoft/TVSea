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
    }
    static getDerivedStateFromProps(nextProps, prevState){
        switch (nextProps.navigation.state.params.data.type) {
            case 'PHIM_LE':
                return {
                    data: 'PHIM_LE'
                };
            case 'PHIM_BO':
                return {
                    data: 'PHIM_BO'
                };
            case 'ANIME':
                return {
                    data: 'ANIME'
                };
            case 'PHIM_MOI':
                return {
                    data: 'PHIM_MOI'
                };
            default: return null
        }
    }
    render() {
        const {dataTopMovie} = this.props;
        console.log(this.state.data);
        const {data} = this.props.navigation.state.params;
        return (
            <View style={{flex: 1, backgroundColor: global.backgroundColor}}>
                <Header isMain heading={data.heading} url={this.props.userInfo.url_avatar} onClickBack={() => this.props.navigation.goBack()}/>
                <VerticalGirdView
                    numColumns={3}
                    data={dataTopMovie}
                    renderItem={({item, index}) =>
                        <ItemMovieCategory numCol={3} item={item}/>
                    }/>
            </View>
        );
    }
}



