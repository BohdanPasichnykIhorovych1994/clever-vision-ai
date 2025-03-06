import api from "./axios";

class User {
  async getUser(id: any) {
    try {
      const response = await api.get(`/api/users/${id}`);
      return response.data;
    } catch (error) {
      console.log("Error:", error);
    }
  }
}

export default new User();
