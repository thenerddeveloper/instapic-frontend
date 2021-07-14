import axios from "axios";

const API_URL = "https://geekudu-insta.herokuapp.com/api/";

const register = (username, email, password) => {
  return axios.post(API_URL + "register", {
    username,
    email,
    password,
  }).then((response) => {
    console.log("response", response)

  });;
};

const login = (username, password) => {
  return axios
    .post(API_URL + "token/", {
      username,
      password,
    })
    .then((response) => {
      console.log("response", response)
      if (response.data.access) {
        localStorage.setItem("user", JSON.stringify(response.data.username));
        localStorage.setItem("access", JSON.stringify(response.data.access));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("access");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
