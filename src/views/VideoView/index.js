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
const {height, width} = Dimensions.get('window');

export default class VideoPlayer extends Component {
    constructor(props) {
        super(props);
        this.onLoad = this.onLoad.bind(this);
        this.onLoadStart = this.onLoadStart.bind(this);
        this.onProgress = this.onProgress.bind(this);
        this.onBuffer = this.onBuffer.bind(this);
        this.onClickPropress = this.onClickPropress.bind(this);
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
        isLoadingVideo: false
    };
    onClickPropress(e){
        const position = e.nativeEvent.locationX;
        const propress = (position / (width - 110))*  this.state.duration;
        this.refs.player.seek(propress);
    }
    onLoadStart(data){
        console.log('onLoadStart');
        this.setState({isLoadingVideo: true})
    }
    onLoad(data) {
        console.log('onLoad');
        this.setState({duration: data.duration, isLoadingVideo: false});
    }

    onProgress(data) {
        console.log('onProgress');
        this.setState({currentTime: data.currentTime / this.state.duration});
    }

    onBuffer({isBuffering}: { isBuffering: boolean }) {
        this.setState({isBuffering});
    }

    renderNativeSkin() {
        const videoStyle = styles.fullScreen;
        const getTime = Math.floor(this.state.currentTime * this.state.duration);
        const {host, url} = this.props.navigation.state.params;
        console.log('isLoadingVideo',this.state.isLoadingVideo);
        return (
            <View style={styles.container}>
                <ButtonWithIcon nameIcon={'ios-arrow-back-outline'}
                                onClick={() => this.props.navigation.goBack()}
                                icoStyle={{
                                    fontSize: global.sizeP25,
                                    color: global.colorFF,
                                    marginRight:6
                                }}
                                style={{
                                    height: 35,
                                    width: 45,
                                    borderRadius: 35 / 3,
                                    backgroundColor: global.grayColor,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'absolute', top: 10, left: 10, zIndex: 1
                                }}/>
                <Video
                    ref={'player'}
                    source={{uri: host}}
                    //source={localImage.icVideos}
                    style={videoStyle}
                    poster={url}
                    rate={this.state.rate}
                    paused={this.state.paused}
                    volume={this.state.volume}
                    muted={this.state.muted}
                    ignoreSilentSwitch={this.state.ignoreSilentSwitch}
                    resizeMode={this.state.resizeMode}
                    onLoadStart={this.onLoadStart}
                    onLoad={this.onLoad}
                    onBuffer={this.onBuffer}
                    onProgress={this.onProgress}
                    onEnd={() => {
                        AlertIOS.alert('Done!')
                    }}
                    repeat={true}
                    controls={this.state.controls}
                />
                {
                    this.state.isLoadingVideo ? <View style={{flex:1,position:'absolute', top:0, bottom: 0, left: 0, right:0,zIndex:1}}>
                        <SkypeIndicator color={global.yellowColor}/>
                    </View> : null
                }
                <View style={{
                    backgroundColor: global.transparentWhite1,
                    alignSelf:'center',
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
                </View>
            </View>
        );
    }

    render() {
        return this.renderNativeSkin();
    }
}

