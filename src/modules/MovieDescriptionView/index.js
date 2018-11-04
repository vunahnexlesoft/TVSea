import React, {Component} from 'react';
import {View, Dimensions, ImageBackground} from 'react-native';
import global from "../../themes/global";
import PropTypes from "prop-types";
import Video from 'react-native-video';
import localImage from '../../themes/localImage'
import IconButton from "../../commons/Button/IconButton";
import TextComponent from "../../commons/Text/Text";
import ButtonWithIcon from "../../commons/Button/ButtonWithIcon";

const {height, width} = Dimensions.get('window');

class MovieDescriptionView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowMore: false
        };
        this.onShowMore = this.onShowMore.bind(this);
    }

    onShowMore() {
        this.setState({
            isShowMore: !this.state.isShowMore
        })
    }

    render() {
        const {title, partAndEpisode, releaseDate, languageAndRuntime, overview, rating, style} = this.props;
        return (
            <View style={[{flex: 1, zIndex: 1}, style]}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'row',alignItems:'center',}}>
                        <TextComponent color={global.colorFF}
                                       size={global.sizeP18}
                                       text={title}/>
                        <ImageBackground source={localImage.icStar}
                                         style={{width: 30, height: 30,marginLeft:5,alignItems: 'center', justifyContent: 'center'}}>
                            <TextComponent color={global.colorFF}
                                           size={global.sizeP14}
                                           style={{textAlign: 'center', lineHeight: global.sizeP14}}
                                           text={rating}/>
                        </ImageBackground>
                    </View>

                    <TextComponent color={global.colorBlackBlue}
                                   style={{marginRight: 10}}
                                   size={global.sizeP18}
                                   text={partAndEpisode}/>
                </View>

                <TextComponent color={global.colorBlackBlue}
                               size={global.sizeP18}
                               text={releaseDate}/>
                <TextComponent style={{marginTop: 3, marginBottom: 3}}
                               color={global.colorFF}
                               size={global.sizeP14}
                               text={languageAndRuntime}/>
                <TextComponent numberOfLines={this.state.isShowMore ? 50 : 5}
                               color={global.grayColor}
                               text={overview}/>
                {
                    overview.length >= 250 ? <ButtonWithIcon buttonText={this.state.isShowMore ? 'Đóng' : 'Xem thêm'}
                                                             onClick={this.onShowMore}
                                                             styleText={{
                                                                 color: global.colorFF,
                                                                 fontSize: global.sizeP15
                                                             }}
                                                             style={{
                                                                 backgroundColor: 'transparent',
                                                                 height: null,
                                                                 alignSelf: 'center',
                                                                 marginTop: 10,
                                                                 paddingTop: 5,
                                                                 paddingBottom: 7,
                                                                 paddingLeft: 10,
                                                                 paddingRight: 10
                                                             }}/> : null
                }

            </View>

        );
    }
}

MovieDescriptionView.defaultProps = {
    title: '',
    partAndEpisode: '',
    releaseDate: '',
    languageAndRuntime: '',
    overview: ''
};
MovieDescriptionView.propTypes = {
    title: PropTypes.string,
    partAndEpisode: PropTypes.string,
    releaseDate: PropTypes.string,
    languageAndRuntime: PropTypes.string,
    overview: PropTypes.string,
    style: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
};

export default MovieDescriptionView;


