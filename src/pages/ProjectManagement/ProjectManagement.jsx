import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Layout,
  Breadcrumb,
  Table,
  Space,
  Tag,
  Avatar,
  Popover,
  Button,
  AutoComplete,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";
import "./StyleProject.css";
import {
  AllProject,
  DeleteProject,
  GetInfoProject,
  addUserProject,
  getProjectDetail,
  removeUserProject,
} from "../../store/QuanLyProject/thunkAction";
import { QuanLyModalAction } from "../../store/QuanLyModal/slice";
import { getUser } from "../../store/QuanlyUser/thunkAction";
import { NavLink } from "react-router-dom";

const { Content } = Layout;

const onChange = (pagination, filters, sorter, extra) => {};

const ProjectManagement = () => {
  const { confirm } = Modal;
  const [value, setValue] = useState("");
  const searchRef = useRef(null);
  const dispath = useDispatch();

  useEffect(() => {
    dispath(AllProject());
  }, [dispath]);
  const { ArrProjectManagement } = useSelector((state) => state.QuanLyProject);

  const columns = [
    {
      title: "id",
      key: "id",
      dataIndex: "id",
      responsive: ["xxl", "xl"],
      sorter: (a, b) => a.id - b.id,
      sortDirections: ["descend"],
    },
    {
      title: "Project Name",
      key: "projectName",
      dataIndex: "projectName",
      render(text, record) {
        return (
          <NavLink
            onClick={() => {
              dispath(getProjectDetail(record.id));
            }}
            to={`/projectDetail/${record.id}`}
          >
            {text}
          </NavLink>
        );
      },
      sorter: (a, b) => {
        let projectName1 = a.projectName?.trim().toLowerCase();
        let projectName2 = b.projectName?.trim().toLowerCase();
        if (projectName2 < projectName1) {
          return -1;
        }
        return 1;
      },
    },
    {
      title: "Category Name",
      key: "categoryName",
      dataIndex: "categoryName",
      responsive: ["xl", "xxl"],
      sorter: (a, b) => {
        let categoryName1 = a.categoryName?.trim().toLowerCase();
        let categoryName2 = b.categoryName?.trim().toLowerCase();
        if (categoryName2 < categoryName1) {
          return -1;
        }
        return 1;
      },
    },
    {
      title: "Creator",
      key: "creator",
      dataIndex: "creator",
      render: (text, record, index) => {
        return (
          <Tag key={index} color="lime">
            {record.creator?.name}
          </Tag>
        );
      },
      responsive: ["xl", "xxl"],
      sorter: (a, b) => {
        let creator1 = a.creator?.name.trim().toLowerCase();
        let creator2 = b.creator?.name.trim().toLowerCase();
        if (creator2 < creator1) {
          return -1;
        }
        return 1;
      },
    },
    {
      title: "Members",
      key: "members",
      render: (record, index) => {
        return (
          <div key={index} className="flex items-center">
            <Avatar.Group
              maxCount={3}
              maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
            >
              {record.members?.map((member, index) => {
                return (
                  <Popover
                    key={index}
                    content={() => {
                      return (
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                          <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                              <tr>
                                <th scope="col" className="px-6 py-3">
                                  ID
                                </th>
                                <th scope="col" className="px-6 py-3">
                                  Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                  Avatar
                                </th>
                                <th scope="col" className="px-6 py-3">
                                  Action
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {record.members?.map((item, index) => {
                                return (
                                  <tr
                                    key={index}
                                    className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                                  >
                                    <td className="px-6 py-4">{item.userId}</td>
                                    <td className="px-6 py-4  text-gray-900 whitespace-nowrap dark:text-white font-medium">
                                      {item.name}
                                    </td>
                                    <td className="px-6 py-4">
                                      <img
                                        width={30}
                                        height={30}
                                        className="rounded-full"
                                        src={item.avatar}
                                      ></img>
                                    </td>
                                    <td className="px-6 py-4 text-lg">
                                      <button
                                        onClick={() => {
                                          const removeUser = {
                                            projectId: record.id * 1,
                                            userId: item.userId * 1,
                                          };

                                          confirm({
                                            title:
                                              "Bạn có chắc muốn xóa user " +
                                              item.name,
                                            icon: <ExclamationCircleFilled />,

                                            okText: "Yes",
                                            okType: "danger",
                                            cancelText: "No",
                                            onOk() {
                                              dispath(
                                                removeUserProject(removeUser)
                                              );
                                              dispath(AllProject());
                                            },
                                            onCancel() {
                                              console.log("Cancel");
                                            },
                                          });
                                        }}
                                        className="px-2 text-red-500"
                                      >
                                        <DeleteOutlined />
                                      </button>
                                    </td>
                                    <td className="px-6 py-4"></td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      );
                    }}
                    title="Info Member"
                  >
                    <Avatar key={index} src={member.avatar}></Avatar>
                  </Popover>
                );
              })}
            </Avatar.Group>
            <Popover
              placement="topLeft"
              title={"Add Member"}
              content={() => {
                return (
                  <AutoComplete
                    options={userSearch?.map((user, index) => {
                      return {
                        label: user.name,
                        value: user.userId.toString(),
                      };
                    })}
                    value={value}
                    onChange={(text) => {
                      setValue(text);
                    }}
                    onSearch={(value) => {
                      if (searchRef.current) {
                        clearTimeout(searchRef.current);
                      }
                      searchRef.current = setTimeout(() => {
                        dispath(getUser(value));
                      }, 300);
                    }}
                    onSelect={(valueSelect, option) => {
                      setValue(option.label);
                      let assginUser = {
                        projectId: record.id,
                        userId: valueSelect * 1,
                      };
                      dispath(addUserProject(assginUser));
                      dispath(AllProject());
                    }}
                    className="w-full"
                  />
                );
              }}
              trigger="click"
            >
              <Button
                style={{
                  backgroundColor: "#f56a00",
                  color: "white",
                }}
                shape="circle"
              >
                +
              </Button>
            </Popover>
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      render: (text, record) => (
        <Space size="middle">
          <button
            key={1}
            className="bg-green-500"
            onClick={() => {
              dispath(GetInfoProject(record.id));
              dispath(QuanLyModalAction.openModal());
            }}
          >
            <EditOutlined className="text-white p-2" />
          </button>

          <button
            onClick={() => {
              confirm({
                title:
                  "Bạn có chắc muốn xóa Project Name " + record.projectName,
                icon: <ExclamationCircleFilled />,

                okText: "Yes",
                okType: "danger",
                cancelText: "No",
                async onOk() {
                  await dispath(DeleteProject(record.id));
                  dispath(AllProject());
                },
                onCancel() {
                  console.log("Cancel");
                },
              });
            }}
            key={2}
            className="bg-red-500"
          >
            <DeleteOutlined className="text-white p-2" />
          </button>
        </Space>
      ),
    },
  ];
  const { userSearch } = useSelector((state) => state.QuanlyUser);
  return (
    <div>
      <Breadcrumb
        style={{
          color: "rgb(94, 108, 132)",
          fontSize: "14px",
        }}
      >
        <Breadcrumb.Item>Cyber Jira Clone</Breadcrumb.Item>
        <Breadcrumb.Item>Project Management</Breadcrumb.Item>
      </Breadcrumb>
      <Content
        style={{
          marginBottom: "10px",
        }}
      >
        <h1 className="mt-3 text-2xl font-medium ">Project Management</h1>
      </Content>
      <Table
        className="table__cyberJira"
        rowKey={ArrProjectManagement.id}
        columns={columns}
        dataSource={ArrProjectManagement}
        onChange={onChange}
      />
    </div>
  );
};

export default ProjectManagement;
