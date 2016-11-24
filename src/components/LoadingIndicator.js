import React, {PropTypes} from 'react';

export default function LoadingIndicator(props) {
  if (props.loading) {
    return <div className="loader">Loading...</div>;
  }

  return props.children;
}

LoadingIndicator.propTypes = {
  loading: PropTypes.bool.isRequired
};
