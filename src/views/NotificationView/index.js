import React, {Component} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import ButtonWithIcon from "../../commons/Button/ButtonWithIcon";
import TextComponent from "../../commons/Text/Text";
import global from "../../themes/global";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={{flex: 1,backgroundColor: global.backgroundColor}}>
                <TextComponent text={'Notification'}/>
            </View>
        );
    }
}



