import React, {Component, PropTypes} from 'react';
import {Button, Grid, MenuItem, Nav, Navbar, NavDropdown, NavItem} from 'react-bootstrap';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';

import {requestSignOut, requestWorkoutTemplates} from '../actionCreators';

let DevTools = null;
if (process.env.NODE_ENV === 'development') {
  DevTools = require('./DevTools').default;
}

class App extends Component {
  constructor(props) {
    super(props);

    this.renderNavbar = this.renderNavbar.bind(this);
    this.renderWorkoutTemplateMenu = this.renderWorkoutTemplateMenu.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentWillUpdate(props) {
    const {authenticated, workoutTemplatesReceived} = props;
    if (authenticated && !workoutTemplatesReceived) {
      const {dispatch} = this.props;
      dispatch(requestWorkoutTemplates());
    }
  }

  handleSignOut() {
    const {dispatch} = this.props;
    dispatch(requestSignOut());
  }

  renderNavbar() {
    const {authenticated} = this.props;
    if (!authenticated) {
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
  }

  renderWorkoutTemplateMenu() {
    const {workoutTemplates} = this.props;
    return workoutTemplates.map(workoutTemplate => {
      return <LinkContainer
        key={workoutTemplate.name}
        to={`/workout-template/${workoutTemplate.name}`}
      >
        <MenuItem>{workoutTemplate.name}</MenuItem>
      </LinkContainer>;
    });
  }

  render() {
    const {children} = this.props;
    return <div>
      <Navbar inverse fixedTop>
        <div className="container">
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Max Reps Fire</Link>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>
          {this.renderNavbar()}
        </div>
      </Navbar>
      <Grid className="container theme-showcase">
        {children}
        {DevTools && <DevTools/>}
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
    authenticated: state.user.authenticated,
    workoutTemplatesReceived: state.workoutTemplate.received,
    workoutTemplates: Object.values(state.workoutTemplate.data)
  };
}

export default connect(mapStateToProps)(App);
