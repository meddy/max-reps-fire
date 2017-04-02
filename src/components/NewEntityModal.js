import React, {Component, PropTypes} from 'react';
import {Button, FormControl, FormGroup, Modal} from 'react-bootstrap';

export default class NewEntityModal extends Component {
  static propTypes = {
    onHide: Modal.propTypes.onHide,
    onSubmit: PropTypes.func.isRequired,
    show: Modal.propTypes.show,
    title: PropTypes.string.isRequired,
    getValidationState: PropTypes.func.isRequired
  };

  state = {
    value: ''
  };

  onSubmit = event => {
    event.preventDefault();

    this.props.onSubmit(this.state.value);
    this.setState({value: ''});
  };

  render() {
    const {onHide, show, title, getValidationState} = this.props;
    const {value} = this.state;
    const validationState = getValidationState(value);

    return <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={this.onSubmit}>
          <FormGroup
            controlId="formBasicText"
            validationState={validationState}
          >
            <FormControl
              type="text"
              value={value}
              placeholder="name"
              onChange={e => this.setState({value: e.target.value})}
            />
            <FormControl.Feedback />
          </FormGroup>
          <Button
            type="submit"
            bsStyle="success"
            disabled={validationState !== 'success'}
            block
          >
            Add
          </Button>
        </form>
      </Modal.Body>
    </Modal>;
  }
}
