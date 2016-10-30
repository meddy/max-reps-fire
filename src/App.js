import React, {Component} from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

class App extends Component {
  render() {
    return <div>
      <Navbar inverse fixedTop>
        <div className="container">
          <Navbar.Header>
            <Navbar.Brand>
              <a>Max Reps Fire</a>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href="#">Workouts</NavItem>
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
