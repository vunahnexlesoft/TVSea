import React, {Commponent} from "react";
import {View, TouchableOpacity, Dimensions, Platform, Image, LayoutAnimation, Alert, Easing} from "react-native";
import ModalOder from '../../commons/Modal/ModalOder'
import global from "../../themes/global";
import SkypeIndicator from "react-native-indicators/src/components/skype-indicator/index";

const {height, width} = Dimensions.get("window");

export default class ModalLoading extends ModalOder {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            animationDuration: 0,
            pressBackToClose: false,
            pressBackgroundClose: false,
            swipeToClose:false,
            numPhone: '',
            data: [],
            easing: null,
        };
        this.openModal = this.openModal.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
    }

    openModal(params) {
        super.openModal();
    }

    onCloseModal() {
        this.closeModal();
    }

    renderHeader() {
        return null
    }

    renderContent() {
        return (
            <SkypeIndicator color={global.yellowColor}/>
        );
    }

    renderBottom() {
        return null
    }
}

ModalLoading.defaultProps = {};

ModalLoading.propTypes = {};
