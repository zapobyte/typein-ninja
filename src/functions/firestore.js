import * as firebase from 'firebase';
import store from '../store'
let db;
// users functions
export const createFsUser = async (user) =>{
    db = firebase.firestore();
    try{
        const dbUser = await db.collection('users').doc(user.uid).set({
            displayName: user.displayName,
            photoURL:user.photoURL,
            xp:0,
            uid:user.uid,
            lvl:1
        });
        return dbUser;
    }catch(error){
        console.error(error.message);
        throw new error;
    }
}

export const updateUser = async (data) =>{
    db = firebase.firestore();
    const currentUser = firebase.auth().currentUser;
    try{
        const dbUser = await db.collection('users').doc(currentUser.uid).update({
        xp:data.xp,
        lvl:data.lvl
    });
    return dbUser;
    }catch(error){
        console.error(error.message);
        throw new error;
    }
}
export const getFsUser = async (user) => {
    db = firebase.firestore();
    console.log(user.uid)
    return new Promise((resolve,reject)=>{
   return  db.collection("users").doc(user.uid)
        .onSnapshot((function(doc){
            console.log(doc.data())
            resolve(doc.data());            
        }))
    }) 
}

export const checkFsUser = async (user)=>{
    db = firebase.firestore();
    const dbUser = await getFsUser(user);
    if(!dbUser){
        await createFsUser(user);
    }
    db.collection("users").doc(user.uid)
    .onSnapshot(function(doc) {
        const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
        console.log(source, " data: ", doc.data());
        store.dispatch('setUser',doc.data());
    });
}

export const createGameHistory = async (data) => {
    await db.collection("gameHistory").doc()
    .set(data);
}

