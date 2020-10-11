import * as firebase from 'firebase';
import store from '../store';

export const firebaseInit = () => {
    firebase.initializeApp({
        apiKey: process.env.API_KEY,
        authDomain: process.env.AUTH_DOMAIN,
        databaseURL: process.env.DB_URL,
        projectId: process.env.PROJECT_ID,
        storageBucket: process.env.STORAGE_BUCKET,
        messagingSenderId: process.env.MSG_ID,
        appId: process.env.APP_ID,
        measurementId: process.env.M_ID
    });

    firebase.auth().onAuthStateChanged(async user => {    
        if(user !== null){
            const token = user.refreshToken;
            store.dispatch('checkFsUser',user);
            store.dispatch('authenticate',token);
        } else {
            logout();
        }
      
    })
}

export const googleSignIn = ()=>{
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(function() {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sig  n-in will be persisted with session persistence.
        firebase.auth().signInWithPopup(provider).catch(function(error) {
            console.error(error.code,error.message);
        });
    })
    .catch(function(error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`Error ${errorCode} message ${errorMessage}`)
    });    
}

export const logout = () => {
    store.dispatch('authenticate',false);
    store.dispatch('setUser',{});
    firebase.auth().signOut();
}