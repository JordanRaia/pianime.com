import React, { useEffect, useState } from "react";
import "./Home.css";
import Title from "./Title";
// import ScoreDisplay from "../Scores/ScoreDisplay";
import "../Background/Background.css";
import { database } from "../firebase";
import { onValue, orderByChild, query, ref as ref_database } from "firebase/database";
import ScoreDisplay from "../Scores/ScoreDisplay";
import { t } from "i18next";

function useSongData() {
    const [songData, setSongData] = useState();

    useEffect(() => {
        const songRef = query(ref_database(database, "scores"), orderByChild("date"));
        onValue(songRef, (snapshot) => {
            if (snapshot.val()) {
                let records = [];

                snapshot.forEach((childSnapshot) => {
                    let keyValue = childSnapshot.key;
                    let data = childSnapshot.val();

                    records.push({ key: keyValue, data: data });
                });
                setSongData(records);
            }
        });
    }, []);

    return songData;
}

function Home() {
    const songs = useSongData();

    if(songs)
    {
        return (
            <>
                <div className="home">
                    <Title title={t("home_title")} subtitle={t("home_subtitle")} />
                    <div className="home__header">{t("recent_arrangement")}</div>
                    <ScoreDisplay songTitle={songs[songs.length-1].key} />
                </div>
            </>
        );
    }
}

export default Home;
