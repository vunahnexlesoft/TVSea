import moment from 'moment'
import shallowequal from 'shallowequal';
export const convertText = (value)=>{
    return value.toLowerCase().replace(/\s+/g, '').
    replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a").
    replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e").
    replace(/ì|í|ị|ỉ|ĩ/g,"i").
    replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o")
        .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u")
        .replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y")
        .replace(/đ/g,"d");
};

export const navigateToDetail = (action, navigation, data) =>{
    navigation.push('MoviesDetail',{movie: data.movie});
    action.addUserHistoryMovies(data);
};

export const navigateToViewAll = (action, navigation, data) =>{
    navigation.navigate('ViewAll', {data})
};
export const makeTextReview = (value) =>{
    let text ='';
    switch (value) {
        case 1:
            text = 'Dỡ tệ';
            break;
        case 2:
            text = 'Tạm được';
            break;
        case 3:
            text = 'Hay';
            break;
        case 4:
            text = 'Rất hay';
            break;
        case 5:
            text = 'Tuyệt vời';
            break;
        default: break;
    }
    return text;
};

export const convertTimeToString = (time) =>{
    let inputTime = moment(time).format();
    return moment(inputTime).fromNow();
};

export const compareDifference = (item1, item2) =>{
  return shallowequal(item1, item2);
};

export const secondsToTime = (time) =>{
    return ~~(time / 60) + ":" + (time % 60 < 10 ? "0" : "") + time % 60;
};