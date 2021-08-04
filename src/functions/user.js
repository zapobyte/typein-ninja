import store from '../store';
import firebase from 'firebase';

export const createFsUser = async (user) => {
  let db = firebase.firestore();
  try {
    const best = { wpm: 0, acc: 0, difficulty: '' };
    const dbUser = await db.collection('users').doc(user.uid).set({
      displayName: user.displayName,
      photoURL: user.photoURL,
      xp: 0,
      uid: user.uid,
      lvl: 1,
      best,
      rank: 'Apprentice',
    });
    return dbUser;
  } catch (error) {
    console.error(error.message);
    throw new error();
  }
};
export const updateUserBest = async (data) => {
  let db = firebase.firestore();
  const currentUser = firebase.auth().currentUser;
  const updateDate = {
    wpm: data.wpm,
    acc: data.acc,
    difficulty: data.difficulty,
  };
  try {
    const dbUser = await db.collection('users').doc(currentUser.uid).set(
      {
        best: updateDate,
      },
      { merge: true }
    );
    return dbUser;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};
export const updateUserDisplayName = async (displayName) => {
  let db = firebase.firestore();
  const currentUser = firebase.auth().currentUser;
  const updateDate = {
    displayName: displayName,
  };
  try {
    const dbUser = await db.collection('users').doc(currentUser.uid).update(updateDate);
    return dbUser;
  } catch (error) {
    console.error(error.message);
    throw  error;
  }
};
export const updateUser = async (data) => {
  let db = firebase.firestore();
  const currentUser = firebase.auth().currentUser;
  const updateData = {
    xp: data.xp,
    lvl: data.lvl,
    rank: data.rank,
  };
  try {
    const dbUser = await db.collection('users').doc(currentUser.uid).update(updateData);
    return dbUser;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};
export const getUser = async (data) => {
  let db = firebase.firestore();
  let id = data.uid ? data.uid : data;
  try {
    const newUser = await db.collection('users').doc(id).get();
    return newUser.data();
  } catch (error) {
    console.error(error.message);
    throw  error;
  }
};

export const getUsers = async () => {
  let db = firebase.firestore();
  try {
    const usersDoc = await db.collection('users').orderBy('displayName').get();
    const users = usersDoc.docs.map((user) => user.data());
    return users;
  } catch (error) {
    console.error(error.message);
    throw  error;
  }
};

export const getOrCreateFsUser = async (user) => {
  let db = firebase.firestore();
  try {
    const dbUser = await getUser(user);
    if (!dbUser) {
      await createFsUser(user);
    }
    const unsubscribe = db
      .collection('users')
      .doc(user.uid)
      .onSnapshot(async function (doc) {
        const data = doc.data();
        return store.dispatch('setUser', data);
      });
    store.dispatch('addSnapshot', unsubscribe);
  } catch (error) {
    console.error(error.message);
    throw  error;
  }
};

export const deleteCurrentUser = async () => {
  const user = firebase.auth().currentUser;
  let db = firebase.firestore();
  try {
    await db.collection('users').doc(user.uid).delete();
    const games = await db.collection('gameHistory').where('uid', '==', user.uid).get();
    games.forEach(async (game) => {
      await game.ref.delete();
    });
    await user.delete();
    window.location.href = '/';
  } catch (error) {
    throw error;
  }
};
