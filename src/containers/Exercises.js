import React, {Component, PropTypes} from 'react';
import {Button, Col, Row} from 'react-bootstrap';
import {connect} from 'react-redux';
import {addExercise, requestExercises, removeExercise} from '../actions/creators';
import {ConfirmModal, ExerciseList, LoadingIndicator, NewEntityModal} from '../components';

class Exercises extends Component {
  state = {
    newExerciseVisible: false,
    deleteExercise: {
      visible: false,
      name: null
    }
  };

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(requestExercises());
  }

  showNewExercise = () => {
    this.setState({newExerciseVisible: true});
  };

  hideNewExercise = () => {
    this.setState({newExerciseVisible: false});
  };

  showDeleteExercise = name => {
    this.setState({
      deleteExercise: {
        visible: true,
        name
      }
    });
  };

  hideDeleteExercise = () => {
    this.setState({
      deleteExercise: {
        visible: false,
        title: null
      }
    });
  };

  onSubmitNewExercise = value => {
    const {dispatch} = this.props;
    dispatch(addExercise(value));

    this.hideNewExercise();
  };

  onConfirmDeleteExercise = () => {
    const {dispatch} = this.props;
    dispatch(removeExercise(this.state.deleteExercise.name));

    this.hideDeleteExercise();
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
              onClick={this.showNewExercise}
            >
              <span className="glyphicon glyphicon-plus" /> Exercise
            </Button>
          </div>
          <ExerciseList items={user} onClickDelete={this.showDeleteExercise} />
        </Col>
        <Col lg={6} lgOffset={3}>
          <h4>System Defined</h4>
          <ExerciseList items={system} />
        </Col>
        <NewEntityModal
          onHide={this.hideNewExercise}
          onSubmit={this.onSubmitNewExercise}
          show={this.state.newExerciseVisible}
          title="Add New Exercise"
          getValidationState={this.getNameValidationState}
        />
        <ConfirmModal
          onHide={this.hideDeleteExercise}
          onConfirm={this.onConfirmDeleteExercise}
          show={this.state.deleteExercise.visible}
          title={`Delete ${this.state.deleteExercise.name}?`}
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
