import firebase from 'firebase';
import React, {Component} from 'react';

import googleSignInPNG from '../resources/google-sign-in.png';

class SignIn extends Component {
  render() {
    return <div className="row">
      <a onClick={SignIn.handleSignInWithGoogle}>
        <img src={googleSignInPNG} alt="Google Sign In"/>
      </a>
    </div>;
  }

  static handleSignInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  }
}

export default SignIn;
