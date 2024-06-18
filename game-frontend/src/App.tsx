import React, { useEffect, useState } from "react";
import "./App.css";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/loginPage";
import GamePage from "./pages/gamePage";
interface UserDataInterface {
  userId?: string;
}
function App() {
  const [userId, setUserId] = useState<string>();

  const [pageId, setPageId] = useState<string>("");
  useEffect(() => {}, []);

  return (
    <div>
      {!userId ? (
        <LoginPage userId={userId} setUserId={setUserId} />
      ) : (
        <GamePage userId={userId} />
      )}
      <Toaster />
    </div>
  );
}

export default App;
