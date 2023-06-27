import React, { useState } from "react";
import {
  FileOutlined,
  FolderOutlined,
  FileSearchOutlined,
  UserOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Popover } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./StyleMenu.css";
const { Sider } = Layout;
const MenuCyberJira = () => {
  const { user } = useSelector((state) => state.QuanlyUser);
  const navigate = useNavigate();
  return (
    <Sider
      className="sider__menu  h-screen"
      breakpoint="md"
      width={240}
      style={{
        backgroundColor: "rgb(244, 245, 247)",
        borderRight: "1px solid rgb(223, 225, 230)",
        padding: "0px 16px",
      }}
    >
      <div className="flex items-center justify-center py-6 container__menu">
        <img
          className="mr-2"
          src="https://i.imgur.com/lC22izJ.png"
          width={40}
          height={40}
        />
        <div className="menu__name">
          <p
            className="text-base"
            style={{
              color: "rgb(66, 82, 110)",
              fontWeight: "700",
            }}
          >
            Cyber Jira Clone
          </p>
          <p
            className=" text-sm"
            style={{
              color: "rgb(94, 108, 132)",
            }}
          >
            Software project
          </p>
        </div>
      </div>
      <hr></hr>
      <Menu
        style={{
          backgroundColor: "rgb(244, 245, 247)",
          fontSize: "14px",
          borderRight: "none",
          marginBottom: "20px",
        }}
        onClick={({ key }) => {
          if (key) {
            navigate(key);
          }
        }}
        items={[
          {
            key: "/projectManagement",
            label: "Project Management",
            icon: <FolderOutlined />,
          },
          {
            key: "/projectDetail",
            label: "Project Detail",
            icon: <FileSearchOutlined />,
            disabled: true,
          },
          {
            key: "/createProject",
            label: "Create Project",
            icon: <FileOutlined />,
          },
          {
            key: "/myProfile",
            label: "My Profile",
            icon: <UserOutlined />,
          },
        ]}
      />
      <div
        style={{
          borderTop: "1px solid rgb(223, 225, 230)",
        }}
      >
        <Popover
          className="mt-10 ml-4 info__user"
          content={() => {
            return (
              <div>
                <p>
                  Name : <b>{user.name}</b>
                </p>
                <p className="my-2">
                  Email : <b>{user.email}</b>
                </p>
                <p>
                  Phone : <b>{user.phoneNumber}</b>
                </p>
                <button
                  onClick={() => {
                    if (window.confirm("Bạn có chắc muốn đăng xuất")) {
                      localStorage.removeItem("user");
                      localStorage.removeItem("accessToken");
                      alert("Hẹn gặp lại bạn");
                      navigate("/login");
                      window.location.reload(false);
                    }
                  }}
                  style={{
                    backgroundColor: "rgb(244, 245, 247)",
                  }}
                  className="w-full py-2 px-2 my-2 flex items-center"
                >
                  <ExportOutlined className="mr-2" />
                  Đăng Xuất
                </button>
              </div>
            );
          }}
          title={() => {
            return (
              <NavLink to={"/myProfile"}>
                <p className="cursor-pointer">My Profile</p>
              </NavLink>
            );
          }}
          trigger="click"
        >
          <img
            width={50}
            height={50}
            style={{
              borderRadius: "50%",
            }}
            src={user.avatar}
            alt=""
          />
        </Popover>
      </div>
    </Sider>
  );
};
export default MenuCyberJira;
