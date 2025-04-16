import axios from "axios";
import { getToken } from "../utils/auth";

export const userApi = axios.create({
  baseURL: "https://lion-connect-backend.onrender.com", //실서버
  headers: {
    "content-type": "application/json",
    accept: "application/json,",
  },
  withCredentials: true,
});

export const userApis = {
  // 로그인
  postLogin: async (data) => {
    try {
      console.log("로그인 요청 데이터:", data);
      const response = await userApi.post("/auth/login", data);
      console.log("로그인 응답:", response);
      return response;
    } catch (error) {
      console.error("로그인 에러 상세:", error.response);
      return error.response;
    }
  },

  // 회원가입
  postSignUp: async (data) => {
    try {
      const response = await userApi.post("/auth/signup", {
        ...data,
        user_type: data.userType, // userType을 user_type으로 변환
        name: data.userType === "company" ? data.companyName : data.name, // 기업의 경우 companyName을 name으로 사용
      });
      return response;
    } catch (error) {
      console.error("회원가입 에러 상세:", error.response);
      return error.response;
    }
  },
};
