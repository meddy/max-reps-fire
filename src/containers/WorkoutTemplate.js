import React, {Component, PropTypes} from 'react';
import {Breadcrumb, Button, ButtonGroup, ButtonToolbar, Col, Row} from 'react-bootstrap';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';
import {ConfirmModal} from '../components';
import {removeWorkoutTemplate} from '../actionCreators';
import {getWorkoutTemplate} from '../selectors';

class WorkoutTemplate extends Component {
  removeOnUnmount = false;

  state = {
    deleteWorkoutTemplateVisible: false
  };

  showNewWorkoutTemplate = () => {
    this.setState({deleteWorkoutTemplateVisible: true});
  };

  hideNewWorkoutTemplate = () => {
    this.setState({deleteWorkoutTemplateVisible: false});
  };

  onConfirmDeleteWorkoutTemplate = () => {
    browserHistory.goBack();
    this.removeOnUnmount = true;
  };

  componentWillUnmount() {
    const {name, dispatch} = this.props;
    if (this.removeOnUnmount) {
      dispatch(removeWorkoutTemplate(name));
    }
  }

  render() {
    const {name} = this.props;
    return <Row>
      <Col lg={8} lgOffset={2}>
        <Breadcrumb>
          <Breadcrumb.Item active>{name}</Breadcrumb.Item>
        </Breadcrumb>
        <ButtonToolbar>
          <ButtonGroup>
            <Button bsStyle="primary" title="Add Workout">
              <span className="glyphicon glyphicon-plus" /> Workout
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <LinkContainer to={`/workout-template/${name}/edit`}>
              <Button title="Edit Workout Template">
                <span className="glyphicon glyphicon-edit" /> Template
              </Button>
            </LinkContainer>
            <Button
              bsStyle="danger"
              title="Delete Workout Template"
              onClick={this.showNewWorkoutTemplate}
            >
              <span className="glyphicon glyphicon-trash" /> Template
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
      </Col>
      <ConfirmModal
        onHide={this.hideNewWorkoutTemplate}
        onConfirm={this.onConfirmDeleteWorkoutTemplate}
        show={this.state.deleteWorkoutTemplateVisible}
        title={`Delete ${name}?`}
      />
    </Row>;
  }
}

WorkoutTemplate.propTypes = {
  name: PropTypes.string.isRequired
};

function mapStateToProps(state, props) {
  const {name} = getWorkoutTemplate(state, props);
  return {name};
}

export default connect(mapStateToProps)(WorkoutTemplate);
