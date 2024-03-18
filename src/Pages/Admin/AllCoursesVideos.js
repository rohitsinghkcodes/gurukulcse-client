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
    <Layout title={"Dashboard - All Users"}>
      <Spin spinning={loading} size="large" fullscreen />

      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="container mt-2">
              <h1>All Courses</h1>
              <div className="row mt-4">
                {courses.map((c) => (
                  <div
                    className="col-md-4 d-flex justify-content-center"
                    key={c._id}
                  >
                    <Link
                      to={`/dashboard/admin/courses/${c.slug}`}
                      className=" card category-tiles p-4 m-2"
                      style={{ minWidth: "40vh" }}
                    >
                      {c.name}
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
