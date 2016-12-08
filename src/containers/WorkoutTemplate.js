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
      deleteWorkoutTemplateVisible: false
    };
  }

  showNewWorkoutTemplate = () =>{
    this.setState({deleteWorkoutTemplateVisible: true});
  };

  hideNewWorkoutTemplate = () => {
    this.setState({deleteWorkoutTemplateVisible: false});
  };

  onConfirmDeleteWorkoutTemplate = () => {
    const {data, dispatch} = this.props;
    dispatch(removeWorkoutTemplate(data.name));
    browserHistory.goBack();
  };

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
          onClick={this.showNewWorkoutTemplate}
        >
          <span className="glyphicon glyphicon-trash" /> Exercise
        </Button>
      </Col>
      <ConfirmModal
        onHide={this.hideNewWorkoutTemplate}
        onConfirm={this.onConfirmDeleteWorkoutTemplate}
        show={this.state.deleteWorkoutTemplateVisible}
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
