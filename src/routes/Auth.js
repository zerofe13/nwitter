import AuthForm from 'components/AuthForm';
import { authService } from 'fbase';
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import React from 'react';

const Auth = () => {
  const onSocialClick = async (event) => {
    let provider;
    const {
      target: { name },
    } = event;
    if (name === 'google') {
      provider = new GoogleAuthProvider();
    } else if (name === 'github') {
      provider = new GithubAuthProvider();
    }
    const data = await signInWithPopup(authService, provider);
    console.log(data);
  };
  return (
    <div>
      <AuthForm />
      <div>
        <button onClick={onSocialClick} name="google">
          Continue with Google
        </button>
        <button onClick={onSocialClick} name="github">
          Continue with github
        </button>
      </div>
    </div>
  );
};
export default Auth;
