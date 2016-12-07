import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Breadcrumb, Button, Col, Row} from 'react-bootstrap';
import {browserHistory} from 'react-router';

import {ConfirmModal} from '../components';
import {removeWorkoutTemplate} from '../actionCreators';
import {getWorkoutTemplate} from '../selectors';

class WorkoutTemplate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false
    };

    this.onConfirmDeleteWorkoutTemplate = this.onConfirmDeleteWorkoutTemplate.bind(this);
  }

  onConfirmDeleteWorkoutTemplate() {
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
          onClick={() => this.setState({isModalVisible: true})}
        >
          <span className="glyphicon glyphicon-trash" /> Exercise
        </Button>
      </Col>
      <ConfirmModal
        onHide={() => this.setState({isModalVisible: false})}
        onConfirm={this.onConfirmDeleteWorkoutTemplate}
        show={this.state.isModalVisible}
        title={`Delete ${data.name}?`}
      />
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
