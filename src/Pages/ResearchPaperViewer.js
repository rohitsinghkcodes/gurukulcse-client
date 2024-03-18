import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaDownload } from "react-icons/fa6";
import Layout from "../Components/Layouts/Layout";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const YouTubePlayerPage = () => {
  const params = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [paperData, setPaperData] = useState([]);

  const getAllPaperData = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/papers/get-single-paper/${params.slug}`
      );
      if (data?.success) {
        setPaperData(data.paper);
      }
    } catch (error) {
      toast.error("Something went wrong while fethcing research papers!");
    }
  };

  useEffect(() => {
    getAllPaperData();
    //eslint-disable-next-line
  }, []);
  return (
    <Layout>
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
                src={`${paperData.pdfLink}preview`}
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
                <p className="text-secondary">
                  Last Updated {paperData.updatedAt}
                </p>
                <div className="text-center d-flex justify-content-between">
                  <a
                    href={paperData.pdfLink}
                    target="_blank"
                    className="btn btn-info mt-2 py-3 px-4 d-btn "
                    
                  >
                    <FaDownload
                      size="25px"
                      style={{ justifyContent: "center", alignItems: "center" }}
                    />{" "}
                    &ensp; Download Paper
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

export default YouTubePlayerPage;
