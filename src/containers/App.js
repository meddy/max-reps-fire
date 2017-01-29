import {values} from 'lodash';
import React, {Component, PropTypes} from 'react';
import {Button, Grid, MenuItem, Nav, Navbar, NavDropdown, NavItem} from 'react-bootstrap';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';
import {requestSignOut, requestWorkoutTemplates} from '../actions/creators';
import {getAuthenticated, getWorkoutTemplatesReceived} from '../helpers/selectors';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(requestWorkoutTemplates());
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
    if (!this.props.authenticated) {
      return null;
    }

    return <Navbar.Collapse>
      <Nav>
        <LinkContainer to="/workouts">
          <NavItem>Workouts</NavItem>
        </LinkContainer>
        <NavDropdown title="Workout Templates" id="workout-template-dropdown">
          {this.renderWorkoutTemplateMenu()}
        </NavDropdown>
        <LinkContainer to="/exercises">
          <NavItem>Exercises</NavItem>
        </LinkContainer>
      </Nav>
      <Navbar.Form pullRight>
        <Button type="button" onClick={this.handleSignOut}>Sign Out</Button>
      </Navbar.Form>
    </Navbar.Collapse>;
  };

  renderWorkoutTemplateMenu = () => {
    return this.props.workoutTemplates.map(workoutTemplate => {
      return <LinkContainer
        key={workoutTemplate.name}
        to={`/workout-template/${workoutTemplate.name}`}
      >
        <MenuItem>{workoutTemplate.name}</MenuItem>
      </LinkContainer>;
    });
  };

  render() {
    return <div>
      <Navbar inverse fixedTop>
        <div className="container">
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Max Reps Fire</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          {this.renderNavbar()}
        </div>
      </Navbar>
      <Grid className="container theme-showcase">
        {this.props.children}
      </Grid>
    </div>;
  }
}

App.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  workoutTemplates: PropTypes.arrayOf(PropTypes.object).isRequired
};

function mapStateToProps(state) {
  return {
    authenticated: getAuthenticated(state),
    workoutTemplatesReceived: getWorkoutTemplatesReceived(state),
    workoutTemplates: values(state.workoutTemplate.data)
  };
}

export default connect(mapStateToProps)(App);
