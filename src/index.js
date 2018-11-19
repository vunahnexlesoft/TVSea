import React, {Component} from 'react';
import {View, StatusBar, Dimensions, SafeAreaView} from 'react-native';
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
import History from './containers/HistoryContainer';
import SignIn from './containers/SignInContainer';
import SignUp from './containers/SignUpContainer';
import Search from './containers/SearchContainer';
import MoviesDetail from './containers/MoviesDetailContainer';
import VideoItemView from './modules/VideoItemView';
import Video from './containers/VideoContainer';
import ViewAll from './containers/ViewAllContainer';
import moment from 'moment';
moment.updateLocale("en", {
    relativeTime: {
        future: "sau đó %s",
        past: "%s trước",
        s: "1 giây",
        ss: "%d giây",
        m: "1 phút",
        mm: "%d phút",
        h: "1 giờ",
        hh: "%d giờ",
        d: "1 ngày",
        dd: "%d ngày",
        M: "1 tháng",
        MM: "%d tháng",
        y: "1 năm",
        yy: "%d năm"
    }
});
const {height, width} = Dimensions.get('window');

const TabBar = createBottomTabNavigator({
        Home: Home,
        Discover: Discover,
        Search: Search,
        History: History,
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
                    case 'History':
                        iconName = "ios-copy";
                        break;
                    case 'Account':
                        iconName = "ios-contact";
                        break;
                }
                return <Ionicons name={iconName} style={{fontSize: height / 20, color: tintColor}}/>;
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
        Video: {screen: Video},
        MoviesDetail: {screen: MoviesDetail},
        ViewAll: {screen: ViewAll}
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
                    <SafeAreaView style={{flex: 1, backgroundColor:global.blackTab}}>
                        <RootNavigator/>
                    </SafeAreaView>
                </PersistGate>
            </Provider>
        );
    }
}