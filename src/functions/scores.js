
import firebase from 'firebase';
export const getUserScore=(uid)=>{

}

export const addUserScore= async (user)=>{
    const difficulity = ''
    const user = await firebase.collection("users").doc(user.uid);
    user.update({
        xp:xp,
        lvl:lvl
    })
}