import api from "./axios";

class Users {
  findAll(dto: {
    page: number;
    limit: number;
    email: any;
    name: any;
    signup_type: any;
    direction: any;
    field: any;
  }) {
    throw new Error("Method not implemented.");
  }
  async getUsers(query: object) {
    try {
      const response = await api.get("api/users", {
        params: query,
      });
      return response.data;
    } catch (error) {
      console.log("Error:", error);
    }
  }
}

export default new Users();
