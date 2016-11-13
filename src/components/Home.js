import firebase from 'firebase';
import React from 'react';
import {Jumbotron} from 'react-bootstrap';

import googleSignInPNG from '../resources/google-sign-in.png';

export default function Home() {
  return <div className="row">
    <Jumbotron>
      <h1>Max Reps Fire</h1>
    </Jumbotron>
    <a onClick={handleSignInWithGoogle}>
      <img src={googleSignInPNG} alt="Google Sign In"/>
    </a>
  </div>;
}

function handleSignInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithRedirect(provider);
}
