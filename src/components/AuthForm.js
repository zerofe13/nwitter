import { authService } from 'fbase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import React, { useState } from 'react';
import styled from 'styled-components';

const AuthInput = styled.input`
  width: 100%;
  max-width: 320px;
  padding: 10px;
  border-radius: 30px;
  background-color: rgba(255, 255, 255, 1);
  margin-bottom: 10px;
  font-size: 12px;
  color: black;
`;
const AuthSubmit = styled(AuthInput)`
  font-size: 14px;
  text-align: center;
  background: #04aaff;
  color: white;
  margin-top: 10px;
  cursor: pointer;
`;

const AuthError = styled.span`
  color: tomato;
  text-align: center;
  font-weight: 500;
  font-size: 15px;
`;

const AuthSwitch = styled.span`
  color: #04aaff;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 50px;
  display: block;
  font-size: 15px;
  text-align: center;
`;

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');
  const onSubmit = async (event) => {
    event.preventDefault();
    const auth = authService;
    try {
      let data;
      if (newAccount) {
        //create account
        data = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        // log in
        data = await signInWithEmailAndPassword(auth, email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);
  return (
    <>
      <form onSubmit={onSubmit} className="container">
        <AuthInput
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <AuthInput
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <AuthSubmit
          type="submit"
          value={newAccount ? 'Create Account' : 'Log in'}
        />
        {{ error } && <AuthError> {error}</AuthError>}
      </form>
      <AuthSwitch onClick={toggleAccount}>
        {newAccount ? 'Sign in' : 'Create Account'}
      </AuthSwitch>
    </>
  );
};

export default AuthForm;
