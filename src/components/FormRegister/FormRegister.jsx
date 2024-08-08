import React, { useContext } from "react";
import InputCustom from "../Input/InputCustom";
import { DatePicker } from "antd";
import { useFormik } from "formik";
import * as yup from "yup";
import { notiValidation } from "../../common";
import { authService } from "../../services";
import { NotificationContext } from "../../App";
import { useNavigate } from "react-router-dom";

const FormRegister = () => {
  // Lấy toast thông qua context
  const { handleNotifycation } = useContext(NotificationContext);
  // Chuyển hướng người dùng:
  const navigate = useNavigate();

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      birthday: "",
      gender: "",
    },

    onSubmit: (values) => {
      authService
        .signUp({
          ...values,
          gender: values.gender == "Nam" ? true : false,
        })
        .then((res) => {
          //B1: Thực hiện thông báo cho người dùng
          handleNotifycation("Tạo tài khoản thành công!", "success");

          setTimeout(() => {
            navigate("/dang-nhap");
          }, 2000);
        })
        .catch((err) => {
          handleNotifycation(err.response.data.content, "error");
        });
    },

    validationSchema: yup.object({
      name: yup
        .string()
        .required(notiValidation.empty)
        .matches(/^[A-Za-zÀ-ỹà-ỹ\s]+$/, "Vui long nhập tên không chứa số"),
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
      phone: yup
        .string()
        .required(notiValidation.empty)
        .matches(
          /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
          "Vui lòng nhập đúng số điện thoại"
        ),
      birthday: yup.string().required(notiValidation.empty),
      gender: yup.string().required(notiValidation.empty),
    }),
  });

  return (
    <div className="flex flex-col h-full items-center justify-center">
      <h1 className="text-3xl font-bold">Form Đăng Ký</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap">
          <InputCustom
            onChange={handleChange}
            value={values.name}
            onBlur={handleBlur}
            touched={touched.name}
            error={errors.name}
            contentLabel={"Họ tên"}
            name={"name"}
            placeHolder={"Vui lòng nhập tên"}
            classWrapper="w-1/2 p-3"
          />

          <InputCustom
            onChange={handleChange}
            value={values.email}
            onBlur={handleBlur}
            touched={touched.email}
            error={errors.email}
            contentLabel={"Email"}
            name={"email"}
            placeHolder={"Vui lòng nhập email"}
            classWrapper="w-1/2 p-3"
          />

          <InputCustom
            onChange={handleChange}
            value={values.password}
            onBlur={handleBlur}
            touched={touched.password}
            error={errors.password}
            contentLabel={"Mật Khẩu"}
            name={"password"}
            type="password"
            placeHolder={"Vui lòng nhập mật khẩu"}
            classWrapper="w-full p-3"
          />

          <InputCustom
            onChange={handleChange}
            value={values.phone}
            onBlur={handleBlur}
            touched={touched.phone}
            error={errors.phone}
            contentLabel={"Số điện thoại"}
            name={"phone"}
            placeHolder={"Vui lòng nhập số điện thoại"}
            classWrapper="w-1/3 p-3"
          />

          <div className="w-1/3 p-3">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Ngày Sinh
            </label>
            <DatePicker
              className="w-full"
              format="DD-MM-YYYY"
              onChange={(dayjs, dateString) => {
                setFieldValue("birthday", dateString);
              }}
            />
            {errors.birthday && touched.birthday ? (
              <p className="text-red-500">{errors.birthday}</p>
            ) : null}
          </div>

          <div className="w-1/3 p-3">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Giới tính
            </label>
            <select
              name="gender"
              onChange={handleChange}
              value={values.gender}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              <option value="">Chọn giới tính</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>
            {errors.gender && touched.gender ? (
              <p className="text-red-500">{errors.gender}</p>
            ) : null}
          </div>

          <div className="w-full">
            <button
              type="submit"
              className="py-3 px-6 bg-black text-white rounded-md w-full"
            >
              Đăng kí
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormRegister;
