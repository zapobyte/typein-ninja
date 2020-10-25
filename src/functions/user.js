import { getBestUserGame } from '@/functions/gameHistory';
import store from '../store'
import firebase from 'firebase';

export const createFsUser = async (user) =>{
    let db = firebase.firestore();
    try{
        const bestGame = await getBestUserGame(user.uid);
        const best = bestGame ? bestGame : { wpm:0, acc:0,difficulty:'' };
        const dbUser = await db.collection('users').doc(user.uid).set({
            displayName: user.displayName,
            photoURL:user.photoURL,
            xp:0,
            uid:user.uid,
            lvl:1,
            best
        });
        return dbUser;
    }catch(error){
        console.error(error.message);
        throw new error;
    }
}
export const updateUserBest = async (data) =>{
    let db = firebase.firestore();
    const currentUser = firebase.auth().currentUser;
    const updateDate = {
        wpm:data.wpm,
        acc:data.acc,
        difficulty:data.difficulty
    }
    try{
        const dbUser = await db.collection('users').doc(currentUser.uid).set({
            best:updateDate
        },{merge:true});
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

export const getOrCreateFsUser = async (user)=>{
    let db = firebase.firestore();
    try {
        const dbUser = await getUser(user);
        if(!dbUser){   
            await createFsUser(user);
        }
        return db.collection("users").doc(user.uid)
        .onSnapshot( async function(doc) {
            const data = doc.data();
            return store.dispatch('setUser',data);
        });
    } catch (error) {
        console.error(error.message);
        throw new error;
    }
}

export const deleteCurrentUser = () =>{
    const user = firebase.auth().currentUser;
    let db = firebase.firestore();
    db.collection("users").doc(user.uid).delete().then( async function() {
        const games = await db.collection("gameHistory").where("uid","==",user.uid).get();
        games.forEach(async (game)=>{
            await game.ref.delete();
        })
        user.delete().then(function() {
           window.location.href="/";
        }).catch(function(error) {
        // An error happened.
            console.log(error)
        });
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });

}