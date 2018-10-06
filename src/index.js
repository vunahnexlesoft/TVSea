import React, {Component} from 'react';
import {View, StatusBar, Dimensions,SafeAreaView} from 'react-native';
import configureStore from './redux/Store/configStore'
import {PersistGate} from 'redux-persist/lib/integration/react';
import {Provider} from 'react-redux'
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import global from './themes/global';
const {persistor, store} = configureStore();
import Home from './containers/HomeContainer';
import Discover from './containers/DiscoverContainer';
import Account from './containers/AccountContainer';
import Notification from './containers/NotificationContainer';
import SignIn from './containers/SignInContainer';
import SignUp from './containers/SignUpContainer';
import Search from './containers/SearchContainer';
import VideoItemView from './modules/VideoItemView';
const { height, width } = Dimensions.get('window');

const TabBar = createBottomTabNavigator({
        Home: Home,
        Discover: Discover,
        Search: Search,
        Notification: Notification,
        Account: Account

    }, {
        navigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, tintColor}) => {
                const {routeName} = navigation.state;
                let iconName;
                switch (routeName) {
                    case 'Home':
                        iconName = "ios-sync";
                        break;
                    case 'Discover':
                        iconName = "ios-aperture";
                        break;
                    case 'Search':
                        iconName = "ios-search";
                        break;
                    case 'Notification':
                        iconName = "ios-alert";
                        break;
                    case 'Account':
                        iconName = "ios-contact";
                        break;
                }
                return <Ionicons name={iconName} style={{fontSize: height/20, color: tintColor}}/>;
            },
        }),
        initialRouteName: 'Home',
        lazyLoad: true,
        swipeEnabled: false,
        animationEnabled: false,
        tabBarPosition: 'bottom',
        tabBarOptions: {
            showLabel: false,
            showIcon: true,
            style: {
                backgroundColor: global.blackTab,
                borderTopColor: 'white',
                borderTopWidth: 0.18,
                height: height / 14,
            },
            inactiveTintColor: global.colorA5,
            activeTintColor: global.yellowColor,
            indicatorStyle: {
                backgroundColor: 'transparent',
            },
            pressColor: '#ffff',
        }
    }
);
const RootNavigator = createStackNavigator({
        TabBar: {screen: TabBar},
        Home: {screen: Home},
        Video: {screen: VideoItemView}
    },
    {
        initialRouteName: "TabBar",
        headerMode: "none",
    }
);
export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                        <SafeAreaView style={{flex: 1}}>
                            <RootNavigator/>
                        </SafeAreaView>
                </PersistGate>
            </Provider>
        );
    }
}