import global from "../../themes/global";
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    viewContentCount1: {
        flex: 1,
        alignItems: 'center',
        borderLeftWidth: 0.5,
        borderLeftColor: global.darkBlue
    },
    viewContentCount: {
        flex: 1,
        alignItems: 'center',
        borderRightWidth: 0.5,
        borderRightColor: global.darkBlue
    },
    viewCount: {
        flexDirection: 'row',
        justifyContent: 'space-between'},
    btnLogOut: {
        position: 'absolute',
        right: 0,
        top: 0,
        backgroundColor: 'transparent',
        height: null,
        padding: 5
    },
    viewHeaderTop: {
        backgroundColor: global.backgroundColor23,
        padding: 10,
        borderRadius: 10
    },
    containerScreen: {flex: 1, marginTop: 10},
});
export default styles;