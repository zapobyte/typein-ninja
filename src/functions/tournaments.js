import firebase from 'firebase';

export const createTournament = async (tournament) =>{
    let db = firebase.firestore(); 
    try {
        const dbTournament = await db.collection("tournaments").doc()
        .set(tournament);
        return dbTournament;
    } catch (error) {
        console.log(error);
        return error;
    }
    
}

export const getTournament = (id) => {

}

export const addTournament = (tournament) => {

}

export const getTournaments = (id) => {

}