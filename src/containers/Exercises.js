import {values} from 'lodash';
import React, {Component, PropTypes} from 'react';
import {Button, Col, Glyphicon, Row} from 'react-bootstrap';
import {connect} from 'react-redux';
import {addExercise, removeExercise} from '../actions';
import {ConfirmModal, ExerciseList, LoadingIndicator, NewEntityModal, withModals} from '../components';

class Exercises extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired,
    isModalVisible: PropTypes.func.isRequired,
    showModal: PropTypes.func.isRequired,
    system: PropTypes.arrayOf(PropTypes.string).isRequired,
    user: PropTypes.arrayOf(PropTypes.string).isRequired
  };

  static defaultProps = {
    system: [],
    user: []
  };

  static mapStateToProps = (state) => {
    return {
      system: values(state.exercise.system),
      user: values(state.exercise.user)
    };
  };

  state = {
    exercise: null
  };

  onSubmitNewExercise = exercise => {
    const {dispatch, hideModal} = this.props;

    dispatch(addExercise(exercise));
    hideModal('newExercise');
  };

  onConfirmDeleteExercise = () => {
    const {dispatch, hideModal} = this.props;

    dispatch(removeExercise(this.state.exercise));
    hideModal('deleteExercise');
  };

  getNameValidationState = value => {
    const {user, system} = this.props;

    if (!value.length) {
      return;
    }

    if (user.includes(value) || system.includes(value)) {
      return 'error';
    }

    return 'success';
  };

  render() {
    const {hideModal, isModalVisible, showModal, system, user} = this.props;

    return <LoadingIndicator loading={!system.length && !user.length}>
      <Row>
        <Col lg={6} lgOffset={3}>
          <div className="clearfix">
            <h4 className="pull-left">User Defined</h4>
            <Button
              bsStyle="success"
              title="New Workout"
              className="pull-right"
              onClick={() => showModal('newExercise')}
            >
              <Glyphicon glyph="plus" /> Exercise
            </Button>
          </div>
          <ExerciseList items={user} onClickDelete={exercise => {
            this.setState({exercise}, () => showModal('deleteExercise'));
          }} />
        </Col>
        <Col lg={6} lgOffset={3}>
          <h4>System Defined</h4>
          <ExerciseList items={system} />
        </Col>
        <NewEntityModal
          onHide={() => hideModal('newExercise')}
          onSubmit={this.onSubmitNewExercise}
          show={isModalVisible('newExercise')}
          title="Add New Exercise"
          getValidationState={this.getNameValidationState}
        />
        <ConfirmModal
          onHide={() => hideModal('deleteExercise')}
          onConfirm={this.onConfirmDeleteExercise}
          show={isModalVisible('deleteExercise')}
          title={`Delete ${this.state.exercise}?`}
        />
      </Row>
    </LoadingIndicator>;
  }
}

const ExercisesWithModals = withModals(Exercises, ['newExercise', 'deleteExercise']);
export default connect(Exercises.mapStateToProps)(ExercisesWithModals);
