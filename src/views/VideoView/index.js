import React, {
    Component
} from 'react';

import {
    AlertIOS, Animated, Dimensions,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import Video from 'react-native-video';
import styles from './styles';
import localImage from '../../themes/localImage'
import global from "../../themes/global";
import IconButton from "../../commons/Button/IconButton";
import TextComponent from "../../commons/Text/Text";
import ProgressTimeVideo from "../../commons/ProgressBar/ProgressTimeVideo";
import * as UTIL_FUNCTION from '../../util';
import ButtonWithIcon from "../../commons/Button/ButtonWithIcon";
import SkypeIndicator from "react-native-indicators/src/components/skype-indicator/index";
import firebaseUtil from "../../services/firebase";
import firebase from 'react-native-firebase';
import KSYVideo from 'react-native-ksyvideo';
import * as STRING from "../../themes/string";
import ProgressController from "../../commons/Video/ProgressController"
const {height, width} = Dimensions.get('window');

export default class VideoPlayer extends Component {
    constructor(props) {
        super(props);
        this.onLoad = this.onLoad.bind(this);
        this.onLoadStart = this.onLoadStart.bind(this);
        this.onProgress = this.onProgress.bind(this);
        this.onBuffer = this.onBuffer.bind(this);
        this.onClickPropress = this.onClickPropress.bind(this);
        this._onGoBackScreen = this._onGoBackScreen.bind(this);
        this._onCallBack = this._onCallBack.bind(this);
        this.getCurrentTimePercentage = this.getCurrentTimePercentage.bind(this);
        this.onProgressChanged = this.onProgressChanged.bind(this);
    }

    state = {
        rate: 1,
        volume: 1,
        muted: false,
        resizeMode: 'contain',
        duration: 0.0,
        currentTime: 0.0,
        controls: false,
        paused: false,
        ignoreSilentSwitch: null,
        isBuffering: false,
        isLoadingVideo: true,
        counter: 0,
        showbar: true
    };

    componentDidMount() {
        firebase.database().ref(`Channel`).on('value', (snap) => {
            const items = [];
            snap.forEach((child) => {
                let item = child.val();
                item['key'] = child.key;
                items.push(item);
            });
            console.log(items);
            this.setState({
                counter: items.length
            });
        });
    }

    onClickPropress(e) {
        const position = e.nativeEvent.locationX;
        const propress = (position / (width - 110)) * this.state.duration;
        this.video.seek(propress);
        //this.refs.player.seek(propress);
    }

    onLoadStart(data) {
        console.log('onLoadStart');
        this.setState({isLoadingVideo: true})
    }

    onLoad(data) {
        console.log('onLoad');
        this.setState({duration: data.duration, isLoadingVideo: false});
    }

    onProgress(data) {
        this.setState({currentTime: data.currentTime / this.state.duration });
    }

    onBuffer({isBuffering}: { isBuffering: boolean }) {
        this.setState({isBuffering});
    }

    _onGoBackScreen() {
        firebaseUtil.removeNewUserOnline(this.props.userInfo);
        this.props.navigation.goBack()
    }

    _onCallBack() {
        firebaseUtil.getUserOnlineOnStream('Channel', (callback) => {
            if (callback) return callback;
        });
    }

    onProgressChanged(newPercent, paused) {
        if (paused){
            this.setState({paused: !this.state.paused});
        }
        else if (newPercent >= 0)
        {
            let {duration} = this.state;
            if (duration > 0){
                let newTime = newPercent * duration / 100;
                this.setState({currentTime: newTime});
                this.video.seek(newTime);
            }
        }
    }

    getCurrentTimePercentage(currentTime, duration) {
        if (currentTime > 0) {
            return parseFloat(currentTime) / parseFloat(duration);
        } else {
            return 0.0;
        }
    }

    renderNativeSkin() {
        const videoStyle = styles.fullScreen;
        const getTime = Math.floor(this.state.currentTime * this.state.duration);
        const {host, url, type} = this.props.navigation.state.params;
        return (
            <View style={styles.container}>
                {
                    this.state.showbar ? <ButtonWithIcon nameIcon={'ios-arrow-back-outline'}
                                                         onClick={this._onGoBackScreen}
                                                         icoStyle={{
                                                             fontSize: global.sizeP25,
                                                             color: global.colorFF,
                                                             marginRight: 6
                                                         }}
                                                         style={{
                                                             height: 35,
                                                             width: 45,
                                                             borderRadius: 35 / 3,
                                                             backgroundColor: global.grayColor,
                                                             alignItems: 'center',
                                                             justifyContent: 'center',
                                                             position: 'absolute', top: 10, left: 10, zIndex: 1
                                                         }}/> : null
                }
                {
                    this.state.showbar ? (type === "stream" ? <ButtonWithIcon buttonText={"Live: " + this.state.counter} style={{
                        height: 30,
                        //width: 50,
                        paddingHorizontal: 10,
                        borderRadius: 35 / 3,
                        backgroundColor: global.red,
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute', top: 10, right: 10, zIndex: 1
                    }}/> : null) : null
                }
                {/*<Video*/}
                {/*ref={'player'}*/}
                {/*source={{uri: host}}*/}
                {/*style={videoStyle}*/}
                {/*rate={this.state.rate}*/}
                {/*paused={this.state.paused}*/}
                {/*volume={this.state.volume}*/}
                {/*muted={this.state.muted}*/}
                {/*ignoreSilentSwitch={this.state.ignoreSilentSwitch}*/}
                {/*resizeMode={this.state.resizeMode}*/}
                {/*onLoadStart={this.onLoadStart}*/}
                {/*onLoad={this.onLoad}*/}
                {/*onBuffer={this.onBuffer}*/}
                {/*onProgress={this.onProgress}*/}
                {/*// onEnd={() => {*/}
                {/*//     AlertIOS.alert('Done!')*/}
                {/*// }}*/}
                {/*repeat={true}*/}
                {/*controls={this.state.controls}*/}
                {/*/>*/}
                <KSYVideo
                    ref={(video) => {
                        this.video = video
                    }}
                    source={{uri: host}}
                    bufferSize={30}
                    bufferTime={4}
                    paused={this.state.paused}
                    onTouch={() => {
                        this.setState({showbar: !this.state.showbar}
                        )
                    }
                    }
                    timeout={{prepareTimeout: 60, readTimeout: 60}}
                    playInBackground={false}
                    onLoad={this.onLoad}
                    onReadyForDisplay={(data) => {
                        console.log("JS Video render start", data);
                    }}
                    onProgress={this.onProgress}
                    resizeMode={'contain'}
                    style={videoStyle}
                />
                {
                    this.state.showbar ? (type !== "stream" ? <View style={{
                        backgroundColor: global.transparentWhite1,
                        alignSelf: 'center',
                        width: width - 10,
                        bottom: 10,
                        borderRadius: 10,
                        position: 'absolute',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        paddingHorizontal: 10
                    }}>
                        <IconButton nameIcon={!this.state.paused ? 'ios-pause' : 'ios-play'}
                                    onClick={() => this.setState({paused: !this.state.paused})}
                                    iconStyle={{fontSize: global.sizeP30, color: global.colorFF}}/>
                        <ProgressTimeVideo progress={this.state.currentTime} onClick={this.onClickPropress}/>
                        <TextComponent text={UTIL_FUNCTION.secondsToTime(getTime)} color={global.colorFF}/>
                    </View> : null) : null
                }
                {
                    this.state.isLoadingVideo ? <View style={{alignSelf: 'center', height: 100, width: 100}}>
                        <SkypeIndicator color={global.yellowColor}/>
                    </View> : null
                }
            </View>
        );
    }

    render() {
        return this.renderNativeSkin();
    }
}

