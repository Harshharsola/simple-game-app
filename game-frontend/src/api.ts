import axios from "./apiInterceptor";
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

export const signUpApi = async (payload: {
  userName: string;
  email: string;
  password: string;
}) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/auth/signup`,
    payload
  );

  return response.data;
};

export const logInApi = async (payload: {
  email: string;
  password: string;
}) => {
  const raw = JSON.stringify(payload);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/auth/login`,
    requestOptions
  );

  return response.json();
};
