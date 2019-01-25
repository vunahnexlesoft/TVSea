import React, {Component} from 'react';
import {View, Animated, Dimensions} from 'react-native';
import styles from './styles';
import ButtonWithIcon from "../../commons/Button/ButtonWithIcon";
import global from "../../themes/global";
import TextComponent from "../../commons/Text/Text";
import * as STRING from "../../themes/string";
import RoundAvatar from "../../commons/Avatar/RoundAvatar";
import Header from "../../modules/Header";
import SkypeIndicator from "react-native-indicators/src/components/skype-indicator/index";
import IconButton from "../../commons/Button/IconButton";
import ItemMovieCategory from "../../modules/ItemMovieCategory";
import VerticalGirdView from "../../modules/VerticalGirdView";
import * as UTIL_FUNCTION from "../../util";
import ItemGenres from "../../modules/ItemGenres";
import * as URL from "../../services/url";
import * as restClient from "../../services/restClient";
import {
    dataFetchingLike,
    dataFetchingLikeFail,
    dataFetchingLikeSuccess
} from "../../redux/ActionCreator/actionLoginCreators";
import ItemReview from "../../modules/ItemReview";
import VerticalListView from "../../modules/VerticalListView";
import EmptyView from "../../modules/EmptyView";
import StreamingModal from "../../modules/ModalStreaming";

const {height, width} = Dimensions.get('window');

export default class AdminView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: false
        };
        this._renderItem = this._renderItem.bind(this);
        this.onAddMovies = this.onAddMovies.bind(this);

    }

    componentDidMount() {
        const {adminAction: {getDataMoviebyCategory}} = this.props;
        getDataMoviebyCategory({page: 1, size: 50, category: 1});

    }

    onAddMovies(item){
        const {adminAction: {updateHistory},storeStreaming} = this.props;
        let check = storeStreaming.map((e) => {
            return e.id
        }).indexOf(item.id) > - 1;
        let data ={
            actionType: check ? 'REMOVE' : 'ADD',
            data: item,
        };
        updateHistory(data);
    }


    _renderItem({item, index}) {
        const{storeStreaming} = this.props;
        let check = storeStreaming.map((e) => {
            return e.id
        }).indexOf(item.id) > - 1;
        return <ItemMovieCategory colorChoose={check} numCol={3} item={item} onClick={this.onAddMovies.bind(this,item)}/>
    }

    render() {
        const{phimle} = this.props.category;
        return (
            <View style={{flex: 1, backgroundColor: global.backgroundColor}}>
                <View style={[{
                    elevation: 2,
                    shadowColor: global.backgroundColor23,
                    backgroundColor: global.backgroundColor23,
                    paddingTop: 5,
                    paddingBottom: 5,
                    paddingRight:10,
                    paddingLeft:10,
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    zIndex: 1,
                    shadowOffset: {width: 0, height: 0},
                    shadowOpacity: 0.4
                }, {opacity: 1}]}>
                    <IconButton nameIcon={'ios-radio-button-on'}
                                onClick={()=> this.refs.modalStreaming.openModal()}
                                iconStyle={{
                                    fontSize: global.sizeP35,
                                    color: global.lightGreen
                                }}
                                btnStyle={{
                                    height: 35,
                                    width: 40,
                                    backgroundColor: 'transparent',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    elevation: 1,
                                    zIndex: 2
                                }}/>
                    <TextComponent text={'Chưa phát sóng'} color={global.colorFF} size={global.sizeP20}/>
                    <IconButton nameIcon={'ios-videocam'}
                                onClick={()=> this.refs.modalStreaming.openModal()}
                                iconStyle={{
                                    fontSize: global.sizeP35,
                                    color: global.colorFF
                                }}
                                badge={this.props.storeStreaming.length}
                                btnStyle={{
                                    height: 35,
                                    width: 40,
                                    backgroundColor: 'transparent',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    elevation: 1,
                                    zIndex: 2
                                }}/>
                </View>
                {
                    !phimle.isLoading ? (phimle.data && phimle.data.length > 0 ? <VerticalGirdView
                            numColumns={3}
                            data={phimle.data}
                            renderItem={this._renderItem}/> :
                            <EmptyView style={{marginTop: height / 2 - 100}} nameIcon={'ios-pulse'}
                                       textDes={'Chưa có dữ liệu phim vui lòng chọn mục khác'}/>)
                        : <SkypeIndicator color={global.yellowColor}/>
                }
                <StreamingModal
                    {...this.props}
                    styleModalPopupCustom={{backgroundColor: 'transparent',
                        borderRadius: 10,
                        paddingTop: 0,
                        width: width, height: height - 50,
                        paddingLeft: 0,
                        paddingRight: 0,
                        paddingBottom: 0,
                        justifyContent: null}}
                    ref={'modalStreaming'}
                />
            </View>
        );
    }
}



