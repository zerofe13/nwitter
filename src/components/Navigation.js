import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ userObj, username }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/"> home</Link>
        </li>
        <li>
          <Link to="/profile"> {username}의 Profile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
