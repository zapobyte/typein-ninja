import * as firebase from 'firebase';
import store from '../store'
let db;
// users functions
export const createFsUser = async (user) =>{
    db = firebase.firestore();
    try{
        const dbUser = await db.collection('users').doc(user.uid).set({
            displayName: data.displayName,
            photoURL:data.photoURL,
            xp:0,
            uid:data.uid,
        });
        return dbUser;
    }catch(error){
        console.error(error.message);
        throw new error;
    }
}

export const updateUser = async (user) =>{
    db = firebase.firestore();
    try{
        const dbUser = await db.collection('users').doc(data.uid).update({
        displayName: user.displayName,
        photoURL: user.photoURL,
        xp:user.xp,
    });
    return dbUser;
    }catch(error){
        console.error(error.message);
        throw new error;
    }
}
export const getFsUser = async (user) => {
    db = firebase.firestore();
    try{
        const dbUser = await db.collection('users').where('uid', '==',user.uid).limit(1).get();
        return dbUser;
    }catch(error){
        console.error(error.message);
        throw new error;
    }
}

export const checkFsUser = async (user)=>{
    db = firebase.firestore();
    const dbUser = await getFsUser(user);
    if(dbUser.empty){
        await createFsUser(user);
    }
    db.collection("users").doc(user.uid)
    .onSnapshot(function(doc) {
        var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
        console.log(source, " data: ", doc.data());
        store.dispatch('setUser',doc.data());
    });
}

