import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Navigation = ({ username }) => {
  return (
    <nav>
      <ul
        style={{
          display: 'flex',
          justifyContent: 'center',
          listStyle: 'none',
          marginTop: 50,
        }}
      >
        <li>
          <Link to="/" style={{ marginRight: 20 }}>
            <FontAwesomeIcon icon={faTwitter} color={'#04AAFF'} size="2x" />
          </Link>
        </li>
        <li>
          <Link
            to="/profile"
            style={{
              marginLeft: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              fontSize: 12,
            }}
          >
            <FontAwesomeIcon icon={faUser} color={'#04AAFF'} size="2x" />
            {username}의 Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
