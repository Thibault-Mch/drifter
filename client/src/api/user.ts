import axios from "axios";
import { API_URL_LOCAL } from "@env"
import { ILogin } from '@interfaces/user.interface'
import * as SecureStore from 'expo-secure-store';

const login = async (loginData: ILogin) => {
  try {
    const res = await axios.post(
      `${API_URL_LOCAL}/login`, loginData
    );
    console.log(res.data)
    saveToken(res.data.token)
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    } else {
      console.log('Unexpected error', error);
    }
  }
}

const signUp = async (data: ILogin) => {
  try {
    const res = await axios.post(`${API_URL_LOCAL}/signup`, data)
    saveToken(res.data.token)
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
  signUp
};
