import React from 'react';
import './Sidebar.css';

function Sidebar({group, selected, setSelected }) {
  let datastore = localStorage.getItem('group')
  let names = datastore ? JSON.parse(datastore) : []; // Ensure names is an array
  const openModal = (grp) => {
    setSelected(grp);
  };

  return (
    <>
      <div className="sidebar">
        {names.map((grp, index) => {
          return (
            <div key={index} style={{ backgroundColor: selected && selected.name === grp.name ? '#D4DEEE' : 'transparent',fontWeight:'500' }}  className="grpname" onClick={() => openModal(grp)}>
              <button className='grpbtn' style={{ backgroundColor: grp.bgcolor, color:'white',fontWeight:'500',fontSize:'1em',padding:'0' }}>{grp.display}</button>{grp.name}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Sidebar;
