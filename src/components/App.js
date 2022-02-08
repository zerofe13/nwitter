import React, { useEffect, useState } from 'react';
import AppRouter from './Router';
import { authService } from 'fbase';
import { onAuthStateChanged } from 'firebase/auth';

const App = () => {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const [username, setUsername] = useState('');
  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
        setUsername(user.displayName);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  const refreshUsername = () => {
    const user = authService.currentUser;
    setUsername(user.displayName);
  };
  return (
    <>
      {init ? (
        <AppRouter
          refreshUsername={refreshUsername}
          isLoggedIn={isLoggedIn}
          userObj={userObj}
          username={username}
        />
      ) : (
        'Initializeing...'
      )}
    </>
  );
};

export default App;
