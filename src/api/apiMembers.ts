import api from "./axios";

class Members {
  async updateMember(id: string, updateData: object) {
    try {
      const response = await api.put(`api/members/${id}`, updateData);
      return response.data;
    } catch (error) {
      console.error("Error updating member:", error);
      throw error;
    }
  }
  findAll(dto: {
    page: number;
    limit: number;
    userName: string;
    direction: any;
    field: any;
  }) {
    throw new Error("Method not implemented.");
  }
  async getMembers(query: object) {
    try {
      const response = await api.get("api/members", {
        params: query,
      });
      return response.data;
    } catch (error) {
      console.log("Error:", error);
    }
  }
}

export default new Members();
