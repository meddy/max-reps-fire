import React, {PropTypes} from 'react';

export default function LoadingIndicator({children, loading}) {
  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  return children;
}

LoadingIndicator.propTypes = {
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool.isRequired
};
