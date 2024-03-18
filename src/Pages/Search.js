import Layout from "../Components/Layouts/Layout.js";
import React, { useState, useRef } from "react";
import { useSearch } from "../Context/searchContext";
import ReactPlayer from "react-player";
import { Modal } from "antd";

const Search = () => {
  const [values] = useSearch();
  const [visible, setVisible] = useState(false);
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [playing, setPlaying] = useState(false);
  const playerRef = useRef(null);

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

  const handleCancel = () => {
    setPlaying(false); // Stop the player
    setVisible(false);
    if (playerRef.current) {
      playerRef.current.seekTo(0); // Reset video to start
    }
  };

  return (
    <Layout title={"Search Results | gurukulcse"}>
      <div className="row m-4">
        <div className="col-md-12 ">
          <div style={{ color: "white", margin: "2px" }}>
            {values?.results.length < 1 ? (
              <h4 className="text-start text-secondary mt-5">
                No result found for this search keyword
              </h4>
            ) : (
              <h5>{`Search Results: ${values?.results.length} Videos Found`}</h5>
            )}
          </div>
          <div className="d-flex flex-wrap ">
            {values?.results.map((v) => (
              <div key={v._id} className="product-link">
                <div
                  className="card product-card mt-2 mx-2"
                  style={{ width: "19rem" }}
                >
                  <div
                    onClick={() => {
                      setVisible(true);
                      setLink(v.link);
                      setTitle(v.name);
                      console.log(v.link);
                    }}
                    style={{
                      borderRadius: "20px 20px 0 0",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={`https://img.youtube.com/vi/${extractVideoId(
                        v.link
                      )}/mqdefault.jpg`}
                      alt="video-thumbnail"
                      style={{ width: "19rem" }}
                    />
                  </div>
                  <div className="card-body ">
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Modal
          title={title}
          onCancel={handleCancel}
          footer={null}
          open={visible}
          width="100%"
          centered
        >
          <ReactPlayer
            ref={playerRef}
            playing={playing}
            url={link}
            width="100%"
            height="75vh"
            controls
          />
        </Modal>
      </div>
    </Layout>
  );
};

export default Search;
