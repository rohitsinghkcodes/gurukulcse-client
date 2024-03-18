import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layouts/Layout";
import AdminMenu from "../../Components/Layouts/AdminMenu";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Spin } from "antd";

const UpdateNotes = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState("");
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(true);

  const getSingleNotes = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/notes/get-single-sub-notes/${params.slug}`
      );
      if (data?.success) {
        setName(data.notes.name);
        setDescription(data.notes.description);
        setLink(data.notes.pdfLink);
        setId(data.notes._id);
        setLoading(false);
      }
    } catch (error) {
      toast.error("Something went wrong while fetching notes!");
    }
  };

  useEffect(() => {
    getSingleNotes();
    //eslint-disable-next-line
  }, []);

  //? handle update notes details Button
  const handleUpdateNotesBtn = async (e) => {
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

      const { data } = await axios.put(
        `/api/v1/notes/update-notes/${id}`,
        notesData
      );
      if (data?.success) {
        toast.success(`${data?.msg}`);
        navigate("/dashboard/admin/manage-notes");
      } else {
        toast.error(`${data?.msg}`);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong while updating notes!");
    }
  };

  return (
    <Layout title={"Dashboard - Update Notes"}>
      <Spin spinning={loading} size="large" fullscreen />
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card card-dash p-5 rounded-5">
              <h3>Update Notes Details📝</h3>
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
                  {image ? (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(image)}
                        alt="notes-subject-image"
                        height="200px"
                        className="img img-responsiv rounded"
                      />
                    </div>
                  ) : (
                    <div className="text-center">
                      <img
                        src={`/api/v1/notes/sub-image/${id}`}
                        alt="image"
                        height="200px"
                        className="img img-responsiv rounded"
                      />
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <button
                    className="btn notes-btn "
                    onClick={handleUpdateNotesBtn}
                  >
                    Update notes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateNotes;
