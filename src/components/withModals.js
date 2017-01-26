import React, {Component} from 'react';

/**
 * @param WrappedComponent
 * @param modalNames {String[]}
 */
export default function withModals(WrappedComponent, modalNames) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {...modalNames};
    }

    isModalVisible = name => this.state[name];

    showModal = name => {
      this.setState({[name]: true});
    };

    hideModal = name => {
      this.setState({[name]: false});
    };

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