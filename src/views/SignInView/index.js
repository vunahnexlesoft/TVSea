import React, {Component} from 'react';
import {Animated, Dimensions, Image, View, KeyboardAvoidingView,Alert,ImageBackground,AsyncStorage} from 'react-native';
import styles from './styles';
import ButtonWithIcon from "../../commons/Button/ButtonWithIcon";
import global from "../../themes/global";
import Text from "../../commons/Text/Text";
import {NavigationActions,StackActions }from 'react-navigation';
import localImage from "../../themes/localImage";
import TextSingleInput from "../../commons/TextInput/TextSingleInput";
import IconButton from "../../commons/Button/IconButton";
import SkypeIndicator from "react-native-indicators/src/components/skype-indicator/index";
import * as UTIL_FUNCTION from "../../util";
const {height, width} = Dimensions.get('window');

export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.onClickLogin = this.onClickLogin.bind(this);
    }

    state = {
        email: '',
        password: '',
        isWarningEmail: false,
        isWarningPassword: false,
        warningEmail: '',
        warningPassword: ''
    };
    componentWillMount() {
        AsyncStorage.getItem("REMEMBER.ME", (result) => {
        }).then(result => {
            let {email, password} = JSON.parse(result);
            this.setState({
                email,
                password
            });
        }).catch(error => {
            console.log("AsyncStorage.getItem error: ", error);
        });
    }
    onClickLogin() {
        const {userInfoAction: {postDataLogin}, isLoading, isError} = this.props;
        const {email, password} = this.state;
        let params = {
            email,
            password
        };
        if (!isLoading && email && password) {
            postDataLogin(params).then(res => {
                if (res.success) {
                    AsyncStorage.setItem("REMEMBER.ME", JSON.stringify({email, password})).catch(error => {
                        console.log("AsyncStorage.setItem error:", error);
                    });
                    const resetAction = StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({ routeName: 'TabBar' })],
                    });
                    this.props.navigation.dispatch(resetAction);
                   // this.props.navigation.navigate('TabBar');
                } else {
                    Alert.alert(
                        null,
                        'Email hoặc mật khẩu không đúng vui lòng kiểm tra lại',
                        [
                            {
                                text: 'OK', onPress: () => {}
                            },
                        ],
                        {cancelable: false}
                    );
                }
            })
        } else {
            if(!email){
                this.setState({isWarningEmail: true, warningEmail: 'Email không được để trống'})
            }
            if(!password){
                this.setState({isWarningPassword: true, warningPassword: 'Mật khẩu không được để trống'})
            }
        }
    }

    render() {
        const {isLoading, isError} = this.props;
        return (
            <ImageBackground style={{
                flex: 1,
                backgroundColor: global.backgroundColor23,
                paddingLeft: 20,
                paddingRight: 20,
                alignItems: 'center',
                zIndex:1
            }} blurRadius={5} source={localImage.background}>
                {
                    !isLoading ? <View style={{
                        alignItems: 'center',
                        zIndex:1
                    }}>
                        <KeyboardAvoidingView behavior="padding" enabled style={{
                            alignItems: 'center'
                        }}>
                            <Image
                                resizeMode={'cover'}
                                style={{
                                    width: 80,
                                    height: 80,
                                    borderRadius: 70 / 4,
                                    alignSelf: 'center',
                                    marginTop: width / 2 - 70
                                }}
                                source={localImage.icApp}/>
                            <View style={{marginTop: 20}}>
                                <TextSingleInput styleForm={{
                                    height: height / 15,
                                    flexDirection: 'row',
                                    backgroundColor: 'transparent',
                                    borderWidth: 1,
                                    borderColor: global.colorFF,//global.darkBlue,
                                    borderRadius: 8, alignItems: 'center'
                                }}
                                                 warning={this.state.isWarningEmail}
                                                 textWarning={this.state.warningEmail}
                                                 value={this.state.email}
                                                 onChangeText={(email) => this.setState({email, isWarningEmail: false})}
                                                 placeholder={'Email'}
                                                 placeholderTextColor={global.colorFF}//{global.darkBlue}
                                                 styleIcon={{color: global.colorFF}}
                                                 styleDivider={{backgroundColor: global.colorFF}}
                                                 style={{fontSize: global.sizeP18, color: global.colorFF}}
                                                 nameIcon={'ios-mail'}/>

                                <TextSingleInput styleForm={{
                                    height: height / 15,
                                    flexDirection: 'row',
                                    backgroundColor: 'transparent',
                                    borderWidth: 1,
                                    borderColor: global.colorFF,//global.darkBlue,
                                    borderRadius: 8, alignItems: 'center'
                                }}
                                                 warning={this.state.isWarningPassword}
                                                 textWarning={this.state.warningPassword}
                                                 value={this.state.password}
                                                 onChangeText={(password) => this.setState({password,isWarningPassword: false})}
                                                 placeholder={'Mật khẩu'}
                                                 secureTextEntry
                                                 placeholderTextColor={global.colorFF}//{global.darkBlue}
                                                 styleIcon={{color: global.colorFF}}
                                                 styleDivider={{backgroundColor: global.colorFF}}
                                                 style={{fontSize: global.sizeP18, color: global.colorFF}}
                                                 nameIcon={'ios-lock'}/>
                            </View>
                            <ButtonWithIcon buttonText={'Đăng nhập'.toUpperCase()}
                                            styleText={{fontSize: global.sizeP16, fontWeight: "700"}}
                                            onClick={this.onClickLogin}
                                            style={{
                                                backgroundColor: global.yellowColor,
                                                marginTop: 20,
                                                height: 40,
                                                width: width / 2 - 30,
                                                borderWidth: 0,
                                                borderRadius: 20
                                            }}/>
                        </KeyboardAvoidingView>

                        <View style={{justifyContent: 'flex-end', flex: 1, alignItems: 'center'}}>
                            <ButtonWithIcon nameIcon={'logo-facebook'}
                                            buttonText={'Facebook'}
                                            onClick={this.onGoBack}
                                            icoStyle={{
                                                fontSize: global.sizeP25,
                                                color: global.colorFF,
                                                margin: 0,
                                                marginRight: 10,
                                                marginTop: 3
                                            }}
                                            style={{
                                                height: 35,
                                                width: width / 2 - 10,
                                                borderRadius: 8,
                                                backgroundColor: global.colorBlackBlue,
                                                borderColor: 'transparent',
                                                borderWidth: 0,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                paddingRight: 3,
                                                paddingTop: 2,
                                                zIndex: 2
                                            }}/>
                            <ButtonWithIcon buttonText={'Đăng ký tài khoản miễn phí'}
                                            styleText={{fontSize: global.sizeP16}}
                                            onClick={() => this.props.navigation.navigate('SignUp')}
                                            style={{
                                                backgroundColor: 'transparent',
                                                marginTop: 8,
                                                marginBottom: 10,
                                                height: 40,
                                                borderWidth: 0,
                                            }}/>
                        </View>
                    </View> : <SkypeIndicator color={global.yellowColor}/>
                }
            </ImageBackground>
        );
    }
}



