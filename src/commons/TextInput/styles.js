import {StyleSheet, Dimensions} from 'react-native';
import global from "../../Styles/global";

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
    //  warningWrapper
    footerWarningWrapper: {
        flexDirection: "row",
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
        height: 20,
        backgroundColor: "red",
       alignItems: "center",
        justifyContent: "center"
    },
    textFooterWarning: {
        color: 'white',
        fontSize: global.sizeP13,
        fontFamily: global.fontRegular,
        //paddingLeft: 5,
    },
    divider: {
        height: 33,
        width: 1,
        backgroundColor: global.colorA5,
        marginLeft: 10,
        marginRight: 10,
        alignSelf:'center'
    },
    borderWarning:{
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "red",
       // width: '80%',
    }
});
export default styles;