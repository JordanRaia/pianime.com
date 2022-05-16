import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Header from "./Header/Header";
import Upload from "./Upload/Upload";

function App() {
    return (
        <Router>
            <div className="app">
                <Routes>
                    <Route path="/" element={[<Header a="home" />, <Home />]} />
                </Routes>
                <Routes>
                    <Route path="/Upload" element={[<Header />, <Upload />]} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
