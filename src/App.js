import React, {Component} from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {Link} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';

class App extends Component {
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
          </Navbar.Collapse>
        </div>
      </Navbar>
      <main className="container theme-showcase">
        {this.props.children}
      </main>
    </div>;
  }
}

export default App;
