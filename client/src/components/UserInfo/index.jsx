import React from 'react';

function UserInfo({ name, address }) {
  return (
    <div className="user-info">
      <span className="user-name">{name}</span>
      <span className="user-address">{address}</span>
    </div>
  );
}

export default UserInfo;