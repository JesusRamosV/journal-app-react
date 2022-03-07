import { getAuth, signInWithPopup} from "firebase/auth";
import { googleAuthProvider, firebase } from '../firebase/firebase-config';


import { types } from "../types/types";

export const loginstartEmailPassword = (email, password) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(login(123, "Pedro"));
    }, 3500);
  };
};

export const startRegisterWithEmailPasswordName = (email, password, name) => {
  return (dispatch) => {

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then( async({user}) => {

        // Esto se hace para darle valor al displayName ya que aparece como null
        await user.updateProfile({displayName:name})
        console.log(user);
        dispatch(
          login(user.uid, user.displayName)
        );
      })
  }
}

export const startGoogleLogin = () => {
    return (dispatch) => {
        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({user}) => {
                dispatch(
                  login(user.uid, user.displayName)
                );
            })
    }
}

export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
  },
});
