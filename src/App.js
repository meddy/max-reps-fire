import {values} from 'lodash';
import React, {Component, PropTypes} from 'react';
import {Grid, MenuItem, Nav, Navbar, NavDropdown, NavItem} from 'react-bootstrap';
import {connect} from 'react-redux';
import {replace, Link, Fragment} from 'redux-little-router';
import {signOut} from './actions';
import {NoMatch} from './components';
import {Home, Exercises, Workouts, WorkoutTemplate, WorkoutTemplateEdit} from './containers';
import {getServices} from './helpers/createFirebase';
import {getAuthenticated, getAuthChecked, getWorkoutTemplatesReceived} from './helpers/selectors';
import signInImage from './resources/google-sign-in.png';
import * as routes from './routes';

class App extends Component {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired,
    authChecked: PropTypes.bool.isRequired,
    route: PropTypes.string,
    workoutTemplates: PropTypes.arrayOf(PropTypes.string).isRequired
  };

  static mapStateToProps(state) {
    return {
      authenticated: getAuthenticated(state),
      authChecked: getAuthChecked(state),
      route: state.router.route,
      workoutTemplatesReceived: getWorkoutTemplatesReceived(state),
      workoutTemplates: values(state.workoutTemplate.data)
    };
  }

  static onClickSignIn(e) {
    e.preventDefault();

    const {auth, authProvider} = getServices();
    auth.signInWithRedirect(authProvider);
  }

  renderNavbar = () => {
    const {authenticated, dispatch} = this.props;
    return <Navbar.Collapse>
      {authenticated && <Nav>
        <NavItem onClick={() => dispatch(replace('/workouts'))}>Workouts</NavItem>
        <NavDropdown title="Workout Templates" id="workout-template-dropdown">
          {this.renderWorkoutTemplateMenu()}
        </NavDropdown>
        <NavItem onClick={() => dispatch(replace('/exercises'))}>Exercises</NavItem>
      </Nav>}
      <Nav pullRight>
        {this.renderAuthButton()}
      </Nav>
    </Navbar.Collapse>;
  };

  renderWorkoutTemplateMenu = () => {
    const {dispatch, workoutTemplates} = this.props;
    return workoutTemplates.map(workoutTemplate => {
      return <MenuItem
        key={workoutTemplate}
        onClick={() => dispatch(replace(`/workout-template/${workoutTemplate}`))}
      >
        {workoutTemplate}
      </MenuItem>;
    });
  };

  renderAuthButton = () => {
    const {authenticated, authChecked, dispatch} = this.props;

    if (!authChecked) {
      return null;
    }

    if (authenticated) {
      return <NavItem onClick={() => dispatch(signOut())}>Sign Out</NavItem>;
    }

    return <NavItem onClick={App.onClickSignIn} id="sign-in">
      <img src={signInImage} alt="Google Sign In" />
    </NavItem>;
  };

  render() {
    return <div>
      <Navbar inverse fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <Link href="/">Max Reps Fire</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        {this.renderNavbar()}
      </Navbar>
      <Grid className="container theme-showcase">
        <Fragment forRoute={routes.EXERCISE_LIST}>
          <Exercises />
        </Fragment>
        <Fragment forRoute={routes.WORKOUT_LIST}>
          <Workouts />
        </Fragment>
        <Fragment
          forRoute={routes.WORKOUT_TEMPLATE_VIEW}
          withConditions={({pathname}) => pathname.indexOf('edit') === -1}
        >
          <WorkoutTemplate />
        </Fragment>
        <Fragment forRoute={routes.WORKOUT_TEMPLATE_EDIT}>
          <WorkoutTemplateEdit />
        </Fragment>
        <Fragment forRoute={routes.HOME} withConditions={({pathname})=> pathname === '/'}>
          <Home />
        </Fragment>
        <Fragment forRoute={routes.NO_MATCH}>
          <NoMatch />
        </Fragment>
        {!this.props.route && <NoMatch />}
      </Grid>
    </div>;
  }
}

export default connect(App.mapStateToProps)(App);
