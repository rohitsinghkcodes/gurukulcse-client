import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layouts/Layout";
import AdminMenu from "../../Components/Layouts/AdminMenu";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
import { Popconfirm, Spin } from "antd";

const ManageNotes = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [allSubNotes, setAllSubNotes] = useState([]);
  const [image, setImage] = useState("");
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

  //*handle add notes Button
  const handleAddNotesBtn = async (e) => {
    e.preventDefault();

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
    if (!image) {
      toast.warning("IMAGE field is empty!");
      return;
    }

    try {
      const notesData = new FormData();
      notesData.append("name", name);
      notesData.append("description", description);
      notesData.append("pdfLink", link);
      notesData.append("image", image);

      const { data } = await axios.post("/api/v1/notes/add-notes", notesData);
      if (data?.success) {
        toast.success(`${data?.msg}`);
        getAllNotes();
        setName("");
        setDescription("");
        setLink("");
        setImage("");
      } else {
        toast.error(`${data?.msg}`);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something Went Wrong In Adding new notes!");
    }
  };

  //! handle Delete Product Button
  const handleDeleteNotesBtn = async (id) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/notes/delete-sub-notes/${id}`
      );
      if (data?.success) {
        toast.success(`${data?.msg}`);
        getAllNotes();
      } else {
        toast.error(`${data?.msg}`);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something while deleting notes!");
    }
  };

  return (
    <Layout title={"Dashboard - Manage Notes"}>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card card-dash p-5 rounded-5">
              <h3>Manage Notes📝</h3>
              <div className="m-1 mt-2 ">
                <div className="mb-4">
                  <label className="form-label ">Title</label>
                  <input
                    type="text"
                    value={name}
                    placeholder="Enter the title"
                    className=" form-control "
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label text-light">Description</label>
                  <textarea
                    type="text"
                    value={description}
                    placeholder="Enter the description"
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
                    placeholder="Enter the link"
                    className=" form-control "
                    onChange={(e) => setLink(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="btn btn-outline-secondary col-md-12">
                    {image ? image.name : "Upload Image"}
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={(e) => setImage(e.target.files[0])}
                      hidden
                    />
                  </label>
                </div>
                <div className="mb-4">
                  {image && (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(image)}
                        alt="notes-subject-image"
                        height="200px"
                        className="img img-responsiv rounded"
                      />
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <button
                    className="btn notes-btn "
                    onClick={handleAddNotesBtn}
                  >
                    Add new notes
                  </button>
                </div>
              </div>
            </div>
            <h3 className="ms-4 mt-5">All Notes</h3>

            <div className="d-flex justify-content-center">
              <Spin spinning={loading} size="large" />
            </div>
            <div className="d-flex flex-wrap">
              {allSubNotes.length > 0 ? (
                allSubNotes?.map((n) => (
                  <div
                    className="card rp-card mt-3 mx-2"
                    style={{ width: "32rem" }}
                    key={n._id}
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
                          width: "32rem",
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
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {n.description}
                      </p>
                      <p className="card-text text-secondary">
                        Last updated {moment(n.updatedAt).fromNow()}
                      </p>

                      <div className="d-flex justify-content-end">
                        <div
                          className="btn btn-sm notes-btn w-50 rounded-3 "
                          onClick={() => navigate(`update-notes/${n.slug}`)}
                        >
                          Edit
                        </div>
                        <Popconfirm
                          title="Are you sure, you want to delete ?"
                          onConfirm={() => handleDeleteNotesBtn(n._id)}
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
              ) : (
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

export default ManageNotes;
