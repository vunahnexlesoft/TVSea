import React, {Component} from 'react';
import {Animated, Dimensions, Image, View, Keyboard, KeyboardAvoidingView, Alert} from 'react-native';
import styles from './styles';
import ButtonWithIcon from "../../commons/Button/ButtonWithIcon";
import global from "../../themes/global";
import Text from "../../commons/Text/Text";
import localImage from "../../themes/localImage";
import TextSingleInput from "../../commons/TextInput/TextSingleInput";
import IconButton from "../../commons/Button/IconButton";
import {postDataLogin, postDataRegister} from "../../redux/ActionCreator/actionUserInfoCreator";

const {height, width} = Dimensions.get('window');

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.onClickRegister = this.onClickRegister.bind(this);
    }

    state = {
        name:'',
        email: '',
        password: '',
        isWarningEmail: false,
        isWarningPassword: false,
        isWarningName: false,
        warningName: '',
        warningPassword: '',
        warningEmail: '',
    };

    onClickRegister(){
        const {userInfoAction: {postDataRegister,postDataLogin}, isLoading, isError} = this.props;
        let params = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        };
        Keyboard.dismiss();
        if (!isLoading && params.name && params.email && params.password) {
            postDataRegister(params).then(res => {
                if (res.success) {
                    let params = {
                        email: res.data.email,
                        password: res.data.password
                    };
                    postDataLogin(params).then(res => {
                        if (res.success) {
                            this.props.navigation.navigate('TabBar');
                        }else{
                            alert(res.message)
                        }
                    });
                } else {
                    Alert.alert(
                        null,
                        'Tên hiện thị, email hoặc mật khẩu không đúng vui lòng kiểm tra lại',
                        [
                            {
                                text: 'OK', onPress: () => {}
                            },
                        ],
                        {cancelable: false}
                    );
                }
            })
        }else {
            if(!params.email){
                this.setState({isWarningEmail: true, warningEmail: 'Email không được để trống'})
            }
            if(!params.password){
                this.setState({isWarningPassword: true, warningPassword: 'Mật khẩu không được để trống'})
            }
            if(!params.name){
                this.setState({isWarningName: true, warningName: 'Tên hiện thị không được để trống'})
            }
        }
    }
    render() {
        return (
            <KeyboardAvoidingView behavior="padding" enabled style={{
                flex: 1,
                backgroundColor: global.backgroundColor23,
                paddingLeft: 20,
                paddingRight: 20,
                alignItems: 'center'
            }}>
                <Text text={'Vui lòng nhập thông tin bên dưới'} color={global.colorFF} size={global.sizeP30}
                      numberOfLines={2}
                      style={{
                          alignSelf: 'center',
                          width: width / 2 + 70,
                          marginTop: width / 2 - 70, textAlign: 'center'
                      }}/>
                <View style={{marginTop: 20}}>
                    <TextSingleInput styleForm={{
                        height: height / 15,
                        flexDirection: 'row',
                        backgroundColor: 'transparent',
                        borderWidth: 1,
                        borderColor: global.darkBlue,
                        borderRadius: 8, alignItems: 'center'
                    }}
                                     warning={this.state.isWarningName}
                                     textWarning={this.state.warningName}
                                     value={this.state.name}
                                     onChangeText={(name) => this.setState({name,isWarningName: false})}
                                     placeholder={'Họ & tên'}
                                     placeholderTextColor={global.darkBlue}
                                     style={{fontSize: global.sizeP18, color: global.colorFF}}
                                     nameIcon={'ios-contact'}/>
                    <TextSingleInput styleForm={{
                        height: height / 15,
                        flexDirection: 'row',
                        backgroundColor: 'transparent',
                        borderWidth: 1,
                        borderColor: global.darkBlue,
                        borderRadius: 8, alignItems: 'center'
                    }}
                                     warning={this.state.isWarningEmail}
                                     textWarning={this.state.warningEmail}
                                     value={this.state.email}
                                     onChangeText={(email) => this.setState({email,isWarningEmail:false})}
                                     placeholder={'Email'}
                                     placeholderTextColor={global.darkBlue}
                                     style={{fontSize: global.sizeP18, color: global.colorFF}}
                                     nameIcon={'ios-mail'}/>

                    <TextSingleInput styleForm={{
                        height: height / 15,
                        flexDirection: 'row',
                        backgroundColor: 'transparent',
                        borderWidth: 1,
                        borderColor: global.darkBlue,
                        borderRadius: 8, alignItems: 'center'
                    }}
                                     warning={this.state.isWarningPassword}
                                     textWarning={this.state.warningPassword}
                                     value={this.state.password}
                                     onChangeText={(password) => this.setState({password, isWarningPassword:false})}
                                     placeholder={'Mật khẩu'}
                                     secureTextEntry
                                     placeholderTextColor={global.darkBlue}
                                     style={{fontSize: global.sizeP18, color: global.colorFF}}
                                     nameIcon={'ios-lock'}/>
                </View>
                <ButtonWithIcon buttonText={'Xác nhận'.toUpperCase()}
                                styleText={{fontSize: global.sizeP16}}
                                onClick={this.onClickRegister}
                                style={{
                                    backgroundColor: global.grayDarkColor,
                                    marginTop: 20,
                                    height: 40,
                                    width: width / 2 - 30,
                                    borderWidth: 0,
                                    borderRadius: 20
                                }}/>
                <View style={{justifyContent: 'flex-end', flex: 1, alignItems: 'center'}}>
                    <ButtonWithIcon buttonText={'Tôi đã đọc và đồng ý với các điều khoản sử dụng của TVs'}
                                    styleText={{fontSize: global.sizeP16}}
                                    style={{
                                        backgroundColor: 'transparent',
                                        marginTop: 8,
                                        marginBottom: 10,
                                        height: 40,
                                        borderWidth: 0,
                                    }}/>
                </View>
                <ButtonWithIcon nameIcon={'ios-arrow-back-outline'}
                                onClick={() => this.props.navigation.goBack()}
                                icoStyle={{
                                    fontSize: this.state.isShowHeader ? global.sizeP30 : global.sizeP25,
                                    color: global.colorFF,
                                    margin: 0
                                }}
                                style={{
                                    height: 35,
                                    width: 45,
                                    borderRadius: 40 / 3,
                                    backgroundColor: this.state.isShowHeader ? null : global.transparentWhite50,
                                    borderColor: 'transparent',
                                    position:'absolute',
                                    top: 10, left: 10,
                                    borderWidth: 0,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    paddingRight: 3,
                                    paddingTop: 2,
                                    zIndex: 2
                                }}/>
            </KeyboardAvoidingView>
        );
    }
}



