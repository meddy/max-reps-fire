import React, {Component, PropTypes} from 'react';
import {Button, Grid, Navbar, Nav, NavItem} from 'react-bootstrap';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';

import actions from '../actions';

let DevTools = null;
if (process.env.NODE_ENV === 'development') {
  DevTools = require('./DevTools').default;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  render() {
    const {authenticated, children} = this.props;

    return <div>
      <Navbar inverse fixedTop>
        <div className="container">
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Max Reps Fire</Link>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <LinkContainer to="/workouts">
                <NavItem>Workouts</NavItem>
              </LinkContainer>
              <LinkContainer to="/exercises">
                <NavItem>Exercises</NavItem>
              </LinkContainer>
            </Nav>
            {authenticated && <Navbar.Form pullRight>
              <Button type="button" onClick={this.handleSignOut}>Sign Out</Button>
            </Navbar.Form>}
          </Navbar.Collapse>
        </div>
      </Navbar>
      <Grid className="container theme-showcase">
        {children}
        {DevTools && <DevTools/>}
      </Grid>
    </div>;
  }

  handleSignOut() {
    this.props.dispatch(actions.requestSignOut());
  }
}

App.propTypes = {
  authenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    authenticated: state.user.authenticated
  };
}

export default connect(mapStateToProps)(App);
