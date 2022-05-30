import React, { Component } from "react";
import "./Scores.css";
import { database } from "../firebase.js";
import { onValue, ref, query } from "firebase/database";
import { Link } from "react-router-dom";
import i18next, { t } from "i18next";

export class Scores extends Component {
    constructor() {
        super();
        this.state = {
            animeData: [],
            scoreData: [],
        };
    }

    componentDidMount() {
        const dbRef = query(ref(database, "source"));

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

                    if (sKeyName !== "en" && sKeyName !== "jp") {
                        scoreRecords.push({ key: sKeyName, data: sData });
                    }
                });
            });
            this.setState({ animeData: records });
            this.setState({ scoreData: scoreRecords });
        });
    }

    render() {
        if(this.state.animeData.length > 0)
        {
            //change sort depending on language
            this.state.animeData.sort(function (a, b) {
                return a.data[i18next.language].localeCompare(b.data[i18next.language], "ja");
            });
        }

        return (
            <div className="scores">
                <h1 className="scores__title">{t("sheet_music")}</h1>
                <div className="scores__scoresFlexBox">
                    {this.state.animeData.map((anime) => {
                        return (
                            <div key={anime.key} className="scores__animeWell">
                                <div className="scores__animeBlock">
                                    <h2
                                        id={
                                            "#" +
                                            encodeURIComponent(
                                                anime.key
                                            ).replace("%26", "&")
                                        }
                                        className="scores__anime"
                                    >
                                        {anime.data[i18next.language]}
                                    </h2>
                                    <div className="scores__songFlexBox">
                                        {this.state.scoreData.map((score) => {
                                            let scoreHref = `/Sheet%20Music/${score.data.en.name}`;
                                            if (
                                                score.data[i18next.language].anime === anime.data[i18next.language]
                                            ) {
                                                return (
                                                    <Link
                                                        key={score.key}
                                                        className="scores__songWell"
                                                        to={scoreHref}
                                                    >
                                                        <div className="scores__song">
                                                            <div className="scores__songText">
                                                                {t("name_type", {name: score.data[i18next.language].name, type: score.data.type, interpolation: {escapeValue: false}})}
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
