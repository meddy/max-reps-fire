import React, {Component, PropTypes} from 'react';
import {Breadcrumb, Button, ButtonToolbar, Col, Row} from 'react-bootstrap';
import {connect} from 'react-redux';
import {LinkContainer} from 'react-router-bootstrap';
import {requestExercises} from '../actionCreators';
import {LoadingIndicator, NewExerciseTemplateModal} from '../components';
import {getSelectExercises, getWorkoutTemplate} from '../selectors';

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

  showNewExerciseTemplate = () => {
    this.setState({exerciseTemplate: {visible: true}});
  };

  hideNewExerciseTemplate = () => {
    this.setState({exerciseTemplate: {visible: false}});
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
          onHide={this.hideNewExerciseTemplate}
          show={this.state.exerciseTemplate.visible}
          title="Add Exercise Template"
          exercises={exercises}
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

export default connect(mapStateToProps)(WorkoutTemplateEdit)