/**
 * Created by hieult on 1/3/18.
 */

import React, {Commponent} from "react";
import {View, TouchableOpacity} from "react-native";
import Modal from "./Modal";
import PropTypes from "prop-types";
import styles from "./styles";

export default class ModalOder extends Modal {

    constructor(props) {
        super(props);
        this.renderPopup = this.renderPopup.bind(this);
    }


    renderBottom() {
        return null;
    }

    renderHeader(){
        return null;
    }

    renderContent(){
        return null;
    }

    renderPopup() {
        return (
            <View style={[styles.modalOder,this.props.styleModalPopupCustom]}>
                {this.renderHeader()}
                {this.renderContent()}
                {this.renderBottom()}
            </View>
        );
    }

    render() {
        return super.render(this.renderPopup, true);
    }
}

ModalOder.defaultProps = {
};

ModalOder.propTypes = {
    styleModalPopupCustom: PropTypes.oneOfType([PropTypes.number,PropTypes.object,PropTypes.array]),
};
