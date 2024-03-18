import Layout from "../Components/Layouts/Layout";
import ReactPlayer from "react-player/lazy";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Spin } from "antd";

const VideoGallery = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [videosList, setVideosList] = useState([]);
  const [course, setCourse] = useState("");
  const [video, setVideo] = useState({});
  const [loading, setLoading] = useState(true);
  //*GET ALL VIDEOS
  const getAllVideos = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/videos/course-video/${params.slug}`
      );
      if (data?.success) {
        setLoading(false);
        setVideosList(data?.videos);
        setCourse(data?.course.name);
        setVideo(data?.videos[0]);
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

  const extractVideoId = (link) => {
    let videoId = "";
    if (link.includes("youtube.com")) {
      videoId = link.split("v=")[1];
    } else if (link.includes("youtu.be")) {
      videoId = link.split("youtu.be/")[1];
    }
    const ampersandPosition = videoId.indexOf("&");
    if (ampersandPosition !== -1) {
      videoId = videoId.substring(0, ampersandPosition);
    }
    return videoId;
  };

  return (
    <Layout title={`${video?.name} | gurukulcse`}>
      <div className="m-4">
        {loading === true && <Spin spinning={loading} size="large" fullscreen />}
        {videosList.length > 0 ? (
          <div className="row">
            <div className="col-md-8">
              <div className="player-container">
                <ReactPlayer
                  url={video?.link}
                  width="100%"
                  height="480px"
                  controls
                />
              </div>
              <div className="card text-light card-bg p-3 rounded-4 mt-3">
                <h2 className="p-2 mt-3">{video?.name}</h2>
                <p className="p-2">{video?.description}</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card card-bg p-2 rounded-4">
                <h2 className="px-2 pt-2 ">{course} Playlist</h2>
                {videosList.map((v, i) => (
                  <div
                    className={`card  p-3 mt-1 rounded- ${
                      v?._id == video?._id ? "vid-bg" : "playlist-vid"
                    }`}
                    onClick={() => setVideo(v)}
                  >
                    <div className="row">
                      {i + 1}.
                      <div className="col-4">
                        <div>
                          <img
                            src={`https://img.youtube.com/vi/${extractVideoId(
                              v.link
                            )}/mqdefault.jpg`}
                            alt=""
                            width={"98%"}
                          />
                        </div>
                      </div>
                      <div className="col ms-1">
                        <h6>{v.name}</h6>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="m-5">
            <h1 className="">{course} Course</h1>
            <p className="text-light pt-2">Sorry! 0 Videos Found.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default VideoGallery;
