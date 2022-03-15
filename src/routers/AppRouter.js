import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Redirect,
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

export const AppRouter = () => {
  const dispatch = useDispatch();

  const [chegking, setChegking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      //Si el objeto user tiene algo entonces pregunta si existe el uid
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }

      setChegking(false);
    });
  }, [dispatch, setChegking]);

  if (chegking) {
    return <h1>Wait...</h1>;
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
