import React, { useState, useEffect } from "react";
import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  const [selected, setSelected] = useState(
    localStorage.getItem("selected") || []
  );
  const [pop, setPop] = useState(false);
  const [inputval, setInputval] = useState("");
  const [color, setColor] = useState("");
  const [groupName, setGroupName] = useState("");
  const groupDataFromLocalStorage = localStorage.getItem("group");
  const [group, setGroup] = useState([]);

  useEffect(() => {
    if (groupDataFromLocalStorage) {
      try {
        setGroup(JSON.parse(groupDataFromLocalStorage));
      } catch (error) {
        console.error("Error parsing group data from localStorage:", error);
      }
    }
  }, [groupDataFromLocalStorage]);
  const openM = (grp) => {
    setSelected(grp);
    localStorage.setItem("selected", JSON.stringify(grp));
  };

  //popup
  const [active, setActive] = useState(false);

  const handleColor = (clr, index) => {
    setColor(clr);
    setActive(index);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const popup = document.querySelector(".Popupmb");
      if (pop && popup && event.target && !popup.contains(event.target)) {
        setPop(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [pop, setPop]);

  function capitalizeFirstLetter(sidename) {
    return sidename.charAt(0).toUpperCase() + sidename.slice(1).toLowerCase();
  }

  const addgroup = () => {
    const display = groupName
      .split(" ") // Split the string by space
      .slice(0, 2) // Take the first two elements
      .map((word) => word.charAt(0).toUpperCase()) // Extract the first letter of each word and convert to uppercase
      .join("");
    let finalname = capitalizeFirstLetter(groupName);
    const newgroup = {
      name: finalname,
      bgcolor: color,
      display: display,
      notes: [],
    };

    setGroup((prevGroup) => {
      const updatedGroup = [...prevGroup, newgroup];
      try {
        localStorage.setItem("group", JSON.stringify(updatedGroup));
      } catch (error) {
        console.error("Error storing data to localStorage:", error);
      }
      return updatedGroup;
    });

    setPop(false);
    setInputval("");
    setActive(false);
    setGroupName("");
  };

  return (
    <>
      <div className="home">
        <h1
          style={{
            position: "sticky",
            top: "0",
            backgroundColor: "white",
            width: "90vw",
            paddingLeft: "20vw",
          }}
        >
          Pocket Notes
        </h1>
        {group.map((grp, index) => {
          return (
            <Link key={index} style={{ textDecoration: "none" }} to="./notes">
              <div
                className="list"
                key={index}
                style={{
                  backgroundColor:
                    selected && selected.name === grp.name
                      ? "#D4DEEE"
                      : "transparent",
                  fontWeight: "500",
                  transition: "background-color 0.3s",
                }}
                onClick={() => openM(grp)}
              >
                <button
                  className="listicon"
                  style={{
                    backgroundColor: grp.bgcolor,
                    border: "none",
                    color: "white",
                    fontWeight: "500",
                    padding: "0",
                  }}
                >
                  {grp.display}
                </button>
                {grp.name}
              </div>
            </Link>
          );
        })}
        <div
          style={{
            padding: "5vh",
            zIndex: "10",
            position: "absolute",
            bottom: "0",
            right: "0",
          }}
        >
          <div onClick={(e) => setPop(true)} className="grpadd">
            +
          </div>
        </div>
        {/* popup div here */}
        {pop ? (
          <div className="Popupmb">
            <h2 style={{ marginBottom: "1.5vh" }}>Create New group</h2>
            <div className="colorgrp">
              <h2 style={{ marginBottom: "0", marginRight: "1em" }}>
                Group Name
              </h2>
              <input
                type="text"
                placeholder="Enter group name"
                value={inputval}
                onChange={(e) => {
                  setGroupName(e.target.value);
                  setInputval(e.target.value);
                }}
              />
            </div>
            <div style={{ display: "flex" }}>
              <h2 style={{ marginBottom: "2vh", marginRight: "0.3em" }}>
                Choose colour
              </h2>
              <div style={{ display: "inline-block" }}>
                {[
                  "#6691FF",
                  "#FF79F2",
                  "#43E6FC",
                  "#F19576",
                  "#0047FF",
                  "#B38BFA",
                ].map((clr, index) => (
                  <span
                    key={index}
                    onClick={() => handleColor(clr, index)}
                    style={{ justifyContent: "space-between" }}
                  >
                    <button
                      className="color-option-mb"
                      style={{
                        backgroundColor: clr,
                        border:
                          active === index
                            ? "1.px solid black"
                            : "1px solid white",
                      }}
                    ></button>
                  </span>
                ))}
              </div>
            </div>
            <div>
              <button onClick={addgroup} className="create-group-btn">
                Create
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default Home;
