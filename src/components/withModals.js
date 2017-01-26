import React, {Component} from 'react';

export default function withModals(WrappedComponent, modalNames) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {...modalNames};
    }

    isModalVisible = name => this.state[name];

    hideModal = name => this.setState({[name]: false});

    showModal = name => this.setState({[name]: true});

    render() {
      return <WrappedComponent
        isModalVisible={this.isModalVisible}
        showModal={this.showModal}
        hideModal={this.hideModal}
        {...this.props}
      />;
    }
  };
}