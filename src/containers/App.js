import React, {Component} from 'react';
import {Button, Navbar, Nav, NavItem} from 'react-bootstrap';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';

import DevTools from './DevTools';
import {requestSignOut} from '../actions';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleSignOut = this.handleSignOut.bind(this);
  }

  render() {
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
            </Nav>
            {this.props.authenticated && <Navbar.Form pullRight>
              <Button type="button" onClick={this.handleSignOut}>Sign Out</Button>
            </Navbar.Form>}
          </Navbar.Collapse>
        </div>
      </Navbar>
      <main className="container theme-showcase">
        {this.props.children}
        <DevTools/>
      </main>
    </div>;
  }

  handleSignOut() {
    this.props.dispatch(requestSignOut());
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.user.authenticated
  }
}

export default connect(mapStateToProps)(App);
