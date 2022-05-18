import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Header from "./Header/Header";
import Scores from "./Scores/Scores";

function App() {
    return (
        <Router>
            <div className="app">
                <Routes>
                    <Route path="/" element={[<Header a="home" />, <Home />]} />
                    <Route path="/Scores" element={[<Header a="scores" />, <Scores />]} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
