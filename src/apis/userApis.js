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
      const response = await userApi.post("/auth/login", data);
      return response;
    } catch (error) {
      console.error("로그인 에러 상세:", error.response);
      return error.response;
    }
  },

  // 회원가입
  postSignUp: async (data) => {
    console.log("2.전송되는데이터", data);
    try {
      const response = await userApi.post("/auth/signup", {
        ...data,
        user_type: data.userType, // 🚨 문제 발생 지점 2: 입력받은 data 객체에서 'userType'(camelCase)을 찾아서 'user_type'(snake_case)으로 변환
        name: data.userType === "company" ? data.companyName : data.name, // userType 값에 따라 name 필드를 다르게 처리
      });
      return response;
    } catch (error) {
      console.error("회원가입 에러 상세:", error.response);
      return error.response;
    }
  },
};
