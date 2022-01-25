import { authService } from 'fbase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import React, { useState } from 'react';

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
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input type="submit" value={newAccount ? 'Create Account' : 'Log in'} />
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? 'Sign in' : 'Create Account'}
      </span>
    </>
  );
};

export default AuthForm;
