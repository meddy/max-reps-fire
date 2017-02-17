import {values} from 'lodash';
import React, {Component, PropTypes} from 'react';
import {Grid, MenuItem, Nav, Navbar, NavDropdown, NavItem} from 'react-bootstrap';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';
import {requestSignIn, requestSignOut, requestWorkoutTemplates} from '../actionCreators';
import {auth, authProvider} from '../bootstrap/firebaseServices';
import {getAuthenticated, getAuthReceived, getWorkoutTemplatesReceived} from '../helpers/selectors';
import signInImage from '../resources/google-sign-in.png';

class App extends Component {
  static handleSignInWithGoogle(e) {
    e.preventDefault();
    auth.signInWithRedirect(authProvider);
  }

  componentDidMount() {
    const {authenticated, dispatch} = this.props;
    if (!authenticated) {
      dispatch(requestSignIn());
    }
  }

  componentDidUpdate() {
    const {authenticated, dispatch, workoutTemplatesReceived} = this.props;
    if (authenticated && !workoutTemplatesReceived) {
      dispatch(requestWorkoutTemplates());
    }
  }

  handleSignOut = () => {
    this.props.dispatch(requestSignOut());
  };

  renderNavbar = () => {
    return <Navbar.Collapse>
      {this.props.authenticated && <Nav>
        <LinkContainer to="/workouts">
          <NavItem>Workouts</NavItem>
        </LinkContainer>
        <NavDropdown title="Workout Templates" id="workout-template-dropdown">
          {this.renderWorkoutTemplateMenu()}
        </NavDropdown>
        <LinkContainer to="/exercises">
          <NavItem>Exercises</NavItem>
        </LinkContainer>
      </Nav>}
      <Nav pullRight>
        {this.renderAuthButton()}
      </Nav>
    </Navbar.Collapse>;
  };

  renderWorkoutTemplateMenu = () => {
    return this.props.workoutTemplates.map(workoutTemplate => {
      return <LinkContainer
        key={workoutTemplate}
        to={`/workout-template/${workoutTemplate}`}
      >
        <MenuItem>{workoutTemplate}</MenuItem>
      </LinkContainer>;
    });
  };

  renderAuthButton = () => {
    const {authenticated, authReceived} = this.props;

    if (!authReceived) {
      return null;
    }

    if (authenticated) {
      return <NavItem onClick={this.handleSignOut}>
        Sign Out
      </NavItem>;
    }

    return <NavItem onClick={App.handleSignInWithGoogle} id="sign-in">
      <img src={signInImage} alt="Google Sign In" />
    </NavItem>;
  };

  render() {
    return <div>
      <Navbar inverse fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Max Reps Fire</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        {this.renderNavbar()}
      </Navbar>
      <Grid className="container theme-showcase">
        {this.props.children}
      </Grid>
    </div>;
  }
}

App.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  authReceived: PropTypes.bool.isRequired,
  workoutTemplates: PropTypes.arrayOf(PropTypes.string).isRequired
};

function mapStateToProps(state) {
  return {
    authenticated: getAuthenticated(state),
    authReceived: getAuthReceived(state),
    workoutTemplatesReceived: getWorkoutTemplatesReceived(state),
    workoutTemplates: values(state.workoutTemplate.data)
  };
}

export default connect(mapStateToProps)(App);
