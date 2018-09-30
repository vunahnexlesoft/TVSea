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

const {height, width} = Dimensions.get('window');

export default class SearchView extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: global.backgroundColor}}>
                <Header date={'Chủ nhật'} heading={STRING.HEADER.NAME.SEARCH}/>
                <View style={{marginLeft: 10, marginRight: 10, flex: 1}}>
                    <TouchableOpacity activeOpacity={0.8}
                                      style={{
                                          height: height / 20,
                                          flexDirection: 'row',
                                          borderWidth: 1,
                                          borderColor: global.darkBlue,
                                          borderRadius: 8, alignItems: 'center', marginBottom: 8
                                      }}>
                        <IconButton nameIcon={'ios-search'}
                                    btnStyle={{alignItems: 'center'}}
                                    iconStyle={{
                                        fontSize: global.sizeP25,
                                        color: global.darkBlue,
                                        marginLeft: 10,
                                        marginTop: 2,
                                        alignSelf: 'center'
                                    }}/>
                        <TextComponent text={'Tìm kiếm ngay'} color={global.darkBlue} size={global.sizeP18}
                                       style={{marginLeft: 10}}/>
                    </TouchableOpacity>
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
                    <VerticalListView data={[{id: 1}, {id: 2}, {id: 3},{id: 1}, {id: 2}, {id: 3}]}
                                      contentContainerStyle={{paddingTop: height / 50}}
                                      ItemSeparatorComponent={() => <View
                                          style={{
                                              height: 5,
                                              width: "100%",
                                          }}
                                      />}

                                      renderItem={(item, index) =>
                                          <TouchableOpacity  activeOpacity={0.8} style={{flex: 1}}>
                                              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                  <View style={{
                                                      height: 5,
                                                      width: 5,
                                                      borderRadius: 4,
                                                      backgroundColor: global.borderRightColor,
                                                      marginRight: 5,
                                                      alignSelf: 'center'
                                                  }}/>
                                                  <TextComponent text={'Captain America'}
                                                                 size={global.sizeP15}
                                                                 style={{fontWeight: '500'}}
                                                                 color={global.colorFF}/>
                                              </View>
                                              <Divide/>
                                          </TouchableOpacity>}/>
                </View>
            </View>
        );
    }
}



