import {isNumber} from 'lodash/fp';
import React, {Component, PropTypes} from 'react';
import {Col, Form, FormControl, FormGroup, Glyphicon} from 'react-bootstrap';
import {rangeShape} from '../helpers/shapes';

export default class ExerciseTemplateControl extends Component {
  state = {
    min: this.props.value.min,
    max: this.props.value.max
  };

  getValidationState = () => {
    return isNumber(this.state.min) && isNumber(this.state.max) ? null : 'error';
  };

  render() {
    return <Form horizontal>
      <FormGroup className="exercise-template-control" validationState={this.getValidationState()}>
        <Col sm={2}>
          <label>{this.props.label}</label>
        </Col>
        <Col sm={10}>
          <FormControl
            type="number"
            value={this.state.min}
            min={0}
            onChange={({target: {value}}) => {
              this.setState({min: value ? parseInt(value, 10): ''});
            }}
          />
          <Glyphicon glyph="minus" />
          <FormControl
            type="number"
            value={this.state.max}
            min={0}
            onChange={({target: {value}}) => {
              this.setState({max: value ? parseInt(value, 10): ''});
            }}
          />
        </Col>
      </FormGroup>
    </Form>;
  }
}

ExerciseTemplateControl.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: rangeShape
};
