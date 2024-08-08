import React, { useContext } from "react";
import InputCustom from "../Input/InputCustom";
import { Link, useNavigate } from "react-router-dom";
import { notiValidation, pathDefault } from "../../common";
import { useFormik } from "formik";
import * as yup from "yup";
import { authService } from "../../services";
import { setLocalStorage } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { setValueUser } from "../../redux/authSlice";
import { NotificationContext } from "../../App";

const FormLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handleNotifycation } = useContext(NotificationContext);

  const { values, errors, handleChange, handleBlur, handleSubmit, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },

      onSubmit: async (values) => {
        console.log(values);
        try {
          const result = await authService.signIn(values);
          console.log(result);

          //B1 Lưu vào localStorage
          setLocalStorage("user", result.data.content);

          // B2 Lưu vào store
          dispatch(setValueUser(result.data.content));

          // B3 Hiện thông báo thành công
          handleNotifycation("Đăng nhập thành công!", "success");

          // Chuyển hướng về trang trử
          setTimeout(() => {
            navigate(pathDefault.homePage);
          }, 1000);
        } catch (err) {
          console.log(err);
          handleNotifycation(err.response.data.content, "error");
        }
      },

      validationSchema: yup.object({
        email: yup
          .string()
          .required(notiValidation.empty)
          .email(notiValidation.email),
        password: yup
          .string()
          .required(notiValidation.empty)
          .matches(
            /^(?=.*[A-Z])(?=.*\d).+$/,
            "Vui lòng nhập ít nhất 1 chữ cái viết hoa và số"
          ),
      }),
    });
  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-5">
        <h1 className="font-mediun text-3xl text-center">
          Giao diện đăng nhập
        </h1>
        <InputCustom
          onBlur={handleBlur}
          name={"email"}
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          touched={touched.email}
          contentLabel="Email"
          placeHolder="Vui lòng nhập email"
        />
        <InputCustom
          onBlur={handleBlur}
          name={"password"}
          value={values.password}
          onChange={handleChange}
          error={errors.password}
          touched={touched.password}
          contentLabel="Password"
          placeHolder="Vui lòng nhập Password"
          type="password"
        />
        <div>
          <button
            type="submit"
            className="inline-block w-full py-3 px-5 bg-black text-white rounded-lg"
          >
            Đăng nhập
          </button>
        </div>
        <span className="inline-block">
          Chưa có tài khoản?{" "}
          <Link
            className="text-red-500 hover:underline"
            to={pathDefault.register}
          >
            Đăng kí
          </Link>
        </span>
      </form>
    </>
  );
};

export default FormLogin;
