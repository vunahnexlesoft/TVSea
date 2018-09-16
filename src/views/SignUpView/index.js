import React, {Component} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import ButtonWithIcon from "../../commons/Button/ButtonWithIcon";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        console.log(this.props.isLoading)
        return (
            <View style={{flex: 1}}>
                <ButtonWithIcon buttonText={'aaaa'}
                                onClick={() => this.props.getData.fetchingDataMoviebyCategory(1, 'Phim lẻ')
                                }/>
                <Text>{this.props.isLoading}</Text>
            </View>
        );
    }
}



