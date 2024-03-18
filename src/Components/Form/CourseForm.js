import React from "react";

const CourseForm = ({
  edit,
  handleSubmit,
  name,
  setName,
  description,
  setDescription,
  image,
  setImage,
  id,
}) => {
  return (
    <form onSubmit={handleSubmit} className="row ">
      <div className="col-10">
        <input
          type="text"
          className="form-control"
          placeholder="Enter tiltle"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          type="text"
          className="form-control my-2"
          placeholder="Enter description"
          style={{ height: edit ? "200px" : "100px" }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {edit ? (
          // update course
          <div>
            <div className="mb-3">
              <label className="btn btn-outline-secondary col-md-12">
                {image ? image.name : "Upload Image"}
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  hidden
                />
              </label>
            </div>

            {image ? (
              <div className="text-center">
                <img
                  src={URL.createObjectURL(image)}
                  alt="product"
                  height="200px"
                  className="img img-responsiv rounded"
                />
              </div>
            ) : (
              <div className="text-center">
                <img
                  src={`/api/v1/courses/course-image/${id}`}
                  alt="product"
                  height="200px"
                  className="img img-responsiv rounded"
                />
              </div>
            )}
          </div>
        ) : (
          <div className="mb-4">
            {/* for image upload */}
            <div className="mb-4">
              <label className="btn btn-outline-secondary col-md-12">
                {image ? image.name : "Upload Image"}
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                    
                  }}
                  hidden
                />
              </label>
            </div>
            <div className="mb-4">
              {image && (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="product"
                    height="200px"
                    className="img img-responsiv rounded"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="col-2">
        <button type="submit" className="btn btn-primary">
          {edit ? "Update" : "Add Course"}
        </button>
      </div>
    </form>
  );
};

export default CourseForm;
