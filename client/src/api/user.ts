import axios from "axios";
import { API_URL_LOCAL } from "@env"
import { IUser, ILogin } from '../../../server/src/interfaces/user.interface'
import * as SecureStore from 'expo-secure-store';

const login = async (loginData: ILogin) => {
  try {
    const res = await axios.post(
      `${API_URL_LOCAL}/login`, loginData
    );
    saveToken(res.data.token)
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.log(error.response.data);
    } else {
      console.log('Unexpected error', error);
    }
  }
}

const signup = async (data: IUser) => {
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

const saveToken = async (token: string) => {
  await SecureStore.setItemAsync("loginToken", token);
}

// const loggedIn = async (token: string) => {
//   try {
//     const res = await axios.get(`${API_URL_LOCAL}/is-logged`, {
//       headers: {
//         'Authorization': token
//       }
//     })
//     return res.data
//   } catch (error) {
//     if (axios.isAxiosError(error) && error.response) {
//       console.log(error.response.data);
//     } else {
//       console.log('Unexpected error', error);
//     }
//   }
// }

export default {
  login,
  signup
};
