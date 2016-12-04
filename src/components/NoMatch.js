import React from 'react';

// we need to actually always check for auth, even here
export default function NoMatch() {
  return <div className="row">
    <h1>We can't find what you are looking for.</h1>
  </div>;
}
