import React, {Component} from 'react';
import {View, Dimensions, LayoutAnimation, Image, FlatList, TouchableOpacity} from 'react-native';
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
import RoundAvatar from "../../commons/Avatar/RoundAvatar";
import ButtonWithIcon from "../../commons/Button/ButtonWithIcon";
import Divide from "../../commons/Divide";
import IconButton from "../../commons/Button/IconButton";
import ItemMovieNew from "../../modules/ItemMovieNew";
import ItemNotification from "../../modules/ItemNotification";

const {height, width} = Dimensions.get('window');

export default class AccountView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: STRING.HEADER.ROUTE_ACCOUNT[0].id,
            routes: STRING.HEADER.ROUTE_ACCOUNT,
        };
        this.renderScene = this.renderScene.bind(this);
        this._onIndexChange = this._onIndexChange.bind(this);
    }

    _onIndexChange(item) {
        LayoutAnimation.easeInEaseOut();
        this.setState({index: item.id});
    }

    renderScene() {
        const {data, isLoading, userInfo} = this.props;
        console.log(userInfo);
        switch (this.state.index) {
            case 1:
                return (
                    <View style={styles.containerScreen}>
                        <View style={styles.viewHeaderTop}>
                            <View style={{alignItems: 'center'}}>
                                <RoundAvatar
                                    size={'x-small'}
                                    icSrc={userInfo.url_avatar}/>
                                <TextComponent text={userInfo.display_name} size={global.sizeP18} color={global.colorFF}
                                               style={{marginTop: 2}}/>
                                <TextComponent text={userInfo.email} size={global.sizeP16}
                                               color={global.grayDarkColor} style={{marginTop: 5}}/>
                                <TextComponent text={userInfo.number_phone} size={global.sizeP16}
                                               color={global.grayDarkColor}
                                               style={{marginTop: 2}}/>
                                <TextComponent text={'20/07/1996'} size={global.sizeP16} color={global.grayDarkColor}
                                               style={{marginTop: 2, marginBottom: 2}}/>
                                <ButtonWithIcon buttonText={'Đăng xuất'}
                                                styleText={{fontSize: global.sizeP15, color: global.grayDarkColor}}
                                                style={styles.btnLogOut}/>
                            </View>
                            <Divide/>
                            <View style={styles.viewCount}>
                                <View style={styles.viewContentCount}>
                                    <TextComponent text={'100K'} color={global.lightGreen} size={global.sizeP18}/>
                                    <TextComponent text={'Tiền hiện tại'} size={global.sizeP16}
                                                   color={global.grayLightColor}/>
                                </View>
                                <View style={styles.viewContentCount1}>
                                    <TextComponent text={'56'} color={global.lightGreen} size={global.sizeP18}/>
                                    <TextComponent text={'Số lần xem'} size={global.sizeP16}
                                                   color={global.grayLightColor}/>
                                </View>
                            </View>
                        </View>
                        <View style={{
                            backgroundColor: global.backgroundColor23,
                            padding: 10,
                            borderRadius: 10,
                            marginTop: 5
                        }}>
                            <TextComponent text={'Xếp hạng thành viên'} size={global.sizeP18}
                                           color={global.grayDarkColor}
                                           style={{marginTop: 2}}/>
                            <TextComponent text={'Starter'} size={global.sizeP18} color={global.colorFF}
                                           style={{marginTop: 2}}/>
                        </View>
                        <View style={{
                            backgroundColor: global.backgroundColor23,
                            padding: 10,
                            borderRadius: 10,
                            marginTop: 5
                        }}>
                            <TouchableOpacity activeOpacity={0.8}>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <TextComponent text={'Nạp tiền ngay'} color={global.colorFF} size={global.sizeP16}/>
                                    <IconButton nameIcon={'ios-arrow-dropright-outline'}
                                                iconStyle={{fontSize: global.sizeP20, color: global.colorFF}}/>
                                </View>
                                <Divide style={{width: width - 20}}/>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8}>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <TextComponent text={'Thông tin ứng dụng'} color={global.colorFF}
                                                   size={global.sizeP16}/>
                                    <IconButton nameIcon={'ios-arrow-dropright-outline'}
                                                iconStyle={{fontSize: global.sizeP20, color: global.colorFF}}/>
                                </View>
                                <Divide style={{width: width - 20}}/>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8}>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <TextComponent text={'Góp ý cho TV'} color={global.colorFF} size={global.sizeP16}/>
                                    <IconButton nameIcon={'ios-arrow-dropright-outline'}
                                                iconStyle={{fontSize: global.sizeP20, color: global.colorFF}}/>
                                </View>
                                <Divide style={{width: width - 20}}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            case 2:
                return (
                    <View style={{flex: 1, marginTop: 10}}>
                        <VerticalListView
                            ItemSeparatorComponent={() => <View
                                style={{
                                    height: 10,
                                    width: "100%",
                                }}
                            />}
                            data={[{
                                date: '10/10/2018',
                                title: 'Khuyến mãi lớn nạp ngay nhận thưởng đầy tay'
                            },
                                {
                                    date: '10/12/2018',
                                    title: 'Khuyến mãi lớn nạp ngay nhận thưởng đầy tay'
                                },
                                {
                                    date: '10/11/2018',
                                    title: 'Khuyến mãi lớn nạp ngay nhận thưởng đầy tay'
                                }]}
                            renderItem={({item, index}) =>
                                <ItemNotification isNew={false}
                                                  item={item}/>
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
                textHeader={STRING.HEADER.NAME.PERSIONAL}
                textDate={'Sunday, Feb 5, 2018'}
                numTab={2}
                onIndexChange={this._onIndexChange}
                renderScene={this.renderScene()}
                routes={this.state.routes}
                index={this.state.index}/>
        );
    }
}