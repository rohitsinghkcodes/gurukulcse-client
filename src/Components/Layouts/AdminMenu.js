import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="text-center m-4">
        <div className="list-group">
          <h4>Admin Panel</h4>
          <NavLink
            to="/dashboard/admin/profile"
            className="list-group-item list-group-item-action"
          >
            Admin Profile
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-course"
            className="list-group-item list-group-item-action"
          >
            Manage Courses
          </NavLink>
          <NavLink
            to="/dashboard/admin/manage-papers"
            className="list-group-item list-group-item-action"
          >
            Manage Papers
          </NavLink>
          <NavLink
            to="/dashboard/admin/manage-notes"
            className="list-group-item list-group-item-action"
          >
            Manage Notes
          </NavLink>
          <NavLink
            to="/dashboard/admin/add-videos"
            className="list-group-item list-group-item-action"
          >
            Add Videos to Course
          </NavLink>
          <NavLink
            to="/dashboard/admin/course-videos"
            className="list-group-item list-group-item-action"
          >
            Courses and Videos
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
