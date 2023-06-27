import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import "./StyleLogin.css";
import { Layout } from "antd";

import { login } from "../../store/QuanlyUser/thunkAction";
import { useFormik } from "formik";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
const { Sider, Content } = Layout;

const Login = () => {
  // Set Size UI
  const [{ width, height }, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    window.onresize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
  }, []);
  // DisPatch API
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Bạn không được để trống !")
        .email("Bạn phải nhập vào là email !"),
      password: Yup.string().required("Bạn không được để trống !"),
    }),
    onSubmit: (values) => {
      dispatch(login(values));
      console.log("value:", values);
      console.log("user", user);
    },
  });
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.QuanlyUser);
  if (user) {
    return navigate("/projectManagement");
  }

  return (
    <Layout>
      <Sider
        className="img__login"
        width={width / 2}
        style={{
          height: window.innerHeight,
          backgroundImage:
            "url(https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></Sider>
      <Content
        className="flex justify-center items-center login__container "
        height={height}
      >
        <div className="form-container">
          <p className="title">Login CyberJira</p>
          <form className="form" onSubmit={formik.handleSubmit}>
            {/* email */}
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                onChange={formik.handleChange}
                placeholder="Email"
              />
            </div>
            {/* Message Error Email */}
            <div className="text-red-500 text-sm my-2">
              {formik.errors.email && formik.touched.email && (
                <p>{formik.errors.email}</p>
              )}
            </div>
            {/* Password */}
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={formik.handleChange}
              />
              {/* Message Error Password */}
              <div className="text-red-500 text-sm my-2">
                {formik.errors.password && formik.touched.password && (
                  <p>{formik.errors.password}</p>
                )}
              </div>
              <div className="forgot">
                <a rel="noopener noreferrer" href="">
                  Forgot Password ?
                </a>
              </div>
            </div>

            <button type="submit" className="sign">
              Sign in
            </button>
          </form>
          <div className="social-message">
            <div className="line" />
            <p className="message">Login with social accounts</p>
            <div className="line" />
          </div>
          <div className="social-icons">
            <button aria-label="Log in with Facebook" className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="bi bi-facebook w-5 h-5 fill-current"
                viewBox="0 0 16 16"
              >
                {"{"}" "{"}"}
                <path
                  fill="#1677ff"
                  d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"
                />
                {"{"}" "{"}"}
              </svg>
            </button>
            <button aria-label="Log in with Twitter" className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="w-5 h-5 fill-current"
              >
                <path
                  fill="#1677ff"
                  d="M31.937 6.093c-1.177 0.516-2.437 0.871-3.765 1.032 1.355-0.813 2.391-2.099 2.885-3.631-1.271 0.74-2.677 1.276-4.172 1.579-1.192-1.276-2.896-2.079-4.787-2.079-3.625 0-6.563 2.937-6.563 6.557 0 0.521 0.063 1.021 0.172 1.495-5.453-0.255-10.287-2.875-13.52-6.833-0.568 0.964-0.891 2.084-0.891 3.303 0 2.281 1.161 4.281 2.916 5.457-1.073-0.031-2.083-0.328-2.968-0.817v0.079c0 3.181 2.26 5.833 5.26 6.437-0.547 0.145-1.131 0.229-1.724 0.229-0.421 0-0.823-0.041-1.224-0.115 0.844 2.604 3.26 4.5 6.14 4.557-2.239 1.755-5.077 2.801-8.135 2.801-0.521 0-1.041-0.025-1.563-0.088 2.917 1.86 6.36 2.948 10.079 2.948 12.067 0 18.661-9.995 18.661-18.651 0-0.276 0-0.557-0.021-0.839 1.287-0.917 2.401-2.079 3.281-3.396z"
                />
              </svg>
            </button>
            <button aria-label="Log in with GitHub" className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="w-5 h-5 fill-current"
              >
                <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z" />
              </svg>
            </button>
          </div>
          <p className="signup">
            Don't have an account?
            <NavLink to="/register">Sign up</NavLink>
          </p>
        </div>
      </Content>
    </Layout>
  );
};

export default Login;
