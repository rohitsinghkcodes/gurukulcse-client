import React, { useState, useEffect } from "react";
import Layout from "../Components/Layouts/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";
import { Spin } from "antd";
import { Link } from "react-router-dom";

const Notes = () => {
  const [allSubNotes, setAllSubNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllNotes = async () => {
    try {
      const { data } = await axios.get(`/api/v1/notes/get-all-notes`);
      if (data?.success) {
        setAllSubNotes(data.all_sub_notes);
        setLoading(false);
      }
    } catch (error) {
      toast.error("Something went wrong while fethcing research papers!");
    }
  };

  useEffect(() => {
    getAllNotes();
    //eslint-disable-next-line
  }, []);

  return (
    <Layout title={"Notes | gurukulcse"}>
      <div className="container">
        {<Spin spinning={loading} size="large" fullscreen />}
        <h3 className="ms-4 mt-5">All Notes</h3>
        <div className="d-flex flex-wrap">
          {allSubNotes.length > 0
            ? allSubNotes?.map((n) => (
                <Link
                  key={n._id}
                  to={`/notes-viewer/${n.slug}`}
                  className="product-link"
                >
                  <div
                    className="card rp-card mb-3 mx-2 notes-card"
                    style={{ width: "26rem" }}
                  >
                    <div
                      style={{
                        borderRadius: "20px 20px 0 0",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={`/api/v1/notes/sub-image/${n._id}`}
                        alt="sunject-notes-img"
                        style={{
                          minWidth: "26rem",
                          height: "14rem",
                          objectFit: "cover",
                        }}
                      />
                    </div>

                    <div className="card-body ">
                      <h6
                        style={{
                          color: "white",
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: "vertical",
                          fontSize: "18px",
                          fontWeight: "bold",
                        }}
                      >
                        {n.name}
                      </h6>
                      <p
                        style={{
                          color: "#ffffffd3",
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {n.description}
                      </p>
                      <p className="card-text text-secondary">
                        Last updated {moment(n.updatedAt).fromNow()}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            : !loading && (
                <h4 className="text-center text-secondary">
                  No result found for selected filters
                </h4>
              )}
        </div>
      </div>
    </Layout>
  );
};

export default Notes;
