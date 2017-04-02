import React, {Component, PropTypes} from 'react';
import {Row} from 'react-bootstrap';
import {connect} from 'react-redux';

// Make Functional
class NoMatch extends Component {
  render() {
    return <Row>
      <h1>We can't find what you are looking for.</h1>
    </Row>;
  }
}

NoMatch.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {authenticated: state.user.authenticated};
}

export default connect(mapStateToProps)(NoMatch);
