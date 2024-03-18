import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layouts/Layout";
import AdminMenu from "../../Components/Layouts/AdminMenu";
import axios from "axios";
import { Select, Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
const { Option } = Select;

const UpdateVideoDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [courses, setCourses] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [course, setCourse] = useState("");
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(true);

  //*GET SINGLE video
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/videos/get-single-video/${params.slug}`
      );
      if (data?.success) {
        setName(data?.video.name);
        setId(data?.video._id);
        setDescription(data?.video.description);
        setCourse(data?.video.course._id);
        setLink(data?.video.link);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong while getting single video!");
    }
  };

  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);

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

  //*handle Update Product Button
  const handleUpdateProductBtn = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("link", link);
      productData.append("course", course);

      const { data } = await axios.put(
        `/api/v1/videos/update-video/${id}`,
        productData
      );
      if (data?.success) {
        toast.success(`${data?.msg}`);
        navigate("/dashboard/admin/course-videos");
      } else {
        toast.error(`${data?.msg}`);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something Went Wrong In Updating The Video!");
    }
  };

  //*handle Delete Product Button
  const handleDeleteProductBtn = async (e) => {
    e.preventDefault();
    try {
      const confirm = window.prompt(
        'Type "yes" if you sure, you want to delete this product?'
      );
      if (!confirm) return;
      const { data } = await axios.delete(`/api/v1/videos/delete-video/${id}`);
      if (data?.success) {
        toast.success(`${data?.msg}`);
        navigate("/dashboard/admin/products");
      } else {
        toast.error(`${data?.msg}`);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something Went Wrong In Deleting The Video!");
    }
  };

  return (
    <Layout title={"Dashboard - Update Video Details"}>
      <Spin spinning={loading} size="large" fullscreen />

      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card card-dash p-5 rounded-5">
              <h3>Update Video Details</h3>
              <div className="m-1">
                <Select
                  bordered={false}
                  placeholder="Select a course"
                  size="large"
                  // showSearch
                  className="form-select form-control input-field  mb-3 set-categ"
                  onChange={(value) => {
                    setCourse(value);
                  }}
                  value={course}
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
                    placeholder="Enter the name of product"
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
                    placeholder="Enter the description of product"
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
                    placeholder="Enter the link of product"
                    className=" form-control "
                    onChange={(e) => setLink(e.target.value)}
                  />
                </div>

                <div className="mb-4 ">
                  <button
                    className="btn btn-primary mx-3"
                    onClick={handleUpdateProductBtn}
                  >
                    Update Details
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={handleDeleteProductBtn}
                  >
                    Delete Video
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

export default UpdateVideoDetails;
