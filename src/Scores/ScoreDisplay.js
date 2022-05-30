import React from "react";
import "./ScoreDisplay.css";
import { onValue, ref as ref_database } from "firebase/database";
import {
    getDownloadURL,
    getStorage,
    ref as ref_storage,
} from "firebase/storage";
import { database } from "../firebase.js";
import RenderPdf from "./RenderPdf";
import { HashLink as Link } from "react-router-hash-link";
import DownloadIcon from "@mui/icons-material/Download";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import YouTubeIcon from "@mui/icons-material/YouTube";
import AdobePdfIcon from "../img/AdobePDF.png";
import MidiIcon from "../img/MIDI.png";
import i18next, { t } from "i18next";

var song = undefined;
var anime = undefined;

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage();

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export class RealtimeData extends React.Component {
    constructor() {
        if (song === undefined) {
            console.log("no song name, oh no");
            return;
        }
        super();
        this.state = {
            songData: [],
        };
    }

    componentDidMount() {
        const songRef = ref_database(database, `source/${anime}/${song}/`);
        onValue(songRef, (snapshot) => {
            let records = [];

            let keyValue = snapshot.key;
            let data = snapshot.val();
            records.push({ key: keyValue, data: data });

            this.setState({ songData: records });
        });
    }

    render() {
        return (
            <div className="score">
                {this.state.songData.map((row) => {
                    // Create a storage reference from our storage service
                    const pdfRef = ref_storage(storage, `${row.data[i18next.language].pdf}`);
                    const midiRef = ref_storage(storage, `${row.data[i18next.language].midi}`);

                    getDownloadURL(pdfRef)
                        .then((url) => {
                            const a = document.getElementById("pdfDownload");
                            a.setAttribute("href", url);
                        })
                        .catch((error) => {
                            console.log(error);
                        });

                    let datestr = row.data.date.split(",")[0]; //remove time from date

                    //split date into month, day and year
                    var split = datestr.split("/");
                    let month = split[0];
                    let day = split[1];
                    let year = split[2];

                    let midiExists = false;

                    var midiSize;
                    if (row.data.midi !== "") {
                        midiExists = true;
                        midiSize = formatBytes(row.data.midiSize);

                        getDownloadURL(midiRef)
                            .then((url) => {
                                const a =
                                    document.getElementById("midiDownload");
                                a.setAttribute("href", url);
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    }

                    let pdfSize = formatBytes(row.data.pdfSize);

                    return (
                        <>
                            <link
                                rel="stylesheet"
                                href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap"
                            />
                            <div className="score__titleSection">
                                <div className="score__route">
                                    <Link to={"/Sheet%20Music"}>
                                        {t("sheet_music")}
                                    </Link>
                                    <p> {">"} </p>
                                    <Link
                                        to={
                                            "/Sheet%20Music/#" +
                                            encodeURIComponent(
                                                row.data.en.anime
                                            ).replace("%26", "&")
                                        }
                                    >
                                        {row.data[i18next.language].anime}
                                    </Link>
                                    <p> {">"} </p>
                                    <Link
                                        to={
                                            "/Sheet%20Music/" +
                                            encodeURIComponent(
                                                row.data.en.name
                                            ).replace("%26", "&")
                                        }
                                    >
                                        {row.data[i18next.language].name}
                                    </Link>
                                </div>
                                <h1 className="score__title">
                                    {row.data[i18next.language].name}
                                </h1>
                                <h2 className="score__subtitle">
                                    {t("score_info", {
                                        anime: row.data[i18next.language].anime,
                                        type: row.data.type,
                                    })}
                                </h2>
                            </div>
                            <div className="score__scoreSection">
                                <div className="score__pdfContainer">
                                    <div className="score__pdf">
                                        <RenderPdf pdfRef={pdfRef} />
                                    </div>
                                </div>
                                <div className="score__infoFlexBox">
                                    <div className="score__well">
                                        <div className="score__headerFlexBox">
                                            <YouTubeIcon />
                                            <h3 className="score__infoHeader">
                                                {t("youtube_video")}
                                            </h3>
                                        </div>
                                        <iframe
                                            className="score__youtubePlayer"
                                            src={row.data.youtube}
                                            title="YouTube video player"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen={true}
                                        ></iframe>
                                    </div>
                                    <div className="score__well">
                                        <div className="score__info">
                                            <div>
                                                <div className="score__headerFlexBox">
                                                    <MusicNoteIcon />
                                                    <h3 className="score__infoHeader">
                                                        {t("sheet_information")}
                                                    </h3>
                                                </div>
                                                <h3 className="score__infoSubHeader">
                                                    {t("published", {
                                                        year: year,
                                                        month: month,
                                                        day: day,
                                                    })}
                                                </h3>
                                            </div>
                                            <div className="score__sheetInfoFlexBox">
                                                <ul className="score__infoList">
                                                    <li className="score__listFlexBox">
                                                        <div className="score__infoKey">
                                                            {t("pages")}
                                                        </div>
                                                        <div className="score__infoValue">
                                                            {row.data.pageNum}
                                                        </div>
                                                    </li>
                                                    <li className="score__listFlexBox">
                                                        <div className="score__infoKey">
                                                            {t(
                                                                "instrumentation"
                                                            )}
                                                        </div>
                                                        <div className="score__infoValue">
                                                            {
                                                                row.data[
                                                                    i18next
                                                                        .language
                                                                ]
                                                                    .instrumentation
                                                            }
                                                        </div>
                                                    </li>
                                                    <li className="score__listFlexBox">
                                                        <div className="score__infoKey">
                                                            {t("category")}
                                                        </div>
                                                        <div className="score__infoValue">
                                                            {
                                                                row.data[
                                                                    i18next
                                                                        .language
                                                                ].category
                                                            }
                                                        </div>
                                                    </li>
                                                    <li className="score__listFlexBox">
                                                        <div className="score__infoKey">
                                                            {
                                                                row.data[
                                                                    i18next
                                                                        .language
                                                                ].category
                                                            }
                                                            {t("title")}
                                                        </div>
                                                        <div className="score__infoValue">
                                                            {
                                                                row.data[
                                                                    i18next
                                                                        .language
                                                                ].anime
                                                            }
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="score__well">
                                        <div className="score__info">
                                            <div>
                                                <div className="score__headerFlexBox">
                                                    <LibraryMusicIcon />
                                                    <h3 className="score__infoHeader">
                                                        {t("song_information")}
                                                    </h3>
                                                </div>
                                            </div>
                                            <div className="score__sheetInfoFlexBox">
                                                <ul className="score__infoList">
                                                    <li className="score__listFlexBox">
                                                        <div className="score__infoKey">
                                                            {t("composer")}
                                                        </div>
                                                        <div className="score__infoValue">
                                                            {
                                                                row.data[
                                                                    i18next
                                                                        .language
                                                                ].composer
                                                            }
                                                        </div>
                                                    </li>
                                                    <li className="score__listFlexBox">
                                                        <div className="score__infoKey">
                                                            {t("source_title")}
                                                        </div>
                                                        <div className="score__infoValue">
                                                            {t("score_info", {
                                                                anime: row.data[
                                                                    i18next
                                                                        .language
                                                                ].anime,
                                                                type: row.data
                                                                    .type,
                                                            })}
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="score__well">
                                        <div className="score__info">
                                            <div>
                                                <div className="score__headerFlexBox">
                                                    <DownloadIcon />
                                                    <h3 className="score__infoHeader">
                                                        {t("download")}
                                                    </h3>
                                                </div>
                                            </div>
                                            <div className="score__sheetInfoFlexBox">
                                                <ul className="score__infoList">
                                                    <li>
                                                        <a
                                                            href="./"
                                                            className="score__downloadFlexBox"
                                                            id="pdfDownload"
                                                            download={t("pdf", {
                                                                anime: row
                                                                    .data[
                                                                    i18next
                                                                        .language
                                                                ].anime,
                                                                name: row
                                                                    .data[
                                                                    i18next
                                                                        .language
                                                                ].name,
                                                            })}
                                                        >
                                                            <img
                                                                className="score__downloadIcon"
                                                                src={
                                                                    AdobePdfIcon
                                                                }
                                                                alt="Adobe PDF Icon"
                                                            />
                                                            <div className="score__download">
                                                                {t("pdf", {
                                                                    anime: row
                                                                        .data[
                                                                        i18next
                                                                            .language
                                                                    ].anime,
                                                                    name: row
                                                                        .data[
                                                                        i18next
                                                                            .language
                                                                    ].name,
                                                                })}
                                                            </div>
                                                            <span className="score__downloadSize">
                                                                ({pdfSize})
                                                            </span>
                                                        </a>
                                                    </li>
                                                    {midiExists ? (
                                                        <li>
                                                            <a
                                                                href="./"
                                                                className="score__downloadFlexBox"
                                                                id="midiDownload"
                                                                download={t("midi", {
                                                                    anime: row
                                                                        .data[
                                                                        i18next
                                                                            .language
                                                                    ].anime,
                                                                    name: row
                                                                        .data[
                                                                        i18next
                                                                            .language
                                                                    ].name,
                                                                })}
                                                            >
                                                                <img
                                                                    className="score__downloadIcon"
                                                                    src={
                                                                        MidiIcon
                                                                    }
                                                                    alt="Adobe PDF Icon"
                                                                />
                                                                <div className="score__download">
                                                                    {t("midi", {
                                                                        anime: row
                                                                            .data[
                                                                            i18next
                                                                                .language
                                                                        ].anime,
                                                                        name: row
                                                                            .data[
                                                                            i18next
                                                                                .language
                                                                        ].name,
                                                                    })}
                                                                </div>
                                                                <span className="score__downloadSize">
                                                                    ({midiSize})
                                                                </span>
                                                            </a>
                                                        </li>
                                                    ) : (
                                                        ""
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    );
                })}
            </div>
        );
    }
}

function ScoreDisplay({ songTitle, animeTitle }) {
    song = songTitle;
    anime = animeTitle;

    return (
        <div>
            <RealtimeData />
        </div>
    );
}

export default ScoreDisplay;
