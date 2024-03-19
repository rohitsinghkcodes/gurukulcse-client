import React, { useEffect, useState } from "react";
import Layout from "../Components/Layouts/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import { Spin } from "antd";

const ResearchPapers = () => {
  const [researchPapers, setResearchPapers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllPapers = async () => {
    try {
      const { data } = await axios.get(`/api/v1/papers/get-all-papers`);
      if (data?.success) {
        setResearchPapers(data.papers);
        setLoading(false);
      }
    } catch (error) {
      toast.error("Something went wrong while fethcing research papers!");
    }
  };

  useEffect(() => {
    getAllPapers();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <Layout title={"Research Papers | gurukulcse"}>
        <div className="container mt-5 text-poppins mb-5 ">
          <h1 className="mb-2 ms-4 ">Research Papers</h1>
          {<Spin spinning={loading} size="large" fullscreen />}
          <div className="d-flex justify-content-center row mx-4 ">
            {researchPapers.length > 0
              ? researchPapers.map((rp) => (
                  <Link
                    key={rp._id}
                    to={`/research-paper-viewer/${rp.slug}`}
                    className="product-link"
                  >
                    <div
                      className="card mb-3 rp-card rounded-4 px-4"
                      style={{ minWidth: "100vh" }}
                    >
                      <div className="row g-0">
                        <div className="col-md-2 py-4">
                          {/* TODO: ADD PDF VIEWER HERE INSTED OF IMG */}
                          <img
                            src="https://media.licdn.com/dms/image/D4D12AQHl1HFTvItqpw/article-cover_image-shrink_720_1280/0/1690440690219?e=2147483647&v=beta&t=fN3x7AxsHbO9VNmQS3rXS3QVymAzr5vDoTjmUMHea1w"
                            className="img-fluid rounded-4"
                            alt="..."
                          />
                        </div>
                        <div className="col-md-10 ">
                          <div className="card-body">
                            <h5 className="card-title">{rp.name}</h5>
                            <p
                              className="card-text"
                              style={{
                                color: "#ffffffb5",
                                overflow: "hidden",
                                display: "-webkit-box",
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: "vertical",
                              }}
                            >
                              {rp.description}
                            </p>
                            <p className="text-secondary">
                              Last updated {moment(rp.updatedAt).fromNow()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              : !loading && (
                  <h4 className="text-center text-secondary">
                    No papers found!
                  </h4>
                )}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ResearchPapers;
