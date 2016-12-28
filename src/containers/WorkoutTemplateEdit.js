import React, {Component, PropTypes} from 'react';
import {Breadcrumb, Button, ButtonToolbar, Col, Row} from 'react-bootstrap';
import {connect} from 'react-redux';
import {LinkContainer} from 'react-router-bootstrap';
import {addExerciseTemplate, requestExercises} from '../actions/creators';
import {LoadingIndicator, NewExerciseTemplateModal} from '../components';
import {getSelectExercises, getWorkoutTemplate} from '../helpers/selectors';

class WorkoutTemplateEdit extends Component {
  state = {
    exerciseTemplate: {
      title: null,
      visible: false
    }
  };

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(requestExercises());
  }

  // We can probably turn these into mixins or something or some sort of abstraction
  showNewExerciseTemplate = () => {
    this.setState({exerciseTemplate: {visible: true}});
  };

  hideNewExerciseTemplate = () => {
    this.setState({exerciseTemplate: {visible: false}});
  };

  onSubmitNewExerciseTemplate = value => {
    const {dispatch} = this.props;
    dispatch(addExerciseTemplate(value));

    this.hideNewExerciseTemplate();
  };

  render() {
    const {exercises, name} = this.props;
    return <LoadingIndicator loading={!exercises.length}>
      <Row>
        <Col lg={8} lgOffset={2}>
          <Breadcrumb>
            <LinkContainer to={`/workout-template/${name}`}>
              <Breadcrumb.Item active>{name}</Breadcrumb.Item>
            </LinkContainer>
            <Breadcrumb.Item active>Exercise Templates</Breadcrumb.Item>
          </Breadcrumb>
          <ButtonToolbar>
            <Button
              bsStyle="primary"
              title="Add Workout"
              onClick={this.showNewExerciseTemplate}
            >
              <span className="glyphicon glyphicon-plus" /> Template
            </Button>
          </ButtonToolbar>
        </Col>
        <NewExerciseTemplateModal
          exercises={exercises}
          onSubmit={this.onSubmitNewExerciseTemplate}
          onHide={this.hideNewExerciseTemplate}
          show={this.state.exerciseTemplate.visible}
          title="Add Exercise Template"
        />
      </Row>
    </LoadingIndicator>;
  }
}

WorkoutTemplateEdit.propTypes = {
  name: PropTypes.string.isRequired,
  exercises: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string
    })
  ).isRequired
};

function mapStateToProps(state, props) {
  return {
    name: getWorkoutTemplate(state, props).name,
    exercises: getSelectExercises(state)
  };
}

export default connect(mapStateToProps)(WorkoutTemplateEdit);
