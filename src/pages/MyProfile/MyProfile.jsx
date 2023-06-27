import { Breadcrumb } from "antd";
import React from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { EditUser } from "../../store/QuanlyUser/thunkAction";
import * as Yup from "yup";
import "./StyleMyProfile.css";
const MyProfile = () => {
  const { user } = useSelector((state) => state.QuanlyUser);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      id: user.id,
      passWord: "",
      email: user.email,
      name: user.name,
      phoneNumber: user.phoneNumber,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Bạn không được để trống !")
        .email("Bạn phải nhập vào là email !"),
      password: Yup.string().required("Bạn không được để trống !"),
      phoneNumber: Yup.string()
        .required("Bạn không được để trống !")
        .matches(/[0-9]/, "Bạn chỉ được nhập số !"),
      name: Yup.string()
        .required("Bạn không được để trống !")
        .matches(/^[a-z A-Z]+$/, "Bạn phải nhập vào là chữ"),
    }),
    onSubmit: (values) => {
      dispatch(EditUser(values));
    },
  });
  return (
    <div>
      <Breadcrumb
        style={{
          color: "rgb(94, 108, 132)",
          fontSize: "14px",
        }}
      >
        <Breadcrumb.Item>Cyber Jira Clone</Breadcrumb.Item>
        <Breadcrumb.Item>My Profile</Breadcrumb.Item>
      </Breadcrumb>
      <h1 className="mt-3 text-2xl font-medium">My Profile</h1>

      <form className="px-60 form__container" onSubmit={formik.handleSubmit}>
        <div className="flex justify-center mb-8">
          <img
            width={80}
            height={80}
            style={{
              borderRadius: "50%",
            }}
            src={user.avatar}
            alt=""
          />
        </div>
        <div className="relative z-0 w-full mb-8 group">
          <input
            type="text"
            name="id"
            className="block  cursor-not-allowed py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={formik.values.id}
            disabled
          />
          <label
            htmlFor="ID"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            ID
          </label>
        </div>
        <div className="relative z-0 w-full mb-8 group">
          <input
            type="text"
            name="name"
            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Name
          </label>
          <div className="text-red-500 text-sm mt-2 ">
            {formik.errors.name && formik.touched.name && (
              <p>{formik.errors.name}</p>
            )}
          </div>
        </div>
        <div className="relative z-0 w-full mb-8 group">
          <input
            type="email"
            name="email"
            className="block py-2.5 px-0 w-full text-sm text-blackbg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email
          </label>
          <div className="text-red-500 text-sm mt-2 ">
            {formik.errors.email && formik.touched.email && (
              <p>{formik.errors.email}</p>
            )}
          </div>
        </div>

        <div className="relative z-0 w-full mb-8 group">
          <input
            type="password"
            name="password"
            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            onChange={formik.handleChange}
            defaultValue="***********"
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
          <div className="text-red-500 text-sm mt-2">
            {formik.errors.password && formik.touched.password && (
              <p>{formik.errors.password}</p>
            )}
          </div>
        </div>
        <div className="relative z-0 w-full mb-8 group">
          <input
            type="text"
            name="phoneNumber"
            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
          />
          <label
            htmlFor="phoneNumber"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Phone Number
          </label>
          <div className="text-red-500 text-sm mt-2 ">
            {formik.errors.phoneNumber && formik.touched.phoneNumber && (
              <p>{formik.errors.phoneNumber}</p>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Edit Profile
        </button>
      </form>
    </div>
  );
};

export default MyProfile;
