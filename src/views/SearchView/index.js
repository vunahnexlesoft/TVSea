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
    }

    onChangeTextToSearch(value) {
        const {moviesAction} = this.props;
        if (value.length > 3) {
            moviesAction.getDataSearchMovie({query: value});
        }

        this.setState({
            searchText: value,
            changeText: value.length > 0
        });
        if(this.addHistoryTimeOut){
            clearTimeout(this.addHistoryTimeOut);
            this.addHistoryTimeOut = null;
        }
        this.addHistoryTimeOut = setTimeout(()=>{
            console.log('ADD HISTORY')
            moviesAction.updateSearchHistory({type :'ADD_SEARCH_HISTORY_MOVIE', name : value});
            clearTimeout(this.addHistoryTimeOut);
            this.addHistoryTimeOut = null;
        },5000);
    }

    render() {
        const {dataSearch, dataHistory} = this.props;
        console.log(dataSearch,dataHistory);
        return (
            <View style={{flex: 1, backgroundColor: global.backgroundColor}}>
                <Header date={'Chủ nhật'} heading={STRING.HEADER.NAME.SEARCH}/>
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
                                     placeholder={'Tìm kiếm ngay'}
                                     placeholderTextColor={global.darkBlue}
                                     style={{fontSize: global.sizeP18, color: global.colorFF}}
                                     nameIcon={'ios-search'}/>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                    </View>
                    {
                        dataHistory.length > 0 || this.state.changeText ?
                            <VerticalListView data={this.state.changeText ? dataSearch : dataHitory}
                                              contentContainerStyle={{paddingTop: height / 50}}
                                              ItemSeparatorComponent={() => <View
                                                  style={{
                                                      height: 5,
                                                      width: "100%",
                                                  }}
                                              />}
                                              renderItem={({item, index}) => {
                                                  return this.state.changeText ? (
                                                          <ItemMovieNew item={item} isNew/>
                                                      )
                                                      :
                                                      (<ItemHistorySearch item={item}/>);
                                              }}/>
                            : <EmptyView nameIcon={'ios-pulse'} textDes={'Chưa có lịch sử tìm kiếm'}/>
                    }

                </View>
            </View>
        );
    }
}



