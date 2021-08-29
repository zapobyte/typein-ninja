import firebase from 'firebase/app';
import store from '../store';

export const firebaseInit = () => {
  firebase.initializeApp({
    apiKey: process.env.VUE_APP_API_KEY || "AIzaSyAJ2xVBp-w5XJJro0DdhGG0MCpOoDIXXPo",
    authDomain: process.env.VUE_APP_AUTH_DOMAIN || 'typein-ninja.firebaseapp.com',
    databaseURL: process.env.VUE_APP_DB_URL || "https://typein-ninja.firebaseio.com",
    projectId: process.env.VUE_APP_PROJECT_ID || "typein-ninja",
    appId: process.env.VUE_APP_APP_ID || "1:629164543246:web:4a5b9693072b1804abdb5f",
  });

  firebase.auth().onAuthStateChanged(async (user) => {
    store.dispatch('setLoading', true);
    if (user) {
      const token = user.refreshToken;
      store.dispatch('authenticate', { user, token });
      store.dispatch('setLoading', false);
    } else {
      logout();
      store.dispatch('setLoading', false);
    }
  });
};

export const googleSignIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(function () {
      // Existing and future Auth states are now persisted in the current
      // session only. Closing the window would clear any existing state even
      // if a user forgets to sign out.
      // ...
      // New sig  n-in will be persisted with session persistence.
      firebase
        .auth()
        .signInWithPopup(provider)
        .catch(function (error) {
          console.error(error.code, error.message);
        });
    })
    .catch(function (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`Error ${errorCode} message ${errorMessage}`);
    });
};

export const logout = () => {
  store.dispatch('unsubscribeSnapshots');
  store.dispatch('setUser', {});
  localStorage.setItem('token', '');
  firebase.auth().signOut();
};
