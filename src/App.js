import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Header from "./Header/Header";
import Scores from "./Scores/Scores";
import Contact from "./Contact/Contact";
import { database } from "./firebase.js";
import { onValue, ref, orderByChild, query } from "firebase/database";
import ScoreDisplay from "./Scores/ScoreDisplay";
// import Search from "./Search/Search";
import Footer from "./Footer/Footer";

export class App extends Component {
    constructor() {
        super();
        this.state = {
            tableData: [],
        };
    }

    componentDidMount() {
        const dbRef = query(ref(database, "scores"), orderByChild("anime"));

        onValue(dbRef, (snapshot) => {
            let records = [];
            snapshot.forEach((childSnapshot) => {
                let keyName = childSnapshot.key;
                let data = childSnapshot.val();
                records.push({ key: keyName, data: data });
            });
            this.setState({ tableData: records });
        });
    }

    render() {
        return (
            <div>
                <Router>
                    <div className="app">
                        <Routes>
                            <Route
                                path="/"
                                element={[<Header a="home" />, <Home />, <Footer />]}
                            />
                            <Route
                                path="/Sheet%20Music"
                                element={[<Header a="scores" />, <Scores />, <Footer />]}
                            />
                            <Route
                                path="/Contact"
                                element={[<Header a="contact" />, <Contact />, <Footer />]}
                            />
                            {this.state.tableData.map((row) => {
                                let routePath = "Sheet%20Music/" + encodeURIComponent(row.key).replace('%26', '&');
                                return (
                                    <Route
                                        path={routePath}
                                        element={[
                                            <Header a="scores" />,
                                            <ScoreDisplay songTitle={row.key} />, <Footer />
                                        ]}
                                    />
                                );
                            })};
                        </Routes>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
