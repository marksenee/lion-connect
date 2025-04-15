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
    console.log("인터셉터에서 가져온 토큰:", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("설정된 헤더:", config.headers);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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
      const response = await api.get("/user/profile");
      console.log(response);
      return response;
    } catch (error) {
      return error.response;
    }
  },
};
