import firebase from 'react-native-firebase';


class firebaseUtil {
    static async setUserInfo(userinfo){
        console.log(userinfo);
        await firebase.database().ref().child(`User/${userinfo.uid}`).set(userinfo)
    }
    static async getUserInfo(uid, callback){
        await firebase.database().ref(`User/${uid}`).on('value', (userinfo) => {
            if(userinfo.exists())
                callback(userinfo.val());
            else
                callback(false)
        })
    }
    static async updateUserInfo(uid,phoneNumber){
        await firebase.database().ref().child(`User/${uid}/phoneNumber`).set(phoneNumber)
    }
    static async saveDataPropduct(callback) {
        await firebase.database().ref().child(`Propduct`).push(callback);
    }
    static getProductByCategory(){
        let items = [];
        firebase.database().ref('Propduct').on('value', (snap) => {
            snap.forEach((child) => {
                let item = child.val();
                item['key'] = child.key;
                items.push(item);
            });
        });
        return items;
    }
    static async saveProductCart(callback, uid){
        await firebase.database().ref().child(`Cart/${uid}`).push(callback);
    }
}
module.exports = firebaseUtil;