import { getBestUserGame } from '@/functions/gameHistory';
import store from '../store'
import firebase from 'firebase';

export const createFsUser = async (user) =>{
    let db = firebase.firestore();
    try{
        const dbUser = await db.collection('users').doc(user.uid).set({
            displayName: user.displayName,
            photoURL:user.photoURL,
            xp:0,
            uid:user.uid,
            lvl:1,
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
export const getUser = async (data) => {
    let db = firebase.firestore();
    let id = data.uid ? data.uid : data;
    try {
        const newUser =  await db.collection("users").doc(id).get();
        return newUser.data();
    } catch (error) {
        console.error(error.message);
        throw new error;
    }
 
}

export const getUsers = async () => {
    let db = firebase.firestore();
    try {
        const usersDoc =  await db.collection("users").limit(100).get();
        const users = usersDoc.docs.map(user=>user.data())
        return users;
    } catch (error) {
        console.error(error.message);
        throw new error;
    }
}

export const verifyFirebaseUser = async (user)=>{
    let db = firebase.firestore();
    try {
        const dbUser = await getUser(user);
        if(!dbUser){   
            await createFsUser(user);
        }
        return db.collection("users").doc(user.uid)
        .onSnapshot( async function(doc) {
            const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
            const bestGame = await getBestUserGame(doc.data().uid);
            const data = {
                ...doc.data(),
                ...bestGame
            }
            return store.dispatch('setUser',data);
        });
    } catch (error) {
        console.error(error.message);
        throw new error;
    }
}


export const checkFsUser = async (user)=>{
    let db = firebase.firestore();
    try {
        const dbUser = await getUser(user);
        if(!dbUser){   
            await createFsUser(user);
        }
        return db.collection("users").doc(user.uid)
        .onSnapshot( async function(doc) {
            const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
            const bestGame = await getBestUserGame(doc.data().uid);
            const data = {
                ...doc.data(),
                ...bestGame
            }
            store.dispatch('setUser',data);
            store.dispatch('setLoading',false);
        });
    } catch (error) {
        console.log(error);
        throw new error;

    }
 
}


