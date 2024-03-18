import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layouts/Layout";
import AdminMenu from "../../Components/Layouts/AdminMenu";
import axios from "axios";
import { Select, Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ReactPlayer from "react-player";
const { Option } = Select;

const CourseVideos = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [videosList, setVideosList] = useState([]);
  const [course, setCourse] = useState("");
  const [loading, setLoading] = useState(true);

  //*GET ALL VIDEOS
  const getAllVideos = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/videos/course-video/${params.slug}`
      );
      if (data?.success) {
        setVideosList(data?.videos);
        setCourse(data?.course.name);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong while getting getAllVideos!");
    }
  };

  useEffect(() => {
    getAllVideos();
    //eslint-disable-next-line
  }, []);

  return (
    <Layout title={"Dashboard - Course Videos"}>
      <div  className=" mt-4 container">
        <Spin spinning={loading} size="large" fullscreen />

        <h1>Course: {course}</h1>
        <div className="d-flex flex-wrap">
          {videosList.map((v) => (
            <div
              className="card m-2 product-card"
              style={{ width: "19rem", overflow: "hidden" }}
            >
              <div className="d-flex justify-content-center rounded-5">
                <ReactPlayer
                  url="https://www.youtube.com/watch?v=7KDRqBpT8NA"
                  controls
                  light={true}
                  width={"19rem"}
                  height={"10rem"}
                />
              </div>

              <div className="card-body">
                <h6
                  className="card-title"
                  style={{
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: "vertical",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  {v.name}
                </h6>
                <p
                  className="card-text"
                  style={{
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {v.description}
                </p>
                <div
                  className="btn btn-warning w-100 rounded-3"
                  onClick={() => navigate(`update-video/${v.slug}`)}
                >
                  Edit
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CourseVideos;
