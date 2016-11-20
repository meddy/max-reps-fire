import firebase from 'firebase';
import React, {Component, PropTypes} from 'react';
import {Well} from 'react-bootstrap';
import {connect} from 'react-redux';

import actions from '../actions';

import '../resources/spinner.css';
import signInImage from '../resources/google-sign-in.png';

class Home extends Component {

  componentWillMount() {
    this.props.dispatch(actions.requestSignIn());
  }

  render() {
    const {authenticated, authStateChecked} = this.props;
    let signInComponent;

    if (!authStateChecked) {
      signInComponent = <div className="loader">Loading...</div>;
    } else if (authenticated) {
      signInComponent = null;
    } else {
      signInComponent = <a onClick={Home.handleSignInWithGoogle} style={{cursor: 'pointer'}}>
        <img src={signInImage} alt="Google Sign In"/>
      </a>;
    }

    return <div className="row">
      <Well>Max Reps Fire is a weight lifting log app.</Well>
      {signInComponent}
    </div>;
  }

  static handleSignInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  }
}

Home.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  authStateChecked: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  const {authenticated, authStateChecked} = state.user;
  return {authenticated, authStateChecked};
}

export default connect(mapStateToProps)(Home);
