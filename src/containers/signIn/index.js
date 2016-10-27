import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { authActions } from 'src/core/auth';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
};

export function SignIn({signInWithGoogle, signInWithTwitter, signInWithFacebook}) {
  return (
    <div>
        <h1>Sign In</h1>
        <RaisedButton label="Google" primary={true} style={style} onClick={signInWithGoogle}/> 
        <RaisedButton label="Twitter" primary={true} style={style} onClick={signInWithTwitter}/> 
        <RaisedButton label="FaceBook" primary={true} style={style} onClick={signInWithFacebook}/> 
    </div>
  );
}

SignIn.propTypes = {
  signInWithGoogle: PropTypes.func.isRequired,
  signInWithTwitter: PropTypes.func.isRequired,
  signInWithFacebook: PropTypes.func.isRequired
};


//=====================================
//  CONNECT
//-------------------------------------

export default connect(null, authActions)(SignIn);
