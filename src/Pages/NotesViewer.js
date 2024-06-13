import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaDownload } from "react-icons/fa6";
import Layout from "../Components/Layouts/Layout";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const NotesViewer = () => {
  const params = useParams();
  const [paperData, setPaperData] = useState([]);

  const getNotesData = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/notes/get-single-sub-notes/${params.slug}`
      );
      if (data?.success) {
        setPaperData(data.notes);
      }
    } catch (error) {
      toast.error("Something went wrong while fethcing research papers!");
    }
  };

  useEffect(() => {
    getNotesData();
    window.scrollTo(0, 0);
    //eslint-disable-next-line
  }, []);

  const replaceView = (link) => {
    if (typeof link === "string") {
      const previewUrl = link.replace("/view", "/preview");
      return previewUrl;
    }
    return null;
  };
  return (
    <Layout title={"Research Papers | gurukulcse"}>
      <div className="m-5">
        <div className="card rounded-5 bg-transparent text-light border-0">
          <div className="row ">
            <h5
              className="ms-2"
              style={{
                fontSize: "35px",
                color: "#8a2be2",
              }}
            >
              {paperData.name}
            </h5>
            <div className="col-md-5 ">
              <iframe
                title={paperData._id}
                src={`${replaceView(paperData.pdfLink)}`}
                style={{ width: "100%", minHeight: "500px" }} // Adjust minHeight as per your requirements
                allow="autoplay"
              ></iframe>
            </div>
            <div className="col-md-7">
              <div className="card-body">
                <p
                  style={{
                    fontSize: "20px",
                  }}
                >
                  {paperData.description}
                </p>
                <div className="text-center d-flex">
                  <a
                    rel="noopener noreferrer"
                    href={paperData.pdfLink}
                    target="_blank"
                    className="btn btn-info mt-2 py-3 px-4 d-btn "
                  >
                    <FaDownload
                      size="25px"
                      style={{ justifyContent: "center", alignItems: "center" }}
                    />{" "}
                    &ensp; Download Pdf
                  </a>
                  <a
                    rel="noopener noreferrer"
                    href={paperData.pdfLink}
                    target="_blank"
                    className="btn btn-info mt-2 py-3 px-4 d-btn ms-4"
                  >
                    <FaDownload
                      size="25px"
                      style={{ justifyContent: "center", alignItems: "center" }}
                    />{" "}
                    &ensp; Download Chapterwise
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotesViewer;
