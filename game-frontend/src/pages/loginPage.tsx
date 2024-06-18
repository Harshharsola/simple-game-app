import React, { useState } from "react";
import LoginComponent from "../components/loginComponent";
import styled from "@emotion/styled";
import { LogInComponentType } from "../constants";

interface UserDataInterface {
  userName?: string;
  email: string;
  password: string;
  userId?: string;
}
const Modal = styled.div`
  background-color: white;
  width: 20%;
  minw-idth: 300px;
  text-align: center;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  padding: 1.5%;
  gap: 10px;
`;
const Page = styled.div`
  background-color: #1f4d90;
  height: 100vh;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function LoginPage({
  userData,
  setUserData,
}: {
  userData: UserDataInterface;
  setUserData: React.Dispatch<React.SetStateAction<UserDataInterface>>;
}) {
  const [logedIn, setLogedIn] = useState<boolean>(false);

  return (
    <Page>
      <LoginComponent
        userData={userData}
        setUserData={setUserData}
        componentType={LogInComponentType.SIGN_UP}
        setLoggedIn={setLogedIn}
      />
    </Page>
  );
}

export default LoginPage;
