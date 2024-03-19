import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../Components/Layouts/Layout.js";
import useCourse from "../hooks/useCourse.js";
import { Spin } from "antd";

const Courses = () => {
  const courses = useCourse();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (courses.length) {
      setLoading(false);
    }
  }, [courses]);
  return (
    <Layout title="All Courses | gurukulcse">
      <div className="container mt-5">
        <h1>All Courses</h1>
        <Spin spinning={loading} size="large" fullscreen />

        <div className="d-flex flex-wrap justify-content-evenly mt-2">
          {courses.length > 0
            ? courses?.map((product) => (
                <Link
                  key={product._id}
                  to={`/course/videos/${product.slug}`}
                  className="product-link"
                >
                  <div
                    className="card product-card mt-2"
                    style={{ width: "19rem" }}
                  >
                    <div
                      style={{
                        borderRadius: "20px 20px 0 0",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={`/api/v1/courses/course-image/${product._id}`}
                        alt="course-img"
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
                        {product.name}
                      </h6>
                      <p
                        className="card-text"
                        style={{
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {product.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            : !loading && (
                <h4 className="text-center text-secondary">
                  No courses found!
                </h4>
              )}
        </div>
      </div>
    </Layout>
  );
};

export default Courses;
