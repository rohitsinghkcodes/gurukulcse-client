import React from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { IoHome } from "react-icons/io5";
import { SMLinks } from "../../Helpers/socialMediaLinks.js";

const Footer = () => {
  return (
    <footer className="text-center footer">
      <section className>
        <div className="container text-center text-md-start pt-3">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <i className=" f-head" />
                gurukulcse.com
              </h6>
            </div>
            <div className="col-md-1 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 class="text-uppercase fw-bold mb-4">Useful links</h6>
              <p>
                <Link className="f-link" to="/about">
                  About
                </Link>
              </p>
              <p>
                <Link className="f-link" to="/policy">
                  Privacy Policy
                </Link>
              </p>
            </div>
            <div className="col-md-6 col-xl-6 mx-auto mb-md-0 mb-4 ">
              <h6 class="text-uppercase fw-bold mb-4">CONTACT US</h6>
              <div className="row">
                <div className="col">
                  {" "}
                  <p className="f-link">
                    <IoHome /> &ensp;Greater Noida, 203209, India
                  </p>
                  <p className="f-link">
                    <IoMdMail />
                    &ensp;gurukulcse@gmail.com
                  </p>
                  <Link to={SMLinks.github} target="_blank" className="f-link">
                    <p>
                      <FaGithub /> &ensp;Github
                    </p>
                  </Link>
                </div>
                <div className="col">
                  <Link
                    to={SMLinks.instagram}
                    target="_blank"
                    className="f-link"
                  >
                    <p>
                      <FaInstagram /> &ensp;Instagram
                    </p>
                  </Link>
                  <Link
                    to={SMLinks.facebook}
                    target="_blank"
                    className="f-link"
                  >
                    <p>
                      <FaFacebookF /> &ensp;Facebook
                    </p>
                  </Link>
                  <Link
                    to={SMLinks.linkedin}
                    target="_blank"
                    className="f-link"
                  >
                    <p>
                      <FaLinkedinIn /> &ensp;Linkedin
                    </p>
                  </Link>
                  <Link to={SMLinks.twitter} target="_blank" className="f-link">
                    <p>
                      <FaXTwitter /> &ensp;Twitter / X
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        {"</> "}gurukulcse.com&ensp; | &ensp;All rights reserved &copy;
        gurukulcse.com
      </div>
    </footer>
  );
};

export default Footer;
