import React, { Component } from "react";
import "./Scores.css";
import { database } from "../firebase.js";
import { onValue, ref, query } from "firebase/database";

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
                <div className="scores__title">Sheet Music</div>
                <div className="scores__scoresFlexBox">
                    {this.state.animeData.map((anime) => {
                        return (
                            <div className="scores__animeWell">
                                <div className="scores__animeBlock">
                                    <div className="scores__anime">
                                        {anime.key}
                                    </div>
                                    <div className="scores__songFlexBox">
                                        {this.state.scoreData.map((score) => {
                                            let scoreHref = `./Scores/${score.key}`;
                                            if (
                                                score.data.anime === anime.key
                                            ) {
                                                return (
                                                    <a
                                                        className="scores__songWell"
                                                        href={scoreHref}
                                                    >
                                                        <div className="scores__song">
                                                            <div className="scores__songText">
                                                                {score.key} -{" "}
                                                                {score.data.type}
                                                            </div>
                                                        </div>
                                                    </a>
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
