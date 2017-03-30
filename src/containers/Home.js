import React, {PropTypes} from 'react';
import {Row, Well} from 'react-bootstrap';
import {connect} from 'react-redux';
import {getAuthChecked} from '../helpers/selectors';
import {LoadingIndicator} from '../components';

function Home({authChecked}) {
  return <Row>
    <Well>Max Reps Fire is a weight lifting log app.</Well>
    <LoadingIndicator loading={!authChecked} />
  </Row>;
}

function mapStateToProps(state) {
  return {
    authChecked: getAuthChecked(state)
  };
}

Home.propTypes = {
  authChecked: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(Home);
