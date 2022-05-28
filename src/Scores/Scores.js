import React, { Component } from "react";
import "./Scores.css";
import { database } from "../firebase.js";
import { onValue, ref, query } from "firebase/database";
import { Link } from "react-router-dom";
import { t } from "i18next";

export class Scores extends Component {
    constructor() {
        super();
        this.state = {
            animeData: [],
            scoreData: [],
        };
    }

    componentDidMount() {
        const dbRef = query(ref(database, "anime"));

        onValue(dbRef, (snapshot) => {
            let records = [];
            let scoreRecords = [];
            snapshot.forEach((childSnapshot) => {
                let keyName = childSnapshot.key;
                let data = childSnapshot.val();
                records.push({ key: keyName, data: data });

                childSnapshot.forEach((cCSnapshot) => {
                    let sKeyName = cCSnapshot.key;
                    let sData = cCSnapshot.val();
                    scoreRecords.push({ key: sKeyName, data: sData });
                });
            });
            this.setState({ animeData: records });
            this.setState({ scoreData: scoreRecords });
        });
    }

    render() {
        return (
            <div className="scores">
                <h1 className="scores__title">{t("sheet_music")}</h1>
                <div className="scores__scoresFlexBox">
                    {this.state.animeData.map((anime) => {
                        return (
                            <div className="scores__animeWell">
                                <div className="scores__animeBlock">
                                    <h2 id={"#" + encodeURIComponent(anime.key).replace('%26', '&')} className="scores__anime">
                                        {anime.key}
                                    </h2>
                                    <div className="scores__songFlexBox">
                                        {this.state.scoreData.map((score) => {
                                            let scoreHref = `/Sheet%20Music/${score.key}`;
                                            if (
                                                score.data.anime === anime.key
                                            ) {
                                                return (
                                                    <Link
                                                        className="scores__songWell"
                                                        to={scoreHref}
                                                    >
                                                        <div className="scores__song">
                                                            <div className="scores__songText">
                                                                {score.key} -{" "}
                                                                {score.data.type}
                                                            </div>
                                                        </div>
                                                    </Link>
                                                );
                                            } else {
                                                return "";
                                            }
                                        })}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default Scores;
