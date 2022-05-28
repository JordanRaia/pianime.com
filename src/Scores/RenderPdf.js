import React, { useState } from "react";
import { getDownloadURL } from "firebase/storage";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import styled from "styled-components";
import { useWindowWidth } from "@wojtekmaj/react-hooks";
import "./RenderPdf.css";

function RenderPdf({ pdfRef }) {
    const [pageUrl, setPageUrl] = useState("");
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const width = useWindowWidth();

    
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    // styling wrapper for pdf Document
    const PDFDocumentWrapper = styled.div`
        canvas {
            width: 100% !important;
            height: auto !important;
        }
    `;

    // get the URL of the pdfRef
    getDownloadURL(pdfRef)
        .then((url) => {
            setPageUrl(url);
        })
        .catch((error) => {
            console.log("Error in getDownloadURL:", error);
        });

    return (
        <div className="pdf">
            <div className="pdf__details">
                <div className="pdf__documentWrapper">
                    <PDFDocumentWrapper>
                        <Document
                            loading={""}
                            noData={""}
                            className="pdf__document"
                            file={pageUrl}
                            onLoadSuccess={onDocumentLoadSuccess}
                        >
                            <Page
                                width={Math.min(width * 0.9, 800)} // width: 90vw; max-width: 800px
                                renderTextLayer={false}
                                className="pdf__page"
                                pageNumber={pageNumber}
                            />
                        </Document>
                    </PDFDocumentWrapper>
                </div>
                <p className="pdf__pageNum">
                    Page {pageNumber} of {numPages}
                </p>
            </div>
        </div>
    );
}

export default RenderPdf;
