import React, {Component, PropTypes} from 'react';
import {Breadcrumb, Button, ButtonToolbar, Col, Row} from 'react-bootstrap';
import {connect} from 'react-redux';
import {LinkContainer} from 'react-router-bootstrap';
import {getWorkoutTemplate} from '../selectors';

class WorkoutTemplateEdit extends Component
{
  render() {
    const {name} = this.props;
    return <Row>
      <Col lg={8} lgOffset={2}>
        <Breadcrumb>
          <LinkContainer to={`/workout-template/${name}`}>
            <Breadcrumb.Item active>{name}</Breadcrumb.Item>
          </LinkContainer>
          <Breadcrumb.Item active>Exercise Templates</Breadcrumb.Item>
        </Breadcrumb>
        <ButtonToolbar>
            <Button bsStyle="primary" title="Add Workout">
              <span className="glyphicon glyphicon-plus" /> Template
            </Button>
        </ButtonToolbar>
      </Col>
    </Row>;
  }
}

function mapStateToProps(state, props) {
  const {name} = getWorkoutTemplate(state, props);
  return {name};
}

export default connect(mapStateToProps)(WorkoutTemplateEdit)