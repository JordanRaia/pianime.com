import React, { Component } from "react";
import "./Search.css";
import TextField from "@mui/material/TextField";
import { onValue, query, ref } from "firebase/database";
import { database } from "../firebase";

export class SearchBar extends Component {
    constructor() {
        super();
        this.state = {
            animeData: [],
            scoreData: [],
            inputText: "",
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
        let inputHandler = (e) => {
            //convert input text to lower case
            var lowerCase = e.target.value.toLowerCase();
            this.setState({ inputText: lowerCase });
        };

        return (
            <div>
                <div className="search__searchBar">
                    <TextField
                        id="outlined-basic"
                        onChange={inputHandler}
                        variant="outlined"
                        fullWidth
                        label="Search"
                    />
                </div>
                <div>
                    
                </div>
            </div>
        );
    }
}

export default function Search() {

    return (
        <div className="search">
            <div className="search__searchBar">
                <SearchBar />
            </div>
        </div>
    );
}
