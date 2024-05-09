import React from 'react';
import './Sidebar.css';

function Sidebar({group, selected, setSelected }) {
  let names = JSON.parse(localStorage.getItem('group')) || []; // Ensure names is an array
  const openModal = (grp) => {
    setSelected(grp);
  };

  return (
    <>
      <div className="sidebar">
        {names.map((grp, index) => {
          return (
            <div key={index} style={{ backgroundColor: selected && selected.name === grp.name ? '#D4DEEE' : 'transparent' }}  className="grpname" onClick={() => openModal(grp)}>
              <button className='grpbtn' style={{ backgroundColor: grp.bgcolor }}></button>{grp.name}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Sidebar;
