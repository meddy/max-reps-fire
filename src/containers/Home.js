import React from 'react';
import {Row, Well} from 'react-bootstrap';
import {connect} from 'react-redux';
import {getAuthReceived} from '../helpers/selectors';
import {LoadingIndicator} from '../components';

function Home({authReceived}) {
  return <Row>
    <Well>Max Reps Fire is a weight lifting log app.</Well>
    <LoadingIndicator loading={!authReceived} />
  </Row>;
}

function mapStateToProps(state) {
  return {
    authReceived: getAuthReceived(state)
  };
}

export default connect(mapStateToProps)(Home);
