import { googleAuthProvider, firebase } from '../firebase/firebase-config';


import { types } from "../types/types";
import { finishLoading, startLoading } from './ui';

export const loginstartEmailPassword = (email, password) => {
  return (dispatch) => {

      dispatch(startLoading());

      setTimeout(() => {
        firebase.auth().signInWithEmailAndPassword(email, password)
          .then(({user}) => {
            
            dispatch(
              login(user.uid, user.displayName)
            );
  
            dispatch(finishLoading());
  
          })
          .catch( ({message}) => {
            message = 'Usuario o contraseña incorrectos';
            console.log(message);
            dispatch(finishLoading());
          })
      }, 3500);
  };
};

export const startRegisterWithEmailPasswordName = (email, password, name) => {
  return (dispatch) => {

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then( async({user}) => {

        // Esto se hace para darle valor al displayName ya que aparece como null
        await user.updateProfile({displayName:name})
        dispatch(
          login(user.uid, user.displayName)
        );
      })
      .catch( e => {
        console.log(e);
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
