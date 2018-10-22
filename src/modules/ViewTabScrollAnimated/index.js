import React, {Component} from 'react';
import {View, LayoutAnimation, Dimensions, ScrollView, Animated, Platform, StatusBar} from 'react-native';
import styles from './styles';
import global from "../../themes/global";
import * as STRING from '../../themes/string';
import Header from "../../modules/Header";
import TabItems from "../../modules/TabItems";
const HeaderAnimated = Animated.createAnimatedComponent(Header);
const {height, width} = Dimensions.get('window');
const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const statusBarHeight = Platform.select({
    ios: 24,
    android: StatusBar.currentHeight
});
const headerHeight = 84 - statusBarHeight;

export default class ViewTabScrollAnimated extends Component {
    constructor(props) {
        super(props);
        this.scrollY = new Animated.Value(0);
    }
    render() {
        const headerTranslate = this.scrollY.interpolate({
            inputRange: [0, 70],
            outputRange: [70, 0],
            extrapolate: 'clamp',
        });
        const Opacity = this.scrollY.interpolate({
            inputRange: [0, 20, 30],
            outputRange: [1, 0.5, 0],
            extrapolate: 'clamp',
        });
        const animatedYHeader = this.scrollY.interpolate({
            inputRange: [0, headerHeight],
            outputRange: [0, 30],
            extrapolate: 'clamp',
        });
        const{textHeader, textDate, numTab,renderScene,routes,index,onIndexChange} = this.props;
        return (
            <View style={{flex: 1, backgroundColor: global.backgroundColor}}>
                <Animated.View style={{zIndex: 0,position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    overflow: 'hidden', opacity: Opacity, transform :[{translateY: animatedYHeader}]}}>
                    <HeaderAnimated date={textDate}
                                    heading={textHeader}/>
                </Animated.View>

                <Animated.View style={[{zIndex: 2},
                    {transform: [{translateY: headerTranslate}]},
                ]}>
                    <TabItems
                        routes={routes}
                        onIndexChange={onIndexChange}
                        selectedTabItem={index}
                        isUpperCase
                        numTab={numTab}
                        styleText={{fontSize: global.sizeP14, fontWeight: '700'}}
                        styleTab={{
                            height: height / 15,
                            width: width,
                            backgroundColor: global.backgroundColor
                        }}
                    />
                </Animated.View>
                <View style={{
                    flex: 1,
                    marginRight: 10,
                    marginLeft: 10,
                    zIndex: 1
                }}>
                    <Animated.ScrollView
                        style={{flex: 1}}
                        showsVerticalScrollIndicator={false}
                        scrollEventThrottle={16}
                        contentContainerStyle={{paddingTop: height/ 15}}
                        removeClippedSubviews={false}
                        onScroll={Animated.event(
                            [
                                {
                                    nativeEvent: {contentOffset: {y: this.scrollY}}
                                }
                            ], {useNativeDriver: true}
                        )}>
                        <View style={{
                            flex: 1,
                            zIndex: 1,
                            marginTop: 20
                        }}>
                            {renderScene}
                        </View>
                    </Animated.ScrollView>
                </View>
            </View>
        );
    }
}



