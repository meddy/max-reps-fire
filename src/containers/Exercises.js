import React, {Component, PropTypes} from 'react';
import {Button, Col, Row} from 'react-bootstrap';
import {connect} from 'react-redux';

import actions from '../actions';
import {ExerciseList, LoadingIndicator, NewEntityModal} from '../components';

class Exercises extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false
    };

    this.getNameValidationState = this.getNameValidationState.bind(this);
    this.onSubmitNewExercise = this.onSubmitNewExercise.bind(this);
    this.onClickExerciseDelete = this.onClickExerciseDelete.bind(this);
  }

  componentWillMount() {
    const {dispatch} = this.props;
    dispatch(actions.requestExercises());
  }

  getNameValidationState(value) {
    const {user, system} = this.props;

    if (!value.length) {
      return;
    }

    if (user.includes(value) || system.includes(value)) {
      return 'error';
    }

    return 'success';
  }

  onSubmitNewExercise(value) {
    const {dispatch} = this.props;
    dispatch(actions.createExercise(value));
    this.setState({isModalVisible: false});
  }

  onClickExerciseDelete(exercise) {
    const {dispatch} = this.props;
    dispatch(actions.deleteExercise(exercise));
  }

  render() {
    const {system, user} = this.props;

    return <LoadingIndicator loading={!system.length && !user.length}>
      <Row>
        <Col lg={6} lgOffset={3}>
          <div className="clearfix">
            <h4 className="pull-left">User Defined</h4>
            <Button
              bsStyle="success"
              title="New Workout"
              className="pull-right"
              onClick={() => this.setState({isModalVisible: true})}
            >
              <span className="glyphicon glyphicon-plus" /> Exercise
            </Button>
          </div>
          <ExerciseList items={user} onClickDelete={this.onClickExerciseDelete} />
        </Col>
        <Col lg={6} lgOffset={3}>
          <h4>System Defined</h4>
            <ExerciseList items={system} />
        </Col>
        <NewEntityModal
          onHide={() => this.setState({isModalVisible: false})}
          onSubmit={this.onSubmitNewExercise}
          show={this.state.isModalVisible}
          title="Add New Exercise"
          getValidationState={this.getNameValidationState}
        />
      </Row>
    </LoadingIndicator>;
  }
}

Exercises.propTypes = {
  dispatch: PropTypes.func.isRequired,
  system: PropTypes.arrayOf(PropTypes.string).isRequired,
  user: PropTypes.arrayOf(PropTypes.string).isRequired
};

Exercises.defaultProps = {
  system: [],
  user: []
};

function mapStateToProps(state) {
  return {
    system: Object.values(state.exercise.system),
    user: Object.values(state.exercise.user)
  };
}

export default connect(mapStateToProps)(Exercises)
