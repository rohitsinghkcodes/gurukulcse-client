import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layouts/Layout";
import AdminMenu from "../../Components/Layouts/AdminMenu";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const { Option } = Select;

const AddVideosToCourse = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [course, setCourse] = useState("");


  //* GET ALL Courses
  const getAllCourses = async () => {
    try {
      const { data } = await axios.get("/api/v1/courses/get-courses");
      if (data?.success) {
        setCourses(data?.courses);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong in getting courses!");
    }
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  //*handle add video Button
  const handleAddVideoBtn = async (e) => {
    e.preventDefault();

    // Validate if all fields are filled
    if (!course) {
      toast.warning("course field is empty!");
      return;
    }
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
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("link", link);
      productData.append("course", course);

      const { data } = await axios.post(
        "/api/v1/videos/create-video",
        productData
      );
      if (data?.success) {
        toast.success(`${data?.msg}`);
        navigate("/dashboard/admin/products");
      } else {
        toast.error(`${data?.msg}`);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something Went Wrong In Adding new video!");
    }
  };

  return (
    <Layout title={"Dashboard - Products"}>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card card-dash p-5 rounded-5">
              <h3>Add Videos To Course</h3>
              <div className="m-1 ">
                <Select
                  bordered={false}
                  placeholder="Select a course"
                  size="large"
                  // showSearch
                  className="form-select form-control input-field  mb-3 set-categ"
                  onChange={(value) => {
                    setCourse(value);
                  }}
                >
                  {courses?.map((c) => (
                    <Option key={c._id} value={c._id}>
                      {c.name}
                    </Option>
                  ))}
                </Select>

                <div className="mb-4">
                  <label className="form-label ">Video Title</label>
                  <input
                    type="text"
                    value={name}
                    placeholder="Enter the title of the video"
                    className=" form-control "
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label text-light">
                    Video Description
                  </label>
                  <textarea
                    type="text"
                    value={description}
                    placeholder="Enter the description of the video"
                    className="form-control "
                    style={{ height: "6rem" }}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label text-light">Video Link</label>
                  <input
                    type="string"
                    value={link}
                    placeholder="Enter the link of the video"
                    className=" form-control "
                    onChange={(e) => setLink(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <button
                    className="btn btn-danger "
                    onClick={handleAddVideoBtn}
                  >
                    Add Video
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

export default AddVideosToCourse;
