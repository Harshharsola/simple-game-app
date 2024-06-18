import React, { useEffect, useState } from "react";
import "./App.css";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/loginPage";
interface UserDataInterface {
  userName?: string;
  email: string;
  password: string;
  userId?: string;
}
function App() {
  const [userData, setUserData] = useState<UserDataInterface>({
    userName: "",
    email: "",
    password: "",
  });
  const [pageId, setPageId] = useState<string>("");
  useEffect(() => {}, []);

  return (
    <div>
      <LoginPage userData={userData} setUserData={setUserData} />
      <Toaster />
    </div>
  );
}

export default App;
