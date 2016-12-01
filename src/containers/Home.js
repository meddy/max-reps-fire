import React, {Component, PropTypes} from 'react';
import {Row, Well} from 'react-bootstrap';
import {connect} from 'react-redux';

import {requestSignIn} from '../actionCreators';
import {LoadingIndicator} from '../components';
import {auth, authProvider} from '../firebaseServices';
import signInImage from '../resources/google-sign-in.png';
import '../resources/spinner.css';

class Home extends Component {
  static handleSignInWithGoogle() {
    auth.signInWithRedirect(authProvider);
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(requestSignIn());
  }

  render() {
    const {authenticated, authReceived} = this.props;

    return <Row>
      <Well>Max Reps Fire is a weight lifting log app.</Well>
      <LoadingIndicator loading={!authReceived}>
        {!authenticated && <a onClick={Home.handleSignInWithGoogle} style={{cursor: 'pointer'}}>
          <img src={signInImage} alt="Google Sign In"/>
        </a>}
      </LoadingIndicator>
    </Row>;
  }
}

Home.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  authReceived: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  const {authenticated, received} = state.user;
  return {
    authenticated,
    authReceived: received
  };
}

export default connect(mapStateToProps)(Home);
