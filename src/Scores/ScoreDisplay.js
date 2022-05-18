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
import DownloadIcon from "@mui/icons-material/Download";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import YouTubeIcon from "@mui/icons-material/YouTube";
import AdobePdfIcon from "../img/AdobePDF.png";
import MidiIcon from "../img/MIDI.png";

var song = undefined;

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
        const songRef = ref_database(database, "scores/" + song);
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
                    const pdfRef = ref_storage(storage, `${row.data.pdf}`);
                    const midiRef = ref_storage(storage, `${row.data.midi}`);

                    getDownloadURL(pdfRef)
                        .then((url) => {
                            const a = document.getElementById("pdfDownload");
                            a.setAttribute("href", url);
                        })
                        .catch((error) => {
                            console.log(error);
                        });

                    getDownloadURL(midiRef)
                        .then((url) => {
                            const a = document.getElementById("midiDownload");
                            a.setAttribute("href", url);
                        })
                        .catch((error) => {
                            console.log(error);
                        });

                    let date = row.data.date.split(",")[0]; //remove time from date
                    let pdfPath = row.data.pdf.split("/").pop(); //remove folder from path
                    let midiPath = row.data.midi.split("/").pop(); //remove folder form path

                    let pdfSize = formatBytes(row.data.pdfSize);
                    let midiSize = formatBytes(row.data.midiSize);

                    let midiExists = false;
                    if (row.data.midi !== "") {
                        midiExists = true;
                    }

                    return (
                        <>
                            <link
                                rel="stylesheet"
                                href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap"
                            />
                            <div className="score__titleSection">
                                <h2 className="score__title">{row.key}</h2>
                                <h3 className="score__subtitle">
                                    {row.data.anime} {row.data.type}
                                </h3>
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
                                            <h4 className="score__infoHeader">
                                                Youtube Video
                                            </h4>
                                        </div>
                                        <iframe
                                            className="score__youtubePlayer"
                                            src={row.data.youtube}
                                            title="YouTube video player"
                                            frameborder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowfullscreen="true"
                                        ></iframe>
                                    </div>
                                    <div className="score__well">
                                        <div className="score__info">
                                            <div>
                                                <div className="score__headerFlexBox">
                                                    <MusicNoteIcon />
                                                    <h4 className="score__infoHeader">
                                                        Sheet Information
                                                    </h4>
                                                </div>
                                                <h4 className="score__infoSubHeader">
                                                    Published on {date}
                                                </h4>
                                            </div>
                                            <div className="score__sheetInfoFlexBox">
                                                <ul className="score__infoList">
                                                    <li className="score__listFlexBox">
                                                        <div className="score__infoKey">
                                                            Pages:
                                                        </div>
                                                        <div className="score__infoValue">
                                                            {row.data.pageNum}
                                                        </div>
                                                    </li>
                                                    <li className="score__listFlexBox">
                                                        <div className="score__infoKey">
                                                            Instrumentation:
                                                        </div>
                                                        <div className="score__infoValue">
                                                            {
                                                                row.data
                                                                    .instrumentation
                                                            }
                                                        </div>
                                                    </li>
                                                    <li className="score__listFlexBox">
                                                        <div className="score__infoKey">
                                                            Category:
                                                        </div>
                                                        <div className="score__infoValue">
                                                            {row.data.category}
                                                        </div>
                                                    </li>
                                                    <li className="score__listFlexBox">
                                                        <div className="score__infoKey">
                                                            {row.data.category}{" "}
                                                            Title:
                                                        </div>
                                                        <div className="score__infoValue">
                                                            {row.data.anime}
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
                                                    <h4 className="score__infoHeader">
                                                        Song Information
                                                    </h4>
                                                </div>
                                            </div>
                                            <div className="score__sheetInfoFlexBox">
                                                <ul className="score__infoList">
                                                    <li className="score__listFlexBox">
                                                        <div className="score__infoKey">
                                                            Composer:
                                                        </div>
                                                        <div className="score__infoValue">
                                                            {row.data.composer}
                                                        </div>
                                                    </li>
                                                    <li className="score__listFlexBox">
                                                        <div className="score__infoKey">
                                                            Source Title:
                                                        </div>
                                                        <div className="score__infoValue">
                                                            {row.data.anime}{" "}
                                                            {row.data.type}
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
                                                    <h4 className="score__infoHeader">
                                                        Download
                                                    </h4>
                                                </div>
                                            </div>
                                            <div className="score__sheetInfoFlexBox">
                                                <ul className="score__infoList">
                                                    <li>
                                                        <a
                                                            className="score__downloadFlexBox"
                                                            id="pdfDownload"
                                                            download
                                                        >
                                                            <img
                                                                className="score__downloadIcon"
                                                                src={
                                                                    AdobePdfIcon
                                                                }
                                                                alt="Adobe PDF Icon"
                                                            />
                                                            <div className="score__download">
                                                                {pdfPath}
                                                            </div>
                                                            <span className="score__downloadSize">
                                                                ({pdfSize})
                                                            </span>
                                                        </a>
                                                    </li>
                                                    {midiExists ? (
                                                        <li>
                                                            <a
                                                                className="score__downloadFlexBox"
                                                                id="midiDownload"
                                                                download
                                                            >
                                                                <img
                                                                    className="score__downloadIcon"
                                                                    src={
                                                                        MidiIcon
                                                                    }
                                                                    alt="Adobe PDF Icon"
                                                                />
                                                                <div className="score__download">
                                                                    {midiPath}
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

function ScoreDisplay({ songTitle }) {
    song = songTitle;

    return (
        <div>
            <RealtimeData />
        </div>
    );
}

export default ScoreDisplay;
