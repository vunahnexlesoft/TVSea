import React, {Commponent} from "react";
import {View, TouchableOpacity, Dimensions, Platform, Image, LayoutAnimation, Alert, Easing} from "react-native";
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
import * as restClient from "../../services/restClient";
import {dataFetchingCategoryFail, dataFetchingCategorySuccess} from "../../redux/ActionCreator/actionAdminCreator";
import * as URL from "../../services/url";
import ModalLoading from "../ModalLoading";
const IS_IOS = Platform.OS === "ios";

const {height, width} = Dimensions.get("window");

export default class ModalStreaming extends ModalOder {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            animationDuration: 150,
            numPhone: '',
            data: [],
            easing: null,
            backdropOpacity: 0.95,
            loading:false
        };
        this.openModal = this.openModal.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
        this.onClickStreaming = this.onClickStreaming.bind(this);
        this.renderCenter = false;
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
                {text: 'Không', onPress: () => console.log('Cancel Pressed'), style: IS_IOS ? 'cancel' : 'negative'},
                {
                    text: 'Có', onPress: () => {
                        this.props.cartAction.deleteItemCheck(item.id)
                    }
                },
            ],
            {cancelable: false}
        )
    }

    renderHeader() {
        return (
            <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent'}}>
                <IconButton nameIcon={'ios-arrow-down'}
                            onClick={() => this.onCloseModal()}
                            iconStyle={{
                                fontSize: global.sizeP35,
                                color: global.colorFF
                            }}
                            btnStyle={{
                                height: 25,
                                marginBottom: 10,
                                width: 40,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}/>
            </View>
        );
    }

    renderContent() {
        const {storeStreaming} = this.props;
        return (
            <View style={{flex: 3, backgroundColor: global.backgroundColor23}}>
                <Text text={'Danh sách phim đã chọn'}
                      color={global.yellowColor}
                      size={global.sizeP20}
                      style={{textAlign: 'center', marginBottom: 15}}/>
                {
                    storeStreaming.length > 0 ? <VerticalListView
                            ItemSeparatorComponent={() => <View
                                style={{
                                    height: 15,
                                    width: "100%",
                                }}
                            />}
                            style={{flex: 0}}
                            data={storeStreaming}
                            renderItem={({item, index}) =>
                                <ItemMovieNew disabledClickDetail
                                              disabledSwipe
                                              disabledClick
                                              isAdmin
                                              isNew
                                              isVisible={!this.props.isStreaming}
                                              onClick={()=> this.props.onAddMovies(item)}
                                              styleButton={{paddingRight: 25, paddingLeft: 25}}
                                              item={item}/>

                            }/> :
                        <EmptyView style={{marginTop: height / 3 - 50}} nameIcon={'ios-book'}
                                   textDes={'Bạn chưa chọn bất kỳ bộ phim nào'}/>
                }
                <ModalLoading
                    visible={this.state.loading}
                    styleModalPopupCustom={{backgroundColor: 'transparent'}}
                    ref={'modalLoading'}
                />
            </View>
        );
    }

    onClickStreaming(){
        const {adminAction: {getDataMoviebyCategory,updateStateStreaming}, storeStreaming} = this.props;
        console.log(storeStreaming);
        let params = {
            movies: storeStreaming
        };
        console.log('start streaming');
        let url = URL.base_url + URL.POST_START_STREAMING;
        this.setState({
            loading:true
        },()=>{
            restClient.excuteAPI("post",url, null, null , params).then(res =>{
                if(res.success){
                    updateStateStreaming(true);
                    this.setState({
                        loading: false
                    },()=>{
                        this.onCloseModal();
                    });
                }else{
                    this.setState({
                        loading:false
                    });
                    Alert.alert(
                        null,
                        'Đã có lỗi xảy ra vui lòng thử lại',
                        [
                            {text: 'OK', onPress: () => console.log('Cancel Pressed'),style: IS_IOS ? 'destructive' : 'positive'},
                        ],
                        {cancelable: false}
                    )
                }
            });
        });
    }
    renderBottom() {
        return (
            <View style={{
                paddingLeft: width >= 375 ? 15 : 9,
                paddingRight: width >= 375 ? 15 : 9, flexDirection: 'row',
                paddingBottom: 10,
                flex: 0.5, backgroundColor: global.backgroundColor23, alignItems: 'flex-end'
            }}>
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
                    onClick={() => this.props.isStreaming ? this.props.onClickCloseStreaming() : this.onClickStreaming()}
                    buttonText={this.props.isStreaming ? 'Hủy phát' : 'Bất đầu phát'}
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
