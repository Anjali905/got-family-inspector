import React, { lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainList from "./components/MainList";
import styles from "./styles/global.module.scss";
const CharacterDetail = lazy(() => import("./components/CharacterDetail"));

function App() {
  return (
    <>
      <Router>
        <div className={styles.mainContainer}>
          <div className={styles.overlay} /> {/* Overlay to darken the background */}
          {/* Routes */}
          <Routes>
            <Route path="/" element={<MainList />} />
            <Route path="/character/:id" element={<CharacterDetail />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;

