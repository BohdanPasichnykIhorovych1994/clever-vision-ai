import api from "./axios";

class Member {
  async getMember(_id: any) {
    try {
      const response = await api.get(`/api/members/${_id}`);
      return response.data;
    } catch (error) {
      console.log("Error:", error);
    }
  }
}

export default new Member();
