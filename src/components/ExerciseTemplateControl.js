import {isNumber} from 'lodash/fp';
import React, {Component, PropTypes} from 'react';
import {Col, Form, FormControl, FormGroup, Glyphicon} from 'react-bootstrap';
import {rangeShape} from '../helpers/shapes';

export default class ExerciseTemplateControl extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    value: rangeShape
  };

  state = {
    min: this.props.value.min,
    max: this.props.value.max
  };

  getValidationState = () => {
    const {min, max} = this.state;
    return isNumber(min) && isNumber(max) ? null : 'error';
  };

  render() {
    const {min, max} = this.state;
    return <Form horizontal>
      <FormGroup className="exercise-template-control" validationState={this.getValidationState()}>
        <Col sm={2}>
          <label>{this.props.label}</label>
        </Col>
        <Col sm={10}>
          <FormControl
            type="number"
            value={min}
            min={0}
            onChange={({target: {value}}) => {
              this.setState({min: value ? parseInt(value, 10): ''});
            }}
          />
          <Glyphicon glyph="minus" />
          <FormControl
            type="number"
            value={max}
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
