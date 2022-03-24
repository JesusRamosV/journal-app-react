import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import { firebase } from "../firebase/firebase-config";
import { JournalScreen } from "../components/journal/JournalScreen";
import { AuthRouter } from "./AuthRouter";
import { useDispatch } from "react-redux";
import { login } from "../actions/auth";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { startLoadingNotes } from "../actions/notes";


export const AppRouter = () => {
  const dispatch = useDispatch();

  const [chegking, setChegking] = useState(true);


  useEffect(() => {
    firebase.auth().onAuthStateChanged(async(user) => {
      //Si el objeto user tiene algo entonces pregunta si existe el uid
  
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        
        dispatch(startLoadingNotes(user.uid))

      } 

      setChegking(false);
     
    });
  }, [dispatch, setChegking]);

  if (chegking) {
    return <h1>Wait...</h1> 
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <JournalScreen />
            </PrivateRoute>
          }
        />
        <Route
          path="/*"
          element={
            <PublicRoute>
              <AuthRouter />
            </PublicRoute>
          }
        />
      </Routes>
    </Router>
  );
};
