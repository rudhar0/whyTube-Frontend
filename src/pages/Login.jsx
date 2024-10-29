import {  useState } from "react";
import FormWithOneInput from "../components/FormWithOneInput";
import LogoWthText from "../components/LogoWthText";
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
            if (data.insertInputValue()) {
              setCurrentStage(1);
            }
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
          onClick={(e) => {
            if (data.insertInputValue(e)) {
              setCurrentStage(1);
            }
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

  function AddingInputValue() {
    if (inputValue.trim() === "") {
      setError(true);
      setErrorMsg("Input is required");
      return false;
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
        if (emailVerify.test(inputValue)) {
          const email = inputValue;
          setMainText(`Email: ${email}`);
        } else {
          const username = inputValue;
          setMainText(`${ username.username}Enter Password`);
        }
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data.match(/<pre>(.*?)<br>/s));

          setErrorMsg(error.response.data?.message || "An error occurred");
        } else if (error.request) {
          setErrorMsg("No response received from the server.");
        } else {
          setErrorMsg(error.message);
        }
        setError(true);
        return false;
      });

    return true;
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
          password={inputPassword}
          setPassword={setInputPassword}
          EmptyError={error}
          insertInputValue={() => {
            return AddingInputValue();
          }}
        ></LoginStage>
      </div>
    </div>
  );
}

export default Login;
