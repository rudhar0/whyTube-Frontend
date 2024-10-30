import { useState } from "react";
import FormWithOneInput from "../components/FormWithOneInput";
import LogoWthText from "../components/LogoWthText";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

function LoginStage(data) {
  const [currentStage, setCurrentStage] = useState(0);

  switch (currentStage) {
    case 0:
      return (
        <FormWithOneInput
          PlaceHolder="Email or username"
          value={data.value}
          setValue={data.setValue}
          errormsg={data.errormsg}
          setError={data.setError}
          EmptyError={data.EmptyError}
          labelVal={"Email or usernsme*"}
          buttonText="Next"
          onClick={() => {
            data.insertInputValue(setCurrentStage);
          }}
        />
      );

    case 1:
      return (
        <FormWithOneInput
          errormsg={data.errormsg}
          value={data.password}
          setValue={data.setPassword}
          EmptyError={data.EmptyError}
          setError={data.setError}
          buttonText="Sign In"
          labelVal={"Password*"}
          PlaceHolder="Enter Your Password"
          onClick={() => {
            data.callingForm();
          }}
        />
      );

    default:
  }
}

function Login() {
  // const [form, setFormData] = useState({});
  const [mainText, setMainText] = useState("Welcome Back!!");
  const [error, setError] = useState(false);
  const [errormsg, setErrorMsg] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  function callingForm() {
    if (inputPassword == "") {
      setError(true);
      setErrorMsg("password  is required");
      return;
    }
    const emailVerify = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    axios
      .post("/api/v1/users/login", {
        password: inputPassword,
        email: emailVerify.test(inputValue) ? inputValue : undefined,
        username: !emailVerify.test(inputValue) ? inputValue : undefined,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function AddingInputValue(setCurrentStage) {
    if (inputValue.trim() === "") {
      setError(true);
      setErrorMsg("Input is required");
      return;
    }

    const emailVerify = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    axios
      .post("/api/v1/users/is-user-valid", {
        email: emailVerify.test(inputValue) ? inputValue : undefined,
        username: !emailVerify.test(inputValue) ? inputValue : undefined,
      })
      .then(function (res) {
        const response = res.data;
        console.log(response);
        //.replace(/^Error:\s*/, '')
        if (emailVerify.test(inputValue)) {
          const email = inputValue;
          setMainText(`Email: ${email}`);
        } else {
          const username = inputValue;
          setMainText(`Enter Password`);
        }
        setCurrentStage(1);
      })
      .catch(function (error) {
        console.log(error);
        if (error.response) {
          console.log(error.response.data.match(/<pre>(.*?)<br>/s));

          setErrorMsg(error.response.data?.message || "An error occurred");
        } else if (error.request) {
          setErrorMsg("No response received from the server.");
        } else {
          setErrorMsg(error.message);
        }
        setError(true);
      });
  }

  return (
    <div className="mt-[90px]">
      <div className="bg-black flex flex-col justify-center items-center h-[262px] w-[360px] text-white gap-[32px]">
        <LogoWthText text={mainText} />
        <LoginStage
          errormsg={errormsg}
          value={inputValue}
          setMainText={setMainText}
          setValue={setInputValue}
          setError={setError}
          callingForm={callingForm}
          password={inputPassword}
          setPassword={setInputPassword}
          EmptyError={error}
          insertInputValue={(setCurrentStage) => {
            return AddingInputValue(setCurrentStage);
          }}
        ></LoginStage>
      </div>
    </div>
  );
}

export default Login;
