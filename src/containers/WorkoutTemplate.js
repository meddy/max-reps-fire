import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {requestWorkoutTemplates} from '../actionCreators';

class WorkoutTemplate extends Component {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(requestWorkoutTemplates());
  }
  render() {
    const {data} = this.props;
    return <h1>{JSON.stringify(data)}</h1>;
  }
}

WorkoutTemplate.propTypes = {
  data: PropTypes.object
};

WorkoutTemplate.defaultProps = {
  data: {}
};

function mapStateToProps(state, props) {
  return {
    data: state.workoutTemplate[props.params.workoutTemplateKey]
  };
}

export default connect(mapStateToProps)(WorkoutTemplate);
