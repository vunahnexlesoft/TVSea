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
    static getUserOnlineOnStream(name,callback){
        let items = [];
        // firebase.database().ref(`Channel`).on('child_added', (snap)=>{
        //     let item = snap.val();
        //     item['key'] = snap.key;
        //     items.push(item);
        // });
        firebase.database().ref(name).on('value', (snap) => {
            snap.forEach((child) => {
                let item = child.val();
                item['key'] = child.key;
                items.push(item);
            });
            callback(items);
        });
        //console.log(typeof items);
        //return items;
    }
    static async setNewUserOnline(callback){
        await firebase.database().ref().child(`Channel/${callback.id}`).set(callback);
    }
    static async removeNewUserOnline(callback){
        await firebase.database().ref().child(`Channel/${callback.id}`).remove();
    }
}
module.exports = firebaseUtil;