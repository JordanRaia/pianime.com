import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Header from "./Header/Header";
import Scores from "./Scores/Scores";
import Contact from "./Contact/Contact";
import { database } from "./firebase.js";
import { onValue, ref, query } from "firebase/database";
import ScoreDisplay from "./Scores/ScoreDisplay";
// import Search from "./Search/Search";
import Footer from "./Footer/Footer";
import { t } from "i18next";

export class App extends Component {
    constructor() {
        super();
        this.state = {
            tableDataEn: [],
            tableDataJp: [],
        };
    }

    componentDidMount() {
        const dbRef = query(ref(database, `source`));

        onValue(dbRef, (snapshot) => {
            let records = [];
            snapshot.forEach((childSnapshot) => {
                childSnapshot.forEach((cCSnapshot) => {
                    let sKeyName = cCSnapshot.key;
                    let sData = cCSnapshot.val();
                    if (sKeyName !== "en" && sKeyName !== "jp") {
                        records.push({ key: sKeyName, data: sData });
                    }
                });
            });
            this.setState({ tableDataEn: records });
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
                                element={[
                                    <Header a="home" />,
                                    <Home />,
                                    <Footer />,
                                ]}
                            />
                            <Route
                                path="/Sheet%20Music"
                                element={[
                                    <Header a="scores" />,
                                    <Scores />,
                                    <Footer />,
                                ]}
                            />
                            <Route
                                path="/Contact"
                                element={[
                                    <Header a="contact" />,
                                    <Contact />,
                                    <Footer />,
                                ]}
                            />
                            {this.state.tableDataEn.map((row) => {
                                //all en routes
                                let routePath =
                                    "Sheet%20Music/" +
                                    encodeURIComponent(
                                        row.data.en.name
                                    ).replace("%26", "&");
                                return (
                                    <Route
                                        path={routePath}
                                        element={[
                                            <Header a="scores" />,
                                            <ScoreDisplay
                                                songTitle={row.data.en.name}
                                                animeTitle={row.data.en.anime}
                                            />,
                                            <Footer />,
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
