import React from "react";

import { Navigate, Outlet } from "react-router-dom";
import MenuCyberJira from "../Components/MenuCyberJira/MenuCyberJira";
import { Layout } from "antd";
import { useSelector } from "react-redux";

const CyberJira = () => {
  const { user } = useSelector((state) => state.QuanlyUser);
  if (user) {
    return (
      <Layout
        style={{
          height: "100%",
        }}
      >
        <div
          style={{
            height: "100vh",
          }}
        >
          <MenuCyberJira />
        </div>

        <Layout
          style={{
            padding: "32px 24px 32px 32px",
            backgroundColor: "white",
          }}
        >
          <Outlet />
        </Layout>
      </Layout>
    );
  } else {
    alert("Bạn cần phải đăng nhập");
    return <Navigate to={"/login"} />;
  }
};

export default CyberJira;
