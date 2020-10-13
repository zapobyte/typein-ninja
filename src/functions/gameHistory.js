
import firebase from 'firebase';

export const getBestUserGame= async (uid)=>{
    let db = firebase.firestore(); 
    const games = await db.collection("gameHistory").where("uid","==",uid).get();
    const docs = games.docs.map(doc=> doc.data())
    const bestGame = docs.sort((a,b)=>{
        return a.acc == 100 && b.wpm - a.wpm;
    })
   return bestGame[0]
}

export const createGameHistory = async (data) => {
    let db = firebase.firestore(); 
    await db.collection("gameHistory").doc()
    .set(data);
}
