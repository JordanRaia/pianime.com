import React, { useEffect, useState } from "react";
import "./Home.css";
import Title from "./Title";
import "../Background/Background.css";
import { database } from "../firebase";
import { onValue, query, ref as ref_database } from "firebase/database";
import ScoreDisplay from "../Scores/ScoreDisplay";
import i18next, { t } from "i18next";

function useSongData() {
    const [songData, setSongData] = useState();

    useEffect(() => {
        const songRef = query(ref_database(database, "source"));
        onValue(songRef, (snapshot) => {
            if (snapshot.val()) {
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
                setSongData(records);
            }
        });
    }, []);

    return songData;
}

function Home() {
    let songs = useSongData();

    var swap = function (x) {
        return x;
    };

    if (songs) {
        songs.sort(function (a, b) {
            //remove time and split into 3 element array
            a = a.data.date.split(",")[0].split("/");
            b = b.data.date.split(",")[0].split("/");

            // swap day and month
            [a[0], a[1]] = [a[1], a[0]];
            [b[0], b[1]] = [b[1], b[0]];

            //reverse and join to get a string in YYYYMMDD format
            a = a.reverse().join("");
            b = b.reverse().join("");

            //return
            return a.localeCompare(b);
        });

        return (
            <>
                <link
                    href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@500&display=swap"
                    rel="stylesheet"
                />
                <div className="home">
                    <Title
                        title={t("home_title")}
                        subtitle={t("home_subtitle")}
                    />
                    <div className={`home__header${i18next.language}`}>
                        {t("recent_arrangement")}
                    </div>
                    <ScoreDisplay
                        songTitle={songs[songs.length - 1].key}
                        animeTitle={songs[songs.length - 1].data.en.anime}
                    />
                </div>
            </>
        );
    }
}

export default Home;
