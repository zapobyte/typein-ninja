
import firebase from 'firebase';
export const getUserScore=(uid)=>{

}

export const addUserScore= async (user)=>{
    const difficulity = ''
    const dbUser = await firebase.collection("users").doc(user.uid);
    dbUser.update({
        xp:xp,
        lvl:lvl
    })
}