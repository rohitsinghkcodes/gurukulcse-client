import React, { useEffect, useState } from "react";
import Layout from "../Components/Layouts/Layout.js";
import useCourse from "../hooks/useCourse.js";
import { Link } from "react-router-dom";
import { Spin } from "antd";

const HomePage = () => {
  const courses = useCourse();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (courses.length) {
      setLoading(false);
    }
  }, [courses]);
  return (
    <Layout>
      <>
        <div>
          <div className="container pt-4">
            {/* Crousel start */}
            <div
              id="carouselExampleAutoplaying"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div
                className="carousel-inner rounded-5"
                style={{ height: "70vh" }}
              >
                <div className="carousel-item active">
                  <img
                    src="https://raw.githubusercontent.com/rohitsinghkcodes/RESOURCES/master/gurukulcse/1.jpg"
                    className="d-block w-100"
                    alt="image1"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="https://raw.githubusercontent.com/rohitsinghkcodes/RESOURCES/master/gurukulcse/2.jpg"
                    className="d-block w-100"
                    alt="image2"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="https://raw.githubusercontent.com/rohitsinghkcodes/RESOURCES/master/gurukulcse/3.jpg"
                    className="d-block w-100"
                    alt="image3"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="https://raw.githubusercontent.com/rohitsinghkcodes/RESOURCES/master/gurukulcse/4.jpg"
                    className="d-block w-100"
                    alt="image4"
                  />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleAutoplaying"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleAutoplaying"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Next</span>
              </button>
            </div>
            {/* Crousel end*/}

            <div className="d-flex justify-content-between align-items-center">
              <h1 className="ms-3 mt-5">Courses</h1>
              <Link to={`/all-courses`} className="me-5 mt-5 pt-4  show-all">
                Show All
              </Link>
            </div>
            <div className="d-flex flex-wrap justify-content-evenly mt-2">
              {loading && (
                <div className="d-flex justify-content-center my-4">
                  <Spin spinning={loading} size="large" />
                </div>
              )}

              {courses.length > 0
                ? courses?.slice(0, 4).map((product) => (
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
        </div>
      </>
    </Layout>
  );
};

export default HomePage;
