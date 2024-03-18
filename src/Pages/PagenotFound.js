import React from "react";
import Layout from "../Components/Layouts/Layout.js";
import { Link } from "react-router-dom";

const PagenotFound = () => {
  return (
    <Layout title="Page Not Found | gurukulcse">
      <div
        className="pnf container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className="text-center mt-4">
          <img
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXFsbTRvZHluNTZhajl2dHNxOTAyMGE4a2E1OGhlOXFpbHQ1dzlncyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/y7YgaB4RcyIw/giphy.gif"
            alt=""
            style={{ width: "70%" }}
          />
        </div>

        <div style={{ textAlign: "center" }}>
          <h1 className="pnf-title">404</h1>
          <h2 className="pnf-heading">Oops! Page Not Found</h2>
          <Link to="/" className="pnf-btn">
            Go Back
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default PagenotFound;
