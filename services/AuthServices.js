import axios from "../lib/axios";
import { getToken, setToken } from "@/services/TokenService";

export const register = async (credential) => {
  const { data } = await axios.post("register", credential, {
    headers: {
      Accept: "application/json",
    },
  });

  return data;
};

export const login = async (credential) => {
  const { data } = await axios.post("login", credential, {
    headers: {
      Accept: "application/json",
    },
  });

  await setToken(data.token);
};

export const getCurrentUser = async () => {
  let token = await getToken();

  try {
    const { data } = await axios.get("user", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};
