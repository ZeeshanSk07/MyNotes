import React, { useState } from 'react';
import './Desktop.css'
import Popup from './Popup.jsx';
import defaultpage from '../Images/defaultpage.png'
import lock from '../Images/encryp.png'
import msgsend from '../Images/Sendmsg.png';
import Sidebar from './Sidebar.jsx';
import moment from 'moment';

function Desktop() {

  const storedGroup = localStorage.getItem('group');
  const initialGroup = storedGroup ? JSON.parse(storedGroup) : [];
  const [group, setGroup] = useState(initialGroup);
  const [groupName, setGroupName] = useState('');
  const [pop, setPop] = useState(false);
  const [inputval, setInputval] = useState('');
  const [selected, setSelected] = useState('');
  const [color, setColor] = useState('');
  const [msg, setMsg] = useState('');
  const [note, setNote] = useState(JSON.parse(localStorage.getItem('Notes')) || []);
  const [send , setSend] = useState(false);
  
  

  const sendnote = () => {
    const formattedDate = moment().format('D MMM YYYY');
    const formattedTime = moment().format('hh:mm A');
  if (msg.trim() !== '') {
    const newNote = {
      date : formattedDate,
      time : formattedTime,
      content: msg
    };
    // Update 'Notes' in localStorage
    const updatedNotes = [...note, newNote];
    setNote(updatedNotes);
    localStorage.setItem("Notes", JSON.stringify(updatedNotes));

    // Find the selected group and update its notes
    const updatedGroup = group.map(grp => {
      if (grp.name === selected.name) {
        return {
          ...grp,
          notes: [...(grp.notes || []), newNote]
        };
      }
      return grp;
    });

    // Update 'group' in localStorage
    setGroup(updatedGroup);
    localStorage.setItem("group", JSON.stringify(updatedGroup));
  }

  setMsg('');
};




  return (
    <>
      <div className="container">
        <div className="left">
          <h1 style={{margin:'0px'}}>Pocket Notes</h1>
          <Sidebar group={group} selected={selected} setSelected={setSelected}/>
          <div onClick={e => setPop(true)} className='addgrp'>+</div>
        </div>

        <div className="right">
          {selected ? (
            <div className="notes">
              <div className="note">
                <h2 style={{backgroundColor:'#001F8B'}}><button className='grpbtn' style={{ backgroundColor: selected.bgcolor,color:'white',fontWeight:'500',fontSize:'1em',padding:'0', width:'2.7em',height:'2.7em' }}>{selected.display}</button>{selected.name}</h2>
                <div className='note-content'>
                  {group.map(grp=>{
                    if(grp.name === selected.name){
                      return grp.notes.map((note, i) => {
                        return (
                          <div key={i} className="localnote">
                            <p className='notec'>{note.content}</p>
                            <div className='timestamp'>
                                <p>{note.date}</p>
                                <p style={{backgroundColor:'black',width:'8px',height:'8px', borderRadius:'50%'}}></p>
                                <p>{note.time}</p>
                            </div>
                          </div>
                        )
                      })
                    }else{
                      return null;
                    }
                  })}
                    
                  
                </div>
                <div className='noteinput' style={{backgroundColor:'#001F8B'}}>
                  <textarea autoFocus type="text" value={msg} placeholder='Enter your text here...........' onChange={(e) => {setMsg(e.target.value);setSend(e.target.value.trim().length > 0)}}/>
                  <button className='sendmsg' onClick={sendnote}><img src={msgsend} style={{opacity: send ? 1 : 0.4, cursor:send? 'pointer': 'not-allowed'}} alt="send"/></button>
                </div>
              </div>
            </div>
          ) : (
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

export default Desktop