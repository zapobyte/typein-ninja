import * as firebase from 'firebase';
import store from '../store';

export const firebaseInit = () => {
    firebase.initializeApp({
        apiKey: "AIzaSyAJ2xVBp-w5XJJro0DdhGG0MCpOoDIXXPo",
        authDomain: "typein-ninja.firebaseapp.com",
        databaseURL: "https://typein-ninja.firebaseio.com",
        projectId: "typein-ninja",
        storageBucket: "typein-ninja.appspot.com",
        messagingSenderId: "629164543246",
        appId: "1:629164543246:web:4a5b9693072b1804abdb5f",
        measurementId: "G-7P68PCN9RT"
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