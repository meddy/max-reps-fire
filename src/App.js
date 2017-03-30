import {values} from 'lodash';
import React, {Component, PropTypes} from 'react';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import {Grid, MenuItem, Nav, Navbar, NavDropdown, NavItem} from 'react-bootstrap';
import {connect} from 'react-redux';
import {requestSignOut} from './actions';
import {NoMatch, Exercises, Home, Workouts, WorkoutTemplate} from './containers';
import {getServices} from './helpers/createFirebase';
import {getAuthenticated, getAuthChecked, getWorkoutTemplatesReceived} from './helpers/selectors';
import signInImage from './resources/google-sign-in.png';

class App extends Component {
  static onClickSignIn(e) {
    e.preventDefault();

    const {auth, authProvider} = getServices();
    auth.signInWithRedirect(authProvider);
  }

  onSignOut = () => {
    this.props.dispatch(requestSignOut());
  };

  renderNavbar = () => {
    const {history} = this.props;
    return <Navbar.Collapse>
      {this.props.authenticated && <Nav>
        <NavItem onClick={() => history.push('/workouts')}>Workouts</NavItem>
        <NavDropdown title="Workout Templates" id="workout-template-dropdown">
          {this.renderWorkoutTemplateMenu()}
        </NavDropdown>
        <NavItem onClick={() => history.push('/exercises')}>Exercises</NavItem>
      </Nav>}
      <Nav pullRight>
        {this.renderAuthButton()}
      </Nav>
    </Navbar.Collapse>;
  };

  renderWorkoutTemplateMenu = () => {
    const {history, workoutTemplates} = this.props;
    return workoutTemplates.map(workoutTemplate => {
      return <MenuItem
        key={workoutTemplate}
        onClick={() => history.push(`/workout-template/${workoutTemplate}`)}
      >
        {workoutTemplate}
      </MenuItem>;
    });
  };

  renderAuthButton = () => {
    const {authenticated, authChecked} = this.props;

    if (!authChecked) {
      return null;
    }

    if (authenticated) {
      return <NavItem onClick={this.onSignOut}>
        Sign Out
      </NavItem>;
    }

    return <NavItem onClick={App.onClickSignIn} id="sign-in">
      <img src={signInImage} alt="Google Sign In" />
    </NavItem>;
  };

  render() {
    return <BrowserRouter>
      <div>
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
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="exercises" component={Exercises} />
            <Route path="workouts" component={Workouts} />
            <Route path="workout-template/:workoutTemplate" component={WorkoutTemplate} />
            <Route path="workout-template/:workoutTemplate/edit" component={WorkoutTemplate} />
            <Route component={NoMatch} />
          </Switch>
        </Grid>
      </div>
    </BrowserRouter>;
  }
}

App.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  authChecked: PropTypes.bool.isRequired,
  workoutTemplates: PropTypes.arrayOf(PropTypes.string).isRequired
};

function mapStateToProps(state) {
  return {
    authenticated: getAuthenticated(state),
    authChecked: getAuthChecked(state),
    workoutTemplatesReceived: getWorkoutTemplatesReceived(state),
    workoutTemplates: values(state.workoutTemplate.data)
  };
}

export default connect(mapStateToProps)(App);
