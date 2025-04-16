import axios from "axios";
import { getToken } from "../utils/auth";

export const api = axios.create({
  baseURL: "https://lion-connect-backend.onrender.com", //실서버
  headers: {
    "content-type": "application/json",
    accept: "application/json,",
  },
  withCredentials: true,
});

// 요청 인터셉터 추가
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// api.interceptors.request.use(function (config) {
//   const token = getToken();
//   if (token) {
//     config.headers["Authorization"] = token;
//   }
//   return config;
// });

export const apis = {
  // 로그인
  postLogin: async (data) => {
    try {
      console.log("로그인 요청 데이터:", data);
      const response = await api.post("/auth/login", data);
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

  // 이력서 저장
  postResume: async (data) => {
    try {
      const response = await api.post("/user/resume", data);
      return response;
    } catch (error) {
      return error.response;
    }
  },

  // 이력서 조회
  getResume: async () => {
    try {
      console.log("이력서 조회 요청 시작");
      const response = await api.get("/user/profile");
      console.log("이력서 조회 응답:", response);
      return response;
    } catch (error) {
      console.error("이력서 조회 에러:", error);
      return error.response;
    }
  },
};
