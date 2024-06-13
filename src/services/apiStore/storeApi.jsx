import axios from "axios";

export class StoreApi {
  async getAll() {
    const res = await axios.get(
      "https://apistore.cybersoft.edu.vn/api/Store/getAll"
    );
    return res.data.content;
  }

  async addProduct(product) {
    const res = await axios.post(
      "https://apistore.cybersoft.edu.vn/api/Store",
      product
    );
    return res.data.content;
  }

  async delProduct(id) {
    const arrID = [id];
    const res = await axios.delete(
      "https://apistore.cybersoft.edu.vn/api/Store",
      { data: arrID }
    );
    return res.data.content;
  }

  async getProductById(id) {
    const res = await axios.get(
      `https://apistore.cybersoft.edu.vn/api/Store/getbyid?id=${id}`
    );
    return res.data.content;
  }

  async updateProduct(product) {
    const res = await axios.put(
      `https://apistore.cybersoft.edu.vn/api/Store?id=${product.id}`,
      product
    );
    return res.data.content;
  }
}

export const storeApi = new StoreApi();
