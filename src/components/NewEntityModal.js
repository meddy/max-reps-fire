import React, {Component, PropTypes} from 'react';
import {Button, FormControl, FormGroup, Modal} from 'react-bootstrap';

export default class NewEntityModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    const {onSubmit} = this.props;

    event.preventDefault();
    onSubmit(this.state.value);
    this.setState({value: ''});
  }

  render() {
    const {onHide, show, title, getValidationState} = this.props;
    const validationState = getValidationState(this.state.value);

    return <Modal
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <FormGroup
            controlId="formBasicText"
            validationState={validationState}
          >
            <FormControl
              type="text"
              value={this.state.value}
              placeholder="name"
              onChange={e => this.setState({value: e.target.value})}
            />
            <FormControl.Feedback />
          </FormGroup>
          <Button
            type="submit"
            bsStyle="success"
            disabled={validationState !== 'success'}
            onClick={this.onClick}
            block
          >
            Add
          </Button>
        </form>
      </Modal.Body>
    </Modal>;
  }
}

NewEntityModal.propTypes = {
  onHide: Modal.propTypes.onHide,
  onSubmit: PropTypes.func.isRequired,
  show: Modal.propTypes.show,
  title: PropTypes.string.isRequired,
  getValidationState: PropTypes.func.isRequired
};
