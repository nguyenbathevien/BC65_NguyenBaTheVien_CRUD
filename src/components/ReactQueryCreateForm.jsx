import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { storeApi } from "../services/apiStore/storeApi";
import { useFormik } from "formik";
import { resetForm } from "../util/utilFunction";

const ReactQueryCreateForm = () => {
  const queryClient = useQueryClient();

  const addProduct = useMutation({
    mutationKey: ["addProductApi"],
    mutationFn: storeApi.addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries("storeListApi");
    },
  });

  const form = useFormik({
    initialValues: {
      name: "",
      description: "",
      image: "",
    },
    onSubmit: (frmValue) => {
      addProduct.mutateAsync(frmValue);
      resetForm("createForm");
    },
  });
  return (
    <div>
      <div
        className="modal fade"
        id="reactQueryCreateForm"
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
              <form id="createForm" onSubmit={form.handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                    aria-describedby="helpId"
                    onInput={form.handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <input
                    type="text"
                    name="description"
                    id="description"
                    className="form-control"
                    aria-describedby="helpId"
                    onInput={form.handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Image</label>
                  <input
                    type="text"
                    name="image"
                    id="image"
                    className="form-control"
                    aria-describedby="helpId"
                    onInput={form.handleChange}
                  />
                </div>
                <button type="submit" className="btn btn-success ">
                  Add
                </button>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReactQueryCreateForm;
