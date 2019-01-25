import React, {Commponent} from "react";
import {View, TouchableOpacity, Dimensions, Platform, Image, LayoutAnimation, Alert,Easing} from "react-native";
import ModalOder from '../../commons/Modal/ModalOder'
import Text from "../../commons/Text/Text";
import ButtonWithIcon from "../../commons/Button/ButtonWithIcon";
import global from "../../themes/global";
import TextInput from '../../commons/TextInput/TextSingleInput';
import moment from 'moment';
import Rating from '../../commons/Rating/Rating';
import localImage from "../../themes/localImage";
import * as UTIL_FUCTION from "../../util/index";
import IconButton from "../../commons/Button/IconButton";
import VerticalListView from "../VerticalListView";
import ItemMovieNew from "../ItemMovieNew";
import EmptyView from "../EmptyView";
const {height, width} = Dimensions.get("window");

export default class ModalStreaming extends ModalOder {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            animationDuration: 150,
            numPhone: '',
            data:[],
            easing: null,
        };
        this.openModal = this.openModal.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
        this.onAddCartToSever = this.onAddCartToSever.bind(this);
        this.renderCenter=false;
    }

    openModal(params) {
        super.openModal();
    }

    onCloseModal() {
        this.closeModal();
    }
    _onUpdate(item) {
        Alert.alert(
            null,
            'Bạn có muốn xoá sản phẩm này ?',
            [
                {text: 'Không', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {
                    text: 'Có', onPress: () => {
                        this.props.cartAction.deleteItemCheck(item.id)
                    }
                },
            ],
            {cancelable: false}
        )
    }
    onAddCartToSever() {
        const{numPhone} = this.state;
        if (numPhone && numPhone.length >=10) {
            let data ={
                data :this.props.dataCart,
                uid: this.props.userInfo.uid,
                numPhone: numPhone,
                note:this.state.note,
                timeIn: moment(new Date()).format("DD/MM/YYYY hh:mm:ss"),
                total: this.state.total
            };
            this.props.cartAction.updateLoadCartProduct(data);
            this.onCloseModal();
            this.setState({
                numPhone:'',
                note:''
            })
        } else {
            this.setState({
                warning: true
            })
        }
    }

    renderHeader() {
        return (
            <View style={{alignItems:'center', justifyContent:'center', backgroundColor: 'transparent'}}>
                <IconButton nameIcon={'ios-arrow-down'}
                            onClick={() => this.onCloseModal()}
                            iconStyle={{
                                fontSize: global.sizeP35,
                                color: global.colorFF
                            }}
                            btnStyle={{
                                height:25,
                                marginBottom:10,
                                width: 40,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}/>
            </View>
        );
    }

    renderContent() {
        const {storeStreaming}=this.props;
        return (
            <View style={{flex:3,backgroundColor:global.backgroundColor23}}>
                <Text text={'Danh sách phim đã chọn'}
                      color={global.yellowColor}
                      size={global.sizeP20}
                      style={{textAlign: 'center', marginBottom: 15}}/>
                {
                    storeStreaming.length > 0? <VerticalListView
                            ItemSeparatorComponent={() => <View
                                style={{
                                    height: 15,
                                    width: "100%",
                                }}
                            />}
                            style={{flex:0}}
                            data={storeStreaming}
                            renderItem={({item, index}) =>
                                <ItemMovieNew disabledClickDetail
                                onClickToRemove={this._removeItemView}
                                onClickToReSee={this._navigateToDetail} isNew={false} item={item}/>

                            }/> :
                        <EmptyView style={{marginTop: height / 3 - 50}} nameIcon={'ios-book'} textDes={'Bạn chưa chọn bất kỳ bộ phim nào'}/>
                }
            </View>
        );
    }

    renderBottom() {
        return (
            <View style={{paddingLeft: width >= 375 ? 15 : 9,
                paddingRight: width >= 375 ? 15 : 9,flexDirection: 'row',
                paddingBottom:10,
                flex:0.5, backgroundColor:global.backgroundColor23,alignItems:'flex-end'}}>
                <ButtonWithIcon
                    onClick={() => this.onCloseModal()}
                    buttonText={'Tiếp tục chọn phim'}
                    style={{
                        margin: 5,
                        height: 40,
                        backgroundColor: global.orangeColor,
                        borderRadius: 20,
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    styleText={{
                        color: global.colorFF,
                        fontSize: global.sizeP15,
                        alignSelf: 'center',
                        textAlign: 'center'
                    }}
                />
                <ButtonWithIcon
                    buttonText={'Bất đầu stream'}
                    style={{
                        margin: 5,
                        height: 40,
                        backgroundColor: global.yellowColor,
                        borderRadius: 20,
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    styleText={{
                        color: global.colorFF,
                        fontSize: global.sizeP15,
                        alignSelf: 'center',
                        textAlign: 'center'
                    }}
                />
            </View>
        );
    }
}

ModalStreaming.defaultProps = {};

ModalStreaming.propTypes = {};
