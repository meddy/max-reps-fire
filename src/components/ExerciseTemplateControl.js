import React, {Component, PropTypes} from 'react';
import {Form, FormControl, FormGroup} from 'react-bootstrap';

export default class ExerciseTemplateControl extends Component {
  constructor(props) {
    super(props);

    this.state = {
      min: props.value.min,
      max: props.value.max
    };
  }

  onChange = (key, value) => {
    this.setState({[key]: value}, () => this.props.onChange(this.state));
  };

  render() {
    const {label} = this.props;
    return <FormGroup className="text-center">
      <h5>{label}</h5>
      <Form inline>
        <FormControl
          type="number"
          value={this.state.min}
          onChange={e => this.onChange('min',  e.target.value)}
        />
        <span className="glyphicon glyphicon-minus" />
        <FormControl
          type="number"
          value={this.state.max}
          onChange={e => this.onChange('max',  e.target.value)}
        />
      </Form>
    </FormGroup>;
  }
}

ExerciseTemplateControl.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.shape({min: PropTypes.string, max: PropTypes.string})
};