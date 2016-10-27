import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
};


const LogOff = ({authenticated, signOut}) => {
  return (
    <div>
      {authenticated ? <div><h1>Sign out</h1> <RaisedButton label="Sign out" secondary={true} style={style} onClick={signOut}/></div> : null}
    </div>
  );
};

LogOff.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired
};

export default LogOff;
