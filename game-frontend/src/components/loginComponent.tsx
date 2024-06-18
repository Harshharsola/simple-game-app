import React, { useState } from "react";
import { useEffect } from "react";

import { Button, Typography } from "@mui/material";

import styled from "@emotion/styled";
import toast, { useToasterStore } from "react-hot-toast";

import { LogInComponentType } from "../constants";
import { logInApi, signUpApi } from "../api";
interface UserDataInterface {
  userName?: string;
  email: string;
  password: string;
  userId?: string;
}

interface Iprops {
  userId: string | undefined;
  setUserId: React.Dispatch<React.SetStateAction<string | undefined>>;
  componentType: LogInComponentType;
}

const Modal = styled.div`
  background-color: white;
  width: 20%;
  min-width: 300px;
  text-align: center;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  padding: 2%;
  gap: 2px;
`;

function LoginComponent(props: Iprops) {
  const [componentType, setComponentType] = useState<
    LogInComponentType.LOG_IN | LogInComponentType.SIGN_UP
  >(props.componentType);
  const [userData, setUserData] = useState<UserDataInterface>({
    userName: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event: any) => {
    let data = {
      ...userData,
      [event.target.name]: event.target.value,
    };
    setUserData(data);
  };

  const handleSubmit = async () => {
    let response;
    if (componentType === LogInComponentType.SIGN_UP) {
      if (
        Object.values(userData).filter((value) => value.length === 0).length ===
        0
      ) {
        if (userData.userName)
          response = await signUpApi({
            userName: userData.userName,
            email: userData.email,
            password: userData.password,
          });
        if (response && response.status === "201") {
          setComponentType(LogInComponentType.LOG_IN);
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
      } else {
        toast.error("Missing fields");
      }
    } else {
      response = await logInApi(userData);
      if (response && response.status === "200") {
        localStorage.setItem("jwtToken", response.data.accessToken);
        localStorage.setItem("userId", response.data.userId);
        props.setUserId(response.data.userId);
        setComponentType(LogInComponentType.LOG_IN);
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    }

    console.log(response);
  };

  return (
    <div
      style={{
        backgroundColor: "#1F4D90",
        height: "100vh",
        width: "100%",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Modal>
        <Typography variant="h4">Create Account</Typography>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {componentType === LogInComponentType.SIGN_UP && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "left",
                width: "100%",
                gap: "4px",
              }}
            >
              <Typography>Name</Typography>
              <input
                style={{ height: "30px" }}
                name="userName"
                onChange={handleInputChange}
              ></input>
            </div>
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
              width: "100%",
              gap: "4px",
            }}
          >
            <Typography>Email</Typography>
            <input
              style={{ height: "30px" }}
              name="email"
              onChange={handleInputChange}
            ></input>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
              width: "100%",
              gap: "4px",
            }}
          >
            <Typography>Password</Typography>
            <input
              style={{ height: "30px" }}
              name="password"
              type="password"
              onChange={handleInputChange}
            ></input>
          </div>

          <Button
            style={{
              backgroundColor: "#1F4D90",
              color: "white",
            }}
            onClick={handleSubmit}
          >
            <Typography variant="button">
              {componentType === LogInComponentType.SIGN_UP
                ? "Sign Up"
                : "Login"}
            </Typography>
          </Button>
          <Typography>
            <span>
              {componentType === LogInComponentType.SIGN_UP
                ? "Already have an account?"
                : " New to MyApp"}
            </span>{" "}
            <span
              style={{ color: "blue" }}
              onClick={() => {
                componentType === LogInComponentType.SIGN_UP
                  ? setComponentType(LogInComponentType.LOG_IN)
                  : setComponentType(LogInComponentType.SIGN_UP);
              }}
            >
              {componentType === LogInComponentType.SIGN_UP
                ? "Login"
                : "Sign Up"}
            </span>
          </Typography>
        </div>
      </Modal>
    </div>
  );
}

export default LoginComponent;
