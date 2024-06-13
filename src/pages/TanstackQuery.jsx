import React, { useState } from "react";
import ReactQueryCreateForm from "../components/ReactQueryCreateForm";
import ReactQueryUpdateForm from "../components/ReactQueryUpdateForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { storeApi } from "../services/apiStore/storeApi";

const TanstackQuery = () => {
  const [selectedProductId, setSelectedProductId] = useState(null);
  const handleEditClick = (id) => {
    setSelectedProductId(id);
  };
  const { isLoading, isPending, data, error } = useQuery({
    queryKey: ["storeListApi"],
    queryFn: storeApi.getAll,
    staleTime: 30 * 1000,
    refetchOnWindowFocus: true,
  });

  const queryClient = useQueryClient();

  const deleteProduct = useMutation({
    mutationKey: ["delProductApi"],
    mutationFn: storeApi.delProduct,
    onSuccess: () => {
      queryClient.invalidateQueries("storeListApi");
    },
  });

  return (
    <div className="container">
      <h3>Product list</h3>
      <div>
        <button
          type="button"
          className="btn btn-dark btn-lg"
          data-bs-toggle="modal"
          data-bs-target="#reactQueryCreateForm"
        >
          Thêm mới sản phẩm
        </button>
        <ReactQueryCreateForm />
      </div>

      <div className="row mt-4">
        {isPending
          ? "Loading....."
          : data?.map((prod, index) => {
              return (
                <div className="col-3 mt-2" key={index}>
                  <div className="card">
                    <img src={prod.image} alt={prod.alias} />
                    <div className="card-body">
                      <h3>{prod.name}</h3>
                      <p>{prod.description}</p>
                      <button
                        className="btn btn-dark"
                        data-bs-toggle="modal"
                        data-bs-target="#reactQueryUpdateForm"
                        onClick={() => {
                          handleEditClick(prod.id);
                        }}
                      >
                        Edit
                      </button>
                      <ReactQueryUpdateForm productId={selectedProductId} />
                      <button
                        className="btn btn-danger ms-2"
                        onClick={() => {
                          deleteProduct.mutateAsync(prod.id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default TanstackQuery;
