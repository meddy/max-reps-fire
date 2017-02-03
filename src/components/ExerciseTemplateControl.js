import React, {Component, PropTypes} from 'react';
import {Col, Form, FormControl, FormGroup, Glyphicon} from 'react-bootstrap';
import {rangeShape} from '../helpers/shapes';

export default class ExerciseTemplateControl extends Component {
  constructor(props) {
    super(props);

    this.state = {
      min: props.value.min,
      max: props.value.max
    };
  }

  onChange = (property, value) => {
    this.setState({[property]: value}, () => this.props.onChange(this.state));
  };

  render() {
    return <Form horizontal>
      <FormGroup className="exercise-template-control">
        <Col sm={2}>
          <label>{this.props.label}</label>
        </Col>
        <Col sm={10}>
          <FormControl
            type="number"
            value={this.state.min}
            onChange={e => this.onChange('min', e.target.value)}
          />
          <Glyphicon glyph="minus" />
          <FormControl
            type="number"
            value={this.state.max}
            onChange={e => this.onChange('max', e.target.value)}
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
