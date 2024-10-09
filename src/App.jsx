import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Home from "./Pages/Home";
import {BrowserRouter as Router, Routes,Route } from "react-router-dom";
import InputForm from "./Pages/InputForm";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div>
        <Router>
          <Routes>
            <Route path="/" element = {<Home/>} />
            <Route path="/input" element = {<InputForm/>} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
