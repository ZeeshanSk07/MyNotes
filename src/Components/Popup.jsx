import React from 'react'
import './Popup.css';
const Popup = ({color, setGroupName,setColor  })=> {

  const handlecolor = (clr) => {
    setColor(clr);
  }

  return (
    <>
      <div className="Popup">
        <h2 style={{marginTop:'20px'}}>Create New group</h2>

        <div className='colorgrp'>
          <h2>Group Name</h2>
          <input type="text" placeholder='Enter group name' onChange={(e)=> {setGroupName(e.target.value)}} />
        </div>

        <div>
          <h2>Choose colour</h2>
          <div>
              <button onClick={(e)=>handlecolor('#B38BFA')} className='color-option' style={{backgroundColor:'#B38BFA'}}>
              </button>
              <button onClick={()=>handlecolor('#FF79F2')} className='color-option' style={{backgroundColor:'#FF79F2'}}>
              </button>
              <button onClick={()=>handlecolor('#43E6FC')} className='color-option' style={{backgroundColor:'#43E6FC'}}>
              </button>
              <button onClick={()=>handlecolor('#F19576')} className='color-option' style={{backgroundColor:'#F19576'}}>
              </button>
              <button onClick={()=>handlecolor('#0047FF')} className='color-option' style={{backgroundColor:'#0047FF'}}>
              </button>
              <button onClick={()=>handlecolor('#6691FF')} className='color-option' style={{backgroundColor:'#6691FF'}}>
              </button>
          </div>
        </div>
        <div>
          <button className='create-group-btn'>Create</button>
        </div>
      </div>
    </>
  )
}

export default Popup