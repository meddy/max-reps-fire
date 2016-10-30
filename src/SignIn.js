import React, {Component} from 'react';

import googleSignInPNG from './google-sign-in.png';

class SignIn extends Component {
  render() {
    return <div className="row">
      <a href="#">
        <img src={googleSignInPNG}/>
      </a>
    </div>;
  }
}

export default SignIn;
