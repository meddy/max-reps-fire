import React, {Component, PropTypes} from 'react';
import {Row, Well} from 'react-bootstrap';
import {connect} from 'react-redux';
import {requestSignIn} from '../actions/creators';
import {auth, authProvider} from '../bootstrap/firebaseServices';
import {LoadingIndicator} from '../components';
import {getAuthenticated, getAuthReceived} from '../helpers/selectors';
import signInImage from '../resources/google-sign-in.png';
import '../resources/spinner.css';

class Home extends Component {
  static handleSignInWithGoogle() {
    auth.signInWithRedirect(authProvider);
  }

  componentDidMount() {
    const {authenticated, dispatch} = this.props;

    if (!authenticated) {
      dispatch(requestSignIn());
    }
  }

  render() {
    const {authenticated, authReceived} = this.props;

    return <Row>
      <Well>Max Reps Fire is a weight lifting log app.</Well>
      <LoadingIndicator loading={!authReceived}>
        {!authenticated && <a onClick={Home.handleSignInWithGoogle} style={{cursor: 'pointer'}}>
          <img src={signInImage} alt="Google Sign In" />
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
  return {
    authenticated: getAuthenticated(state),
    authReceived: getAuthReceived(state)
  };
}

export default connect(mapStateToProps)(Home);
