import React, { useEffect, useState } from 'react';
import './Popup.css';

const Popup = ({ pop, setPop, inputval, setInputval, color, setColor, group, setGroup, groupName, setGroupName }) => {
  const [active, setActive] = useState(false);

  const handleColor = (clr, index) => {
    setColor(clr);
    setActive(index);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const popup = document.querySelector('.Popup');
      if (pop && popup && event.target && !popup.contains(event.target)) {
        setPop(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [pop, setPop]);

  const addgroup = () => {
  const newgroup = {
    name: groupName,
    bgcolor: color,
    notes: []
  };
  
  setGroup(prevGroup => {
    const updatedGroup = [...prevGroup, newgroup];
    localStorage.setItem('group', JSON.stringify(updatedGroup));
    return updatedGroup;
  });

  setPop(false);
  setInputval('');
  setActive(false);
  setGroupName('');
};
  return (
    <div className="Popup">
      <h2 style={{ marginTop: '20px' }}>Create New group</h2>

      <div className='colorgrp'>
        <h2>Group Name</h2>
        <input type="text" placeholder='Enter group name' value={inputval} onChange={(e) => { setGroupName(e.target.value); setInputval(e.target.value) }} />
      </div>

      <div>
        <h2>Choose colour</h2>
        <div>
          {['#6691FF', '#FF79F2', '#43E6FC', '#F19576', '#0047FF', '#B38BFA'].map((clr, index) => (
            <span key={index} onClick={() => handleColor(clr, index)} style={{ border: active === index ? '2px solid blue' : '1px solid white' }}>
              <button className='color-option' style={{ backgroundColor: clr, border: '1px solid white' }}>
              </button>
            </span>
          ))}
        </div>
      </div>
      <div>
        <button onClick={addgroup} className='create-group-btn'>Create</button>
      </div>
    </div>
  );
};

export default Popup;
