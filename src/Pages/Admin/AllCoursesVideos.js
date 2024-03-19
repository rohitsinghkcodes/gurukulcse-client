import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layouts/Layout.js";
import AdminMenu from "../../Components/Layouts/AdminMenu.js";
import { Link } from "react-router-dom";
import useCourse from "../../hooks/useCourse.js";
import { Spin } from "antd";

const CourseVideos = () => {
  const courses = useCourse();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (courses.length) {
      setLoading(false);
    }
  }, [courses]);
  return (
    <Layout title={"Dashboard - All Users | gurukulcse"}>
      <Spin spinning={loading} size="large" fullscreen />

      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="container mt-2">
              <h1>All Courses</h1>
              <div className="row d-flex flex-wrap justify-content-evenly">
                {courses.map((c) => (
                  <div
                    className="col-md-4  my-2"
                    key={c._id}
                  >
                    <Link
                      to={`/dashboard/admin/courses/${c.slug}`}
                      className="product-link"
                    >
                      <div
                        className="card product-card mt-2"
                        style={{ width: "20rem" }}
                      >
                        <div
                          style={{
                            borderRadius: "20px 20px 0 0",
                            overflow: "hidden",
                          }}
                        >
                          <img
                            src={`/api/v1/courses/course-image/${c._id}`}
                            alt="course-img"
                            style={{ width: "20rem" }}
                          />
                        </div>
                        <div className="card-body ">
                          <h6
                            className="card-title mt-2"
                            style={{
                              overflow: "hidden",
                              display: "-webkit-box",
                              WebkitLineClamp: 1,
                              WebkitBoxOrient: "vertical",
                              fontSize: "18px",
                              fontWeight: "bold",
                            }}
                          >
                            {c.name}
                          </h6>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CourseVideos;
