export const setToken = (token) => {
  //   console.log("저장되는 토큰:", token);
  localStorage.setItem("accessToken", token);
};

export const getToken = () => {
  const token = localStorage.getItem("accessToken");
  //   console.log("로컬 스토리지에서 가져온 토큰:", token);
  return token;
};

export const removeToken = () => {
  localStorage.removeItem("accessToken");
};
