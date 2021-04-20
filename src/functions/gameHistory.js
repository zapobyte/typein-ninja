import firebase from 'firebase';

export const getBestUserGame = async (uid) => {
  try {
    let db = firebase.firestore();
    const games = await db.collection('gameHistory').where('uid', '==', uid).orderBy('wpm').get();
    const docs = games.docs.map((doc) => doc.data());
    const bestGame = docs.sort((a, b) => {
      return a.acc > 85 && b.acc - a.acc
    });
    return bestGame[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getBestUserGameByDiff = async (uid, difficulty) => {
  try {
    let db = firebase.firestore();
    const games = await db.collection('gameHistory').where('uid', '==', uid).where('difficulty', '==', difficulty).orderBy('wpm').get();
    const docs = games.docs.map((doc) => doc.data());
    let bestGame = docs.sort((a, b) => {
      return a.acc > 85 && b.acc - a.acc;
    });
    return bestGame[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllGames = async (uid) => {
  try {
    let db = firebase.firestore();
    const games = await db.collection('gameHistory').where('uid', '==', uid).orderBy('date').orderBy('wpm').get();
    const docs = games.docs
      .map((doc) => doc.data())
      .sort((a, b) => {
        return a.acc == 100 && b.acc - a.acc;
      });
    return docs;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createGameHistory = async (data) => {
  try {
    let db = firebase.firestore();
    await db.collection('gameHistory').doc().set(data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
