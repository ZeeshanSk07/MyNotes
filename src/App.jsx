import React, { useState } from 'react';
import './App.css'
import Popup from './Components/Popup';
import defaultpage from './Images/defaultpage.png'
import lock from './Images/encryp.png'
import Sidebar from './Components/Sidebar';

function App() {

  const [group,setGroup] = useState([]);
  const [groupName,setGroupName] = useState('');
  const [pop,setPop] = useState(false);
  const [inputval,setInputval] = useState('');
  const [selected,setSelected] = useState('');
  const [color,setColor] = useState('');

 

  return (
    <>
      <div className="container">
        <div className="left">
          <h1 style={{margin:'0px'}}>Pocket Notes</h1>
          <Sidebar selected={selected} setSelected={setSelected}/>
          <div onClick={e=>setPop(true)} className='addgrp'>
          +
          </div>
        </div>

        <div className="right">

          {selected ? (
          <div className="notes">
                  <div className="note">
                    <h2 style={{backgroundColor:selected.bgcolor}}>{selected.name}</h2>
                    <div className='note-content'>{
                      selected.notes.map((note,i) => {
                        return (
                          <div key={i} className="localnote">
                            <p>{note}</p>
                          </div>
                        )
                      })
                    }</div>
                    <div className='noteinput' style={{backgroundColor:selected.bgcolor}}>
                      <textarea type="text" placeholder='Enter your text here...........' />
                    </div>
                    
                  </div>
            
          </div>
          ): (
            <div className="defaultpage">
                <img className='img' src={defaultpage} alt="" />
                <h1>Pocket Notes</h1>
                <p className='para'>Send and receive messages without keeping your phone online.
                  Use Pocket Notes on up to 4 linked devices and 1 mobile phone
                </p>

                <div className='endtoend'>
                  <img src={lock} alt="" />
                  end-to-end encrypted
                </div>
                
            </div>
          )}
        </div>

        <div className="center-pop" style={{visibility:pop ? 'visible' : 'hidden'}}>
          <Popup pop={pop} setPop={setPop} group={group} setGroup={setGroup} inputval={inputval} setInputval={setInputval} color={color} setColor={setColor} groupName={groupName} setGroupName={setGroupName}/>
        </div>

        
        
      </div>
    </>

  )
}

export default App