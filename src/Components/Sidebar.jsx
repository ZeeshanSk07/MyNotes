import React from 'react';
import './Sidebar.css';

function Sidebar({selected,setSelected}) {
    const names = JSON.parse(localStorage.getItem('group'))

    const openmodal = (grp) => {
        setSelected(grp);
        console.log(selected);
    }
  return (
    <>
        <div className="sidebar">
            {names.map((grp,index)=>{
              return (
                <div key={index} className="grpname" onClick={(e)=>{e.preventDefault();openmodal(grp)}}>
                    <button className='grpbtn' style={{backgroundColor:grp.bgcolor}}></button>{grp.name}
                </div>
              )
            })}
        </div>
    </>
  )
}

export default Sidebar