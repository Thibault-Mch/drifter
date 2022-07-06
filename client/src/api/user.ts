import axios from "axios";
import { API_URL_LOCAL } from "@env"

const getUsers = async () => {
  try {
    const res = await axios.get(
      `${API_URL_LOCAL}/users`
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.log(error.response.data);
    } else {
      console.log('Unexpected error', error);
    }
  }
}

const createUser = async (data: object) => {
  try {
    const res = await axios.post(`${API_URL_LOCAL}/signup`, data)
    return res.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.log(error.response.data);
    } else {
      console.log('Unexpected error', error);
    }
  }
}


export default {
  getUsers,
  createUser
};