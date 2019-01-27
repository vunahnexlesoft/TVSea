import moment from 'moment'
import shallowequal from 'shallowequal';
export const convertText = (value)=>{
    return value.toLowerCase().
    replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a").
    replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e").
    replace(/ì|í|ị|ỉ|ĩ/g,"i").
    replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o")
        .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u")
        .replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y")
        .replace(/đ/g,"d");
    // return value.toLowerCase().replace(/\s+/g, '').
    // replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a").
    // replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e").
    // replace(/ì|í|ị|ỉ|ĩ/g,"i").
    // replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o")
    //     .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u")
    //     .replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y")
    //     .replace(/đ/g,"d");
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
export function isEmptyString(str) {
    return str == undefined || str === "" || str === "";
}
export function isValidPassword(password) {
    let validationString = "Password: ";
    let lengthAlert = "Must be between 6 - 20 characters. ";
    let numberAlert = "Must have a number. ";
    let capitalAlert = "Must have a capital letter. ";

    let isValid =
        !isEmptyString(password) &&
        (password.length >= 6// &&
            // password.length <= 20 &&
            // /\d/.test(password) //&&
            // password.match(new RegExp("[A-Z]"))
        );

    if (!(password.length >= 6 && password.length <= 20)) {
        validationString += lengthAlert;
    }
    if (!/\d/.test(password)) {
        validationString += numberAlert;
    }
    if (!password.match(new RegExp("[A-Z]"))) {
        validationString += capitalAlert;
    }

    return [isValid, validationString];
}

export function isValidEmail(email) {
    let reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    return !isEmptyString(email) && reg.test(email);
}
export function isValidUserName(userName) {
    // Username must contain letters, numbers and underscores only, must not start or end with an underscore.

    let isValid = false;

    let isLengthValid = false;
    let specialValid = false;
    let underscoreValid = false;
    let letterNumbersValid = false;

    let usernameValidationString = "Username: ";
    let lengthAlert = "Must be between 5 - 16 characters. ";
    let underscoreAlert = "Cant start with an underscore. ";
    let specialAlert = "Cant have special characters (underscores only). ";
    let letterNumbersAlert = "Must contain letters and numbers only. ";

    // [0-9a-zA-Z][0-9a-zA-Z_]{3,14}[0-9a-zA-Z]

    if (!(userName.length >= 5 && userName.length <= 16)) {
        usernameValidationString += lengthAlert;
    } else {
        isLengthValid = true;
    }
    if (userName.match(new RegExp("[$&+,:;=?@#|'<>.^*()%!]"))) {
        usernameValidationString += specialAlert;
    } else {
        specialValid = true;
    }
    if (userName.charAt(0) === "_") {
        usernameValidationString += underscoreAlert;
    } else {
        underscoreValid = true;
    }
    if (!userName.match(new RegExp("[0-9a-zA-Z]"))) {
        usernameValidationString += letterNumbersAlert;
    } else {
        letterNumbersValid = true;
    }

    if (isLengthValid && specialValid && underscoreValid && letterNumbersValid) {
        isValid = true;
    } else {
        isValid = false;
    }

    // if return true proceed to duplicate name check on the backend
    return [isValid, usernameValidationString];
}
export function convertItemArray(array) {
    let newArr = [];
    array.map((item, index) =>{
        newArr.push(item.id);
    });
    return newArr.join(",");
}
export function convertTimeToSecond(time) {
    let {h, m, s} = 0;
    time.trim().split(':').map((item, index) => {
        let ParseItem = parseInt(item);
        switch (index) {
            case 0:
                h = ParseItem * 3600;
                break;
            case 1:
                m = ParseItem * 60;
                break;
            case 2:
                s = ParseItem;
                break;
            default:
                return null;
        }
    });
    return h + m + s;
}
export function toHHMMSS(secs){
    var sec_num = parseInt(secs, 10);
    var hours   = Math.floor(sec_num / 3600) % 24;
    var minutes = Math.floor(sec_num / 60) % 60;
    var seconds = sec_num % 60;
    return [hours,minutes,seconds]
        .map(v => v < 10 ? "0" + v : v)
        //.filter((v,i) => v !== "00" || i > 0)
        .join(":")
}