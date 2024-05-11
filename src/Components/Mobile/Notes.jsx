import React, { useState } from "react";
import moment from "moment";
import msgsend from "../../Images/Sendmsg.png";
import "./Notes.css";
import backbtn from "../../Images/back.png";

function Notes() {
  const [send, setSend] = useState("");
  const [msg, setMsg] = useState("");
  const [group, setGroup] = useState(
    JSON.parse(localStorage.getItem("group")) || []
  );

  let selected = JSON.parse(localStorage.getItem("selected")) || [];

  const sendnote = () => {
    const formattedDate = moment().format("D MMM YYYY");
    const formattedTime = moment().format("hh:mm A");
    if (msg.trim() !== "") {
      const newNote = {
        date: formattedDate,
        time: formattedTime,
        content: msg,
      };

      // Find the selected group
      const updatedGroup = group.map((grp) => {
        if (grp.name === selected.name) {
          return {
            ...grp,
            notes: [...(grp.notes || []), newNote],
          };
        }
        return grp;
      });

      // Update 'group' in localStorage and state
      localStorage.setItem("group", JSON.stringify(updatedGroup));
      setGroup(updatedGroup); // Use state updater function callback

      // Clear message input
      setMsg("");
    }
  };

  const back = () => {
    window.location.href = "/";
  };

  return (
    <>
      <div className="notesmb">
        <h2 style={{ backgroundColor: "#001F8B" }}>
          <div onClick={back} className="back">
            <img src={backbtn} alt="back" />
          </div>
          <button
            className="grpbtnmb"
            style={{
              backgroundColor: selected.bgcolor,
              color: "white",
              fontWeight: "500",
              fontSize: "1em",
              padding: "0",
              width: "2.6em",
              height: "2.6em",
            }}
          >
            {selected.display}
          </button>
          {selected.name}
        </h2>
        <div className="note-content-mb">
          {group.map((grp) => {
            if (grp.name === selected.name) {
              return grp.notes.map((note, i) => {
                return (
                  <div key={i} className="localnotemb">
                    <p className="notec">{note.content}</p>
                    <div className="timestampmb">
                      <p>{note.date}</p>
                      <p
                        style={{
                          backgroundColor: "black",
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                        }}
                      ></p>
                      <p>{note.time}</p>
                    </div>
                  </div>
                );
              });
            } else {
              return null;
            }
          })}
        </div>
        <div className="noteinputmb" style={{ backgroundColor: "#001F8B" }}>
          <textarea
            autoFocus
            type="text"
            value={msg}
            placeholder="Enter your text here......."
            onChange={(e) => {
              setMsg(e.target.value);
              setSend(e.target.value.trim().length > 0);
            }}
          />
          <button className="sendmsgmb" onClick={sendnote}>
            <img
              src={msgsend}
              style={{
                opacity: send ? 1 : 0.4,
                cursor: send ? "pointer" : "not-allowed",
              }}
              alt="send"
            />
          </button>
        </div>
      </div>
    </>
  );
}
export default Notes;
