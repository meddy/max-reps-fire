import React, {Component, PropTypes} from 'react';
import {Row, Well} from 'react-bootstrap';
import {connect} from 'react-redux';

import actions from '../actions';

import {LoadingIndicator} from '../components';
import {auth, authProvider} from '../firebaseServices';
import signInImage from '../resources/google-sign-in.png';
import '../resources/spinner.css';

class Home extends Component {

  componentWillMount() {
    this.props.dispatch(actions.requestSignIn());
  }

  render() {
    const {authenticated, authStateChecked} = this.props;

    return <Row>
      <Well>Max Reps Fire is a weight lifting log app.</Well>
      <LoadingIndicator loading={!authStateChecked}>
        {!authenticated && <a onClick={Home.handleSignInWithGoogle} style={{cursor: 'pointer'}}>
          <img src={signInImage} alt="Google Sign In"/>
        </a>}
      </LoadingIndicator>
    </Row>;
  }

  static handleSignInWithGoogle() {
    auth.signInWithRedirect(authProvider);
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
