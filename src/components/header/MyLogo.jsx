import React from 'react';
import './MyLogo.css';

function PageIcon({  icon, title }) {
  return (
    <div className="title-container">
      <img src={icon} alt={title} style={{ height: 200, width: 200 }} />
    </div>
  );
}

export default PageIcon;