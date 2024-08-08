import React from "react";
import { signInAnimation } from "../../assets";
import { useLottie } from "lottie-react";
import { FormLogin } from "../../components";

const LoginPage = () => {
  const options = {
    animationData: signInAnimation,
    loop: true,
  };

  const { View } = useLottie(options);

  return (
    <div>
      <div className="container">
        <div className="loginPage_content flex h-screen items-center ">
          <div className="loginPage_img w-1/2">{View}</div>

          <div className="loginPage_form w-1/2 px-5">
            <FormLogin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
