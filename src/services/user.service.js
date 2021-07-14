import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://geekudu-insta.herokuapp.com/";

const getPosts = (data) => {
  var url = API_URL + "posts"
  if (data && data.order) {
    url = url + "?order=" + data.order
  }
  if (data && data.user) {
    url = url + "&user=" + data.user.value
  }
  url = url + '&offset=' + data.offset + '&limit=6'
  return axios.get(url, { headers: authHeader() });
};

const getMyUploads = () => {
  return axios.get(API_URL + "my-uploads", { headers: authHeader() });
};


const createPost = (data) => {
  return axios.post(API_URL + "posts/", data, { headers: authHeader() });
};


const getUsers = () => {
  return axios.get(API_URL + "api/users", { headers: authHeader() });
};

export default {
  getPosts,
  getMyUploads,
  createPost,
  getUsers,
};
