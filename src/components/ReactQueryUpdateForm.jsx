import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { storeApi } from "../services/apiStore/storeApi";
import { useFormik } from "formik";
import { resetForm } from "../util/utilFunction";

const ReactQueryUpdateForm = ({ productId }) => {
  const { data, error } = useQuery({
    queryKey: ["getProdById", productId],
    queryFn: () => storeApi.getProductById(productId),
    staleTime: 5 * 60 * 1000,
    cacheTime: 12 * 60 * 1000,
    enabled: !!productId,
  });

  const queryClient = useQueryClient();
  const updateProduct = useMutation({
    mutationKey: ["updateProductApi"],
    mutationFn: storeApi.updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries("storeListApi");
    },
  });

  const form = useFormik({
    initialValues: {
      id: "",
      name: "",
      description: "",
      image: "",
    },
    onSubmit: (frmValue) => {
      updateProduct.mutateAsync(frmValue);
      resetForm("updateForm");
    },
  });

  useEffect(() => {
    if (data) {
      form.setValues({
        id: data.id,
        name: data.name,
        description: data.description,
        image: data.image,
      });
    }
  }, [data]);
  return (
    <div>
      <div
        className="modal fade"
        id="reactQueryUpdateForm"
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
              <form id="updateForm" onSubmit={form.handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                    aria-describedby="helpId"
                    onInput={form.handleChange}
                    value={form.values.name}
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
                    value={form.values.description}
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
                    value={form.values.image}
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
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReactQueryUpdateForm;
