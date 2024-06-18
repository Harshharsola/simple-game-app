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
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/auth/login`,
    payload
  );

  return response.data;
};

export const updateUserIdAndToken = async (payload: {
  userId: string;
  userFbId: string;
  accessToken: string;
}) => {
  const raw = JSON.stringify(payload);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/users/add-id`,
    requestOptions
  );

  return response.json();
};

export const getPages = async (payload: { userId: string }) => {
  console.log(payload);

  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/pages?id=` + payload.userId
  );

  return response.json();
};

export const connectPage = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/conversations/connect-page`
  );

  return response.json();
};

export const getConversations = async (payload: { pageId: string }) => {
  console.log(payload);

  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/conversations?pageId=` + payload.pageId
  );

  return response.json();
};

export const deletePage = async (id: string) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/pages/delete?id=` + id,
    {
      method: "DELETE",
    }
  );
  return response.json();
};
