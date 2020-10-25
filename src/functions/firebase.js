import * as firebase from 'firebase';
import store from '../store';

export const firebaseInit = () => {
    firebase.initializeApp({
        apiKey: process.env.VUE_APP_API_KEY,
        authDomain: process.env.VUE_APP_AUTH_DOMAIN,
        databaseURL: process.env.VUE_APP_DB_URL,
        projectId: process.env.VUE_APP_PROJECT_ID,
        storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
        messagingSenderId: process.env.VUE_APP_MSG_ID,
        appId: process.env.VUE_APP_APP_ID,
    });

    firebase.auth().onAuthStateChanged(async user => { 
        store.dispatch('setLoading',true);
        if(user){
            const token = user.refreshToken;
            store.dispatch('authenticate',{user,token});
            setTimeout(()=>{
                store.dispatch('setLoading',false);
            },500);
        } else {
            store.dispatch('setLoading',false);
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
    localStorage.setItem('token','');
    store.dispatch('setLoading',false)
    firebase.auth().signOut();
}