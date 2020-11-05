
import firebase from 'firebase';
export const getBestUserGame= async (uid)=>{

    try {
            let db = firebase.firestore(); 
            const games = await db.collection("gameHistory").where("uid","==",uid).get();
            const docs = games.docs.map(doc=> doc.data())
            const bestGame = docs.sort((a,b)=>{
                return a.acc == 100 && b.wpm - a.wpm;
            })
        return bestGame[0];  
    } catch (error) {
        console.log(error);
        return error;
    }
}
export const getBestUserGameByDiff= async (uid,difficulty)=>{

   try {
        let db = firebase.firestore(); 
        const games = await db.collection("gameHistory").where("uid","==",uid).where("difficulty","==",difficulty).get();
        const docs = games.docs.map(doc=> doc.data())
        const bestGame = docs.sort((a,b)=>{
            return a.acc == 100 && b.wpm - a.wpm;
        })
    return bestGame[0];
   }catch (error) {
    console.log(error);
    return error;
}
}

export const getAllGames = async (uid)=>{
    
     try {
        let db = firebase.firestore(); 
        const games = await db.collection("gameHistory").where("uid","==",uid).get();
        const docs = games.docs.map(doc=> doc.data()).sort((a,b)=>{
            return a.acc == 100 && b.wpm - a.wpm;
        })
         return docs;
     } catch (error) {
        console.log(error);
        return error;
    }
}

export const createGameHistory = async (data) => {
    try {
        let db = firebase.firestore(); 
        await db.collection("gameHistory").doc()
        .set(data);
    } catch (error) {
        console.log(error);
        return error;
    }

}

export const getCurrentMonthGames = async (date)=>{
    try {
        let db = firebase.firestore(); 
        const entries = await db.collection("gameHistory").where("date",">=",date.from).where("date","<=",date.to).where('acc','==',100).get();
        if(entries.docs.length>0){
            const gamesData = entries.docs.map((game) =>{
              return game.data();
            });
            gamesData.sort((a,b)=>{
              return b.wpm - a.wpm
            })
            return gamesData;
        }
        return [];
    } catch (error) {
        console.log(error);
        return error;
    }

}
