import React, { useEffect, useState } from 'react';
import { 
    BrowserRouter as Router, 
    Redirect, 
    Route,
    Switch,
} from 'react-router-dom';
import {firebase} from '../firebase/firebase-config';
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';

export const AppRouter = () => {

    const dispatch = useDispatch();

const [chegking, setChegking] = useState(true);
const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
      
        firebase.auth().onAuthStateChanged( (user) => {
            
            //Si el objeto user tiene algo entonces pregunta si existe el uid
            if (user?.uid) {
                dispatch(login( user.uid, user.displayName ))
                setIsLoggedIn(true);
            }else {
                setIsLoggedIn(false);
            }

            setChegking(false);
        })
      
    }, [dispatch, setChegking])

    if (chegking) {
        return (
            <h1>Espere...</h1>
            
        )
    }
    
    return (

        <Router>
            <div>
                <Switch>
                    
                    <Route path="/auth" component={AuthRouter} />

                    <Route exact path="/" component={JournalScreen} />
                    <Redirect to="/auth/login" />

                </Switch>
            </div>
        </Router>
    
    )
};
