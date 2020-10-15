import * as firebase from 'firebase';
import store from '../store'
import { getBestUserGame } from '@/functions/gameHistory';
// users functions
export const createFsUser = async (user) =>{
    let db = firebase.firestore();
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
    let db = firebase.firestore();
    const currentUser = firebase.auth().currentUser;
    const updateDate = {
        xp:data.xp,
        lvl:data.lvl
    }
    try{
        const dbUser = await db.collection('users').doc(currentUser.uid).update(updateDate);
        return dbUser;
    }catch(error){
        console.error(error.message);
        throw new error;
    }
}
export const getUser = async (user) => {
    let db = firebase.firestore();
    return new Promise(async (resolve,reject)=>{
        const newUser =  await db.collection("users").doc(user.uid)
                .get();
        resolve(newUser.data());
    }) 
}

export const getUsers = async () => {
    let db = firebase.firestore();
    const usersDoc =  await db.collection("users").limit(100).get();
    const users = usersDoc.docs.map(user=>user.data())
    return users;
}

export const checkFsUser = async (user)=>{
    let db = firebase.firestore();
    const dbUser = await getUser(user);
    if(!dbUser){   
        await createFsUser(user);
    }
    return db.collection("users").doc(user.uid)
    .onSnapshot( async function(doc) {
        const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
        console.log('source',source)
        const bestGame = await getBestUserGame(doc.data().uid);
        const data = {
            ...doc.data(),
            ...bestGame
        }
        console.log(data)
        store.dispatch('setUser',data);
    });
}


