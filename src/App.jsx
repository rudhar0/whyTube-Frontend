import { useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import { CookiesProvider, useCookies } from "react-cookie";

function App() {
  
  const [cookie, setCookie] = useCookies(['user','acessToken','refreshToken'])

  return (
    <CookiesProvider>
      
      <div className=" bg-black h-[100vh]  w-[100wh] flex justify-center items-start">
        <Login />
      </div>
    </CookiesProvider>
  );
}

export default App;
