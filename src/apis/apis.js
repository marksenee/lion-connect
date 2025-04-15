import axios from "axios";

export const api = axios.create({
  baseURL: "https://lion-connect-backend.onrender.com", //실서버
  headers: {
    "content-type": "application/json",
    accept: "application/json,",
  },
  withCredentials: true,
});

export const apis = {
  // 로그인
  postLogin: async (data) => {
    try {
      const response = await api.post("/auth/login", data);
      console.log(response);
      return response;
    } catch (error) {
      return error.response;
    }
  },

  // 회원가입
  postSignUp: async (data) => {
    try {
      const response = await api.post("/auth/signup", {
        ...data,
        user_type: data.userType, // userType을 user_type으로 변환
        name: data.userType === "company" ? data.companyName : data.name, // 기업의 경우 companyName을 name으로 사용
      });
      return response;
    } catch (error) {
      return error.response;
    }
  },

  // 이력서 - 프로젝트 추가
  postProject: async (data) => {
    try {
      const response = await api.post("/user/project", data);
      return response;
    } catch (error) {
      return error.response;
    }
  },
};
