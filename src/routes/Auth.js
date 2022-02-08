import AuthForm from 'components/AuthForm';
import styled from 'styled-components';
import { authService } from 'fbase';
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faGoogle,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import React from 'react';

const AuthBlock = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;
const AuthBtns = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 320px;
`;
const AuthBtn = styled.button`
  cursor: pointer;
  border-radius: 20px;
  border: none;
  padding: 10px 0;
  font-size: 12px;
  text-align: center;
  width: 150px;
  background: white;
`;
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
    <AuthBlock>
      <FontAwesomeIcon
        icon={faTwitter}
        color={'#04AAFF'}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <AuthForm />
      <AuthBtns>
        <AuthBtn onClick={onSocialClick} name="google">
          Continue with Google <FontAwesomeIcon icon={faGoogle} />
        </AuthBtn>
        <AuthBtn onClick={onSocialClick} name="github">
          Continue with github <FontAwesomeIcon icon={faGithub} />
        </AuthBtn>
      </AuthBtns>
    </AuthBlock>
  );
};
export default Auth;
