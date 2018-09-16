import {StyleSheet, Dimensions, Platform} from "react-native";

const {height, width} = Dimensions.get('window');
import global from '../../themes/global';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabItemContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    tabbar: {
        backgroundColor: 'transparent',
        overflow: 'hidden',
        height: undefined,
        justifyContent: 'space-between',
    },
    tab: {
        justifyContent: 'space-between',
        height: 35,
        width: width / 5
    },
    indicator: {
        backgroundColor: global.colorTextPrimary,
        height: 3,
        width: 60,
        margin: Platform.OS === 'ios' ? 8 : 10,
        alignSelf: 'center',
        flex: 1
    },
    label: {
        fontSize: 13,
        color: global.colorTextPrimary
    },
});
export default styles;
