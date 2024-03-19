import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layouts/Layout";
import AdminMenu from "../../Components/Layouts/AdminMenu";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
import { Popconfirm, Spin } from "antd";

const ManagePapers = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [researchPapers, setResearchPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

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

  //*handle add paper Button
  const handleAddPaperBtn = async (e) => {
    e.preventDefault();
    setUploading(true);
    // Validate if all fields are filled

    if (!name) {
      toast.warning("tite field is empty!");
      return;
    }
    if (!description) {
      toast.warning("description field is empty!");
      return;
    }
    if (!link) {
      toast.warning("link field is empty!");
      return;
    }

    try {
      const paperData = new FormData();
      paperData.append("name", name);
      paperData.append("description", description);
      paperData.append("pdfLink", link);

      const { data } = await axios.post("/api/v1/papers/add-paper", paperData);
      if (data?.success) {
        toast.success(`${data?.msg}`);
        getAllPapers();
        setName("");
        setDescription("");
        setLink("");
        setUploading(false);
      } else {
        toast.error(`${data?.msg}`);
        setUploading(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something Went Wrong In Adding new paper!");
      setUploading(false);
    }
  };

  //! handle Delete Product Button
  const handleDeleteBtn = async (id) => {
    try {
      const { data } = await axios.delete(`/api/v1/papers/delete-paper/${id}`);
      if (data?.success) {
        toast.success(`${data?.msg}`);
        getAllPapers();
      } else {
        toast.error(`${data?.msg}`);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something Went Wrong In Deleting The Paper!");
    }
  };

  return (
    <Layout title={"Dashboard - Manage Papers | gurukulcse"}>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card card-dash p-5 rounded-5">
              <h3>Manage Research Papers</h3>
              <Spin spinning={uploading} size="large" fullscreen />

              <div className="m-1 mt-2 ">
                <div className="mb-4">
                  <label className="form-label ">Title</label>
                  <input
                    type="text"
                    value={name}
                    placeholder="Enter the title of the paper"
                    className=" form-control "
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label text-light">Description</label>
                  <textarea
                    type="text"
                    value={description}
                    placeholder="Enter the description of the paper"
                    className="form-control "
                    style={{ height: "6rem" }}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label text-light">Pdf Link</label>
                  <input
                    type="string"
                    value={link}
                    placeholder="Enter the link of the pdf"
                    className=" form-control "
                    onChange={(e) => setLink(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <button className="btn btn-info " onClick={handleAddPaperBtn}>
                    Add Paper
                  </button>
                </div>
              </div>
            </div>
            <h3 className="ms-4 mt-5">All Research Papers</h3>
            <div className="d-flex justify-content-center">
              <Spin spinning={loading} size="large" />
            </div>
            <div className="d-flex flex-wrap justify-content-evenly mt-2">
              {researchPapers.length > 0
                ? researchPapers?.map((rp) => (
                    <div
                      className="card rp-card mt-2"
                      style={{ width: "32rem" }}
                      key={rp._id}
                    >
                      <div
                        style={{
                          borderRadius: "20px 20px 0 0",
                          overflow: "hidden",
                        }}
                      ></div>
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
                          {rp.name}
                        </h6>
                        <p
                          style={{
                            color: "#ffffffd3",
                            overflow: "hidden",
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {rp.description}
                        </p>
                        <p className="card-text text-secondary">
                          Last updated {moment(rp.updatedAt).fromNow()}
                        </p>
                        <div className="d-flex justify-content-end">
                          <div
                            className="btn btn-sm btn-secondary w-50 rounded-3 "
                            onClick={() => navigate(`update-papers/${rp.slug}`)}
                          >
                            Edit
                          </div>
                          <Popconfirm
                            title="Are you sure, you want to delete this paper?"
                            onConfirm={() => handleDeleteBtn(rp._id)}
                            okText="Yes"
                            cancelText="No"
                          >
                            <div className="btn btn-sm btn-danger w-50 rounded-3 ms-2">
                              Delete
                            </div>
                          </Popconfirm>
                        </div>
                      </div>
                    </div>
                  ))
                : !loading && (
                    <h4 className="text-center text-secondary">
                      No result found for selected filters
                    </h4>
                  )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ManagePapers;
