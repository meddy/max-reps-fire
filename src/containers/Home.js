import React, {Component, PropTypes} from 'react';
import {Row, Well} from 'react-bootstrap';
import {connect} from 'react-redux';

import {LoadingIndicator} from '../components';
import {auth, authProvider} from '../firebaseServices';
import signInImage from '../resources/google-sign-in.png';
import '../resources/spinner.css';

class Home extends Component {
  static handleSignInWithGoogle() {
    auth.signInWithRedirect(authProvider);
  }

  render() {
    const {authenticated, authChecked} = this.props;

    return <Row>
      <Well>Max Reps Fire is a weight lifting log app.</Well>
      <LoadingIndicator loading={!authChecked}>
        {!authenticated && <a onClick={Home.handleSignInWithGoogle} style={{cursor: 'pointer'}}>
          <img src={signInImage} alt="Google Sign In"/>
        </a>}
      </LoadingIndicator>
    </Row>;
  }
}

Home.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  authChecked: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  const {authenticated, authChecked} = state.user;
  return {authenticated, authChecked};
}

export default connect(mapStateToProps)(Home);
