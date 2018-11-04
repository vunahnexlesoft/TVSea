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
const {height, width} = Dimensions.get("window");

export default class ReviewModal extends ModalOder {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            animationDuration: 150,
            numPhone: '',
            note: '',
            total:'',
            warning: false,
            rating: 4,
        };
        this.openModal = this.openModal.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
        this.onAddCartToSever = this.onAddCartToSever.bind(this);
    }

    openModal(params) {
        super.openModal();
    }

    onCloseModal() {
        this.setState({
            warning: false
        });
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
            <View>
                <Text text={'Đánh giá: ' + UTIL_FUCTION.makeTextReview(this.state.rating)}
                      color={global.colorF3}
                      size={global.sizeP20}
                      style={{textAlign: 'center', marginBottom: 15}}/>
            </View>
        );
    }

    renderContent() {
        return (
            <View style={{alignItems:'center'}}>
                    <Rating
                        onChange={rating => this.setState({rating})}
                        selectedStar={localImage.icStar}
                        initial={this.state.rating}
                        unselectedStar={localImage.icStarUnFill}
                        config={{
                            easing: Easing.inOut(Easing.ease),
                            duration: 350
                        }}
                        stagger={80}
                        maxScale={1.1}
                        starStyle={{
                            marginHorizontal:5,
                            width: 32,
                            height: 32
                        }}
                        containerStyle={{marginBottom: 10, flexDirection: 'row'}}
                    />
                <TextInput
                    styleForm={{
                        backgroundColor: 'transparent',
                        borderWidth: 1,
                        borderColor: global.darkBlue,
                        borderRadius: 8, alignItems: 'center'
                    }}
                    value={this.state.note}
                    onChangeText={input => this.setState({note: input})}
                    nameIcon={'ios-clipboard-outline'}
                    placeholderTextColor={global.darkBlue}
                    style={{textAlignVertical: "top",fontSize: global.sizeP15, color: global.colorFF}}
                    placeholder={'Nhập vào bình luận của bạn'}
                    multiline={true}
                    maxLength={250}
                    returnKeyType={'done'}
                    returnKeyLabel={'Done'}
                    keyboardType={'email-address'}
                    numberOfLines={4}/>

            </View>
        );
    }

    renderBottom() {
        return (
            <View style={{flexDirection: 'row'}}>
                <ButtonWithIcon
                    onClick={() => this.onCloseModal()}
                    buttonText={'Tiếp tục xem phim'}
                    style={{
                        margin: 5,
                        height: 40,
                        backgroundColor: global.colorF3,
                        borderRadius: 20,
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    styleText={{
                        color: global.colorTextPrimary,
                        fontSize: global.sizeP14,
                        alignSelf: 'center',
                        textDecorationLine: 'underline',
                        textAlign: 'center'
                    }}
                />
                <ButtonWithIcon
                    onClick={() => this.onAddCartToSever()}
                    buttonText={'Gửi bình luận'}
                    style={{
                        margin: 5,
                        height: 40,
                        backgroundColor: global.colorBlackBlue,
                        borderRadius: 20,
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    styleText={{
                        color: global.colorFF,
                        fontSize: global.sizeP14,
                        alignSelf: 'center',
                        textDecorationLine: 'underline',
                        textAlign: 'center'
                    }}
                />
            </View>
        );
    }
}

ReviewModal.defaultProps = {};

ReviewModal.propTypes = {};
