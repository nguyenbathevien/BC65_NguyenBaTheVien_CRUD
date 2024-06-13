import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import storeReducer, {
  deleteProductActionApi,
  getProductIdActionApi,
  getProductListActionApi,
} from "../redux/reducers/storeReducer";
import CreateFormComponent from "../components/CreateFormComponent";
import UpdateFormComponent from "../components/UpdateFormComponent";

const ReduxToolkit = () => {
  const { productList } = useSelector((state) => state.storeReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const actionThunk = getProductListActionApi();
    dispatch(actionThunk);
  }, []);
  return (
    <div className="container">
      <h3>Product list</h3>
      <div>
        <button
          type="button"
          className="btn btn-dark btn-lg"
          data-bs-toggle="modal"
          data-bs-target="#createModal"
        >
          Thêm mới sản phẩm
        </button>
        <CreateFormComponent />
      </div>

      <div className="row mt-4">
        {productList.map((prod, index) => {
          return (
            <div className="col-3 mt-2" key={index}>
              <div className="card">
                <img src={prod.image} alt={prod.alias} />
                <div className="card-body">
                  <h3>{prod.name}</h3>
                  <p>{prod.description}</p>
                  <button
                    className="btn btn-dark"
                    onClick={() => {
                      const getProdById = getProductIdActionApi(prod.id);
                      dispatch(getProdById);
                    }}
                    data-bs-toggle="modal"
                    data-bs-target="#updateModal"
                  >
                    Edit
                  </button>
                  <UpdateFormComponent />
                  <button
                    className="btn btn-danger ms-2"
                    onClick={() => {
                      const deletedAction = deleteProductActionApi(prod.id);
                      dispatch(deletedAction);
                      console.log(prod.id);
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

export default ReduxToolkit;
