import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProdActionApi } from "../redux/reducers/storeReducer";

const UpdateFormComponent = () => {
  const dispatch = useDispatch();
  const { id, name, description, image } = useSelector(
    (state) => state.storeReducer.product
  );
  const formUpdate = useFormik({
    initialValues: {
      id: "",
      name: "",
      description: "",
      image: "",
    },
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      const actionThunk = updateProdActionApi(values);
      await dispatch(actionThunk);
      resetForm();
    },
  });
  useEffect(() => {
    if (id) {
      formUpdate.setValues({ id, name, description, image });
    }
  }, [id, name, description, image]);

  return (
    <div>
      <div
        className="modal fade"
        id="updateModal"
        tabIndex={-1}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        role="dialog"
        aria-labelledby="modalTitleId"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalTitleId">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form id="updateForm" onSubmit={formUpdate.handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formUpdate.values.name}
                    id="name"
                    className="form-control"
                    aria-describedby="helpId"
                    onInput={formUpdate.handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <input
                    type="text"
                    name="description"
                    value={formUpdate.values.description}
                    id="description"
                    className="form-control"
                    aria-describedby="helpId"
                    onInput={formUpdate.handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Image</label>
                  <input
                    type="text"
                    name="image"
                    value={formUpdate.values.image}
                    id="imageUpdate"
                    className="form-control"
                    aria-describedby="helpId"
                    onInput={formUpdate.handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-danger "
                  data-bs-dismiss="modal"
                >
                  Update
                </button>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateFormComponent;
