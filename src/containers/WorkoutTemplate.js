import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Breadcrumb, Button, Col, Row} from 'react-bootstrap';
import {browserHistory} from 'react-router';

import {removeWorkoutTemplate} from '../actionCreators';
import {getWorkoutTemplate} from '../selectors';

class WorkoutTemplate extends Component {
  constructor(props) {
    super(props);

    this.onDeleteWorkoutTemplate = this.onDeleteWorkoutTemplate.bind(this);
  }

  onDeleteWorkoutTemplate() {
    const {data, dispatch} = this.props;
    dispatch(removeWorkoutTemplate(data.name));
    browserHistory.goBack();
  }

  render() {
    const {data} = this.props;
    return <Row>
      <Col lg={6} lgOffset={3}>
        <Breadcrumb>
          <Breadcrumb.Item active>{data.name}</Breadcrumb.Item>
        </Breadcrumb>
        <Button
          bsStyle="danger"
          title="Delete Workout Template"
          onClick={this.onDeleteWorkoutTemplate}
        >
          <span className="glyphicon glyphicon-trash" /> Exercise
        </Button>
      </Col>
    </Row>;
  }
}

WorkoutTemplate.propTypes = {
  data: PropTypes.object
};

WorkoutTemplate.defaultProps = {
  data: {}
};

function mapStateToProps(state, props) {
  return {
    data: getWorkoutTemplate(state, props)
  };
}

export default connect(mapStateToProps)(WorkoutTemplate);
