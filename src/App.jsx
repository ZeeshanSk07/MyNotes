import React, { useState, useEffect } from "react";
import Desktop from "./Components/Desktop/Desktop";
import Home from "./Components/Mobile/Home";
import Notes from "./Components/Mobile/Notes";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      {windowWidth > 600 ? (
        <Desktop />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/notes" element={<Notes />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
