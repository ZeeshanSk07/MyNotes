import React, { useState } from 'react'
import Popup from './Components/Popup';

function App() {

  const [group,setGroup] = useState([]);
  const [groupName,setGroupName] = useState('');
  const [pop,setPop] = useState(false);
  const [modal,setModal] = useState('');
  const [color,setColor] = useState('');

  
  
  return (
    <>
      <div className="container">
        <div className="left">
          <Popup color={color} setGroupName={setGroupName} setColor={setColor}/>
        </div>
      </div>
    </>

  )
}

export default App