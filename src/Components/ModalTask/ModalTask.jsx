import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Avatar, Col, Modal, Row, Select, Slider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { QuanLyModalAction } from "../../store/QuanLyModal/slice";
import { DeleteOutlined } from "@ant-design/icons";
import { quanLyTaskServices } from "../../services/quanLyTask.services";
import { getProjectDetail } from "../../store/QuanLyProject/thunkAction";
import { ExclamationCircleFilled } from "@ant-design/icons";
import * as Yup from "yup";
import {
  deleteTask,
  getTaskDetail,
  removeUserTask,
  updateTask,
} from "../../store/QuanLyTask/thunkAction";
import Comment from "../Comment";
import { useFormik } from "formik";
const { confirm } = Modal;
const ModalTask = () => {
  const { arrTaskDetail, arrStatus, arrPriority } = useSelector(
    (state) => state.QuanLyTask
  );

  const { ArrProjectDetail } = useSelector((state) => state.QuanLyProject);
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const { isModalTask } = useSelector((state) => state.QuanLyModal);

  const closeModal = () => {
    dispatch(QuanLyModalAction.closeModalTask());
  };
  const editorRef = useRef(null);

  const AssignUser = arrTaskDetail.assigness?.map((user) => {
    return user.id;
  });
  const renderTimeTracking = () => {
    const { timeTrackingSpent, timeTrackingRemaining } = arrTaskDetail;
    const max = Number(timeTrackingSpent) + Number(timeTrackingRemaining);
    return (
      <Row className="my-4">
        <Col span={24}>
          <p className="text-base font-medium">Time tracking</p>
          <Slider min={1} max={max} value={timeTrackingSpent} />
          <div className="flex justify-between">
            <div>{Number(timeTrackingRemaining)}h logged</div>
            <div>{Number(timeTrackingSpent)}h estimated</div>
          </div>
        </Col>
        <Row className="flex items-center mt-4">
          <Col className="mr-8" span={10}>
            <p
              style={{
                color: "rgb(94, 108, 132)",
              }}
            >
              Time spent (hours)
            </p>
            <input
              type="number"
              min={1}
              name="timeTrackingSpent"
              onChange={async (e) => {
                const formEditTask = {
                  listUserAsign: AssignUser,
                  taskId: arrTaskDetail.taskId,
                  taskName: arrTaskDetail.taskName,
                  description: content,
                  statusId: arrTaskDetail.statusId,
                  originalEstimate: arrTaskDetail.originalEstimate,
                  timeTrackingSpent: e.target.value,
                  timeTrackingRemaining: arrTaskDetail.timeTrackingRemaining,
                  projectId: arrTaskDetail.projectId,
                  typeId: arrTaskDetail.typeId,
                  priorityId: arrTaskDetail.priorityId,
                };
                await dispatch(updateTask(formEditTask));
                await dispatch(getTaskDetail(arrTaskDetail.taskId));
              }}
              className="peer h-10 w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=" "
              value={Number(timeTrackingSpent)}
            />
          </Col>
          <Col span={10}>
            <p
              style={{
                color: "rgb(94, 108, 132)",
              }}
            >
              Time remaining (hours)
            </p>
            <input
              type="number"
              min={1}
              name="timeTrackingRemaining"
              onChange={async (e) => {
                const formEditTask = {
                  listUserAsign: AssignUser,
                  taskId: arrTaskDetail.taskId,
                  taskName: arrTaskDetail.taskName,
                  description: content,
                  statusId: arrTaskDetail.statusId,
                  originalEstimate: arrTaskDetail.originalEstimate,
                  timeTrackingSpent: arrTaskDetail.timeTrackingSpent,
                  timeTrackingRemaining: e.target.value,
                  projectId: arrTaskDetail.projectId,
                  typeId: arrTaskDetail.typeId,
                  priorityId: arrTaskDetail.priorityId,
                };
                await dispatch(updateTask(formEditTask));
                await dispatch(getTaskDetail(arrTaskDetail.taskId));
              }}
              className="peer h-10 w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=" "
              value={Number(timeTrackingRemaining)}
            />
          </Col>
        </Row>
      </Row>
    );
  };
  return (
    <div>
      <Modal
        width={1100}
        open={isModalTask}
        onCancel={() => {
          closeModal();
        }}
        centered
        onOk={async () => {
          const formEditTask = {
            listUserAsign: AssignUser,
            taskId: arrTaskDetail.taskId,
            taskName: arrTaskDetail.taskName,
            description: content,
            statusId: arrTaskDetail.statusId,
            originalEstimate: arrTaskDetail.originalEstimate,
            timeTrackingSpent: arrTaskDetail.timeTrackingSpent,
            timeTrackingRemaining: arrTaskDetail.timeTrackingRemaining,
            projectId: arrTaskDetail.projectId,
            typeId: arrTaskDetail.typeId,
            priorityId: arrTaskDetail.priorityId,
          };
          await dispatch(updateTask(formEditTask));
          await dispatch(getProjectDetail(arrTaskDetail.projectId));
          await dispatch(QuanLyModalAction.closeModalTask());
        }}
        okText={"Edit Task"}
      >
        <div className="text-right mx-10">
          <button
            onClick={() => {
              confirm({
                title:
                  "Bạn có chắc muốn xóa Task Name" + arrTaskDetail.taskName,
                icon: <ExclamationCircleFilled />,

                async onOk() {
                  await dispatch(deleteTask(arrTaskDetail.taskId));
                  await dispatch(getProjectDetail(arrTaskDetail.projectId));
                  await dispatch(QuanLyModalAction.closeModalTask());
                },
                onCancel() {},
              });
            }}
            className="bg-red-500 py-2 px-4 text-white font-medium rounded-lg"
          >
            Delete Task
          </button>
        </div>
        <div className="mb-4">
          <div>
            <label
              htmlFor="taskName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Task Name
            </label>
            <input
              required
              onChange={async (e) => {
                const formEditTask = {
                  listUserAsign: AssignUser,
                  taskId: arrTaskDetail.taskId,
                  taskName: e.target.value,
                  description: content,
                  statusId: arrTaskDetail.statusId,
                  originalEstimate: arrTaskDetail.originalEstimate,
                  timeTrackingSpent: arrTaskDetail.timeTrackingSpent,
                  timeTrackingRemaining: arrTaskDetail.timeTrackingRemaining,
                  projectId: arrTaskDetail.projectId,
                  typeId: arrTaskDetail.typeId,
                  priorityId: arrTaskDetail.priorityId,
                };
                await dispatch(updateTask(formEditTask));
                await dispatch(getTaskDetail(arrTaskDetail.taskId));
              }}
              type="text"
              id="taskName"
              name="taskName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              defaultValue={arrTaskDetail.taskName}
            />
          </div>
        </div>

        <Row>
          <Col span={14}>
            <p className="my-4">Description</p>
            <Editor
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue={arrTaskDetail.description}
              init={{
                height: 300,
                menubar: false,
                plugins: [
                  "a11ychecker",
                  "advlist",
                  "advcode",
                  "advtable",
                  "autolink",
                  "checklist",
                  "export",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "powerpaste",
                  "fullscreen",
                  "formatpainter",
                  "insertdatetime",
                  "media",
                  "table",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | casechange blocks | bold italic backcolor | " +
                  "alignleft aligncenter alignright alignjustify | " +
                  "bullist numlist checklist outdent indent | removeformat | a11ycheck code table help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
              onEditorChange={(content, editor) => {
                setContent(content);
                console.log(content);
              }}
            />
            <button
              onClick={async () => {
                const formEditTask = {
                  listUserAsign: AssignUser,
                  taskId: arrTaskDetail.taskId,
                  taskName: arrTaskDetail.taskName,
                  description: content,
                  statusId: arrTaskDetail.statusId,
                  originalEstimate: arrTaskDetail.originalEstimate,
                  timeTrackingSpent: arrTaskDetail.timeTrackingSpent,
                  timeTrackingRemaining: arrTaskDetail.timeTrackingRemaining,
                  projectId: arrTaskDetail.projectId,
                  typeId: arrTaskDetail.typeId,
                  priorityId: arrTaskDetail.priorityId,
                };
                await dispatch(updateTask(formEditTask));
                await dispatch(getTaskDetail(arrTaskDetail.taskId));
              }}
              className=" mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Save
            </button>
            <div>
              <p className="my-4">Comments</p>
              <Comment />
              <Row>
                <Col span={2}>
                  <Avatar src></Avatar>
                </Col>
              </Row>
            </div>
          </Col>
          <Col className="text-center ml-8" span={8}>
            <div className=" my-6 relative h-10 w-full">
              <select
                name="statusId"
                defaultValue={arrTaskDetail.statusId}
                onChange={async (e) => {
                  const updateStatus = {
                    taskId: arrTaskDetail.taskId,
                    statusId: e.target.value,
                  };

                  try {
                    const res = await quanLyTaskServices.updateStatusTask(
                      updateStatus
                    );
                    console.log(res.data);
                    if (res.data.statusCode === 200) {
                      await dispatch(getProjectDetail(ArrProjectDetail.id));
                    }
                  } catch (error) {
                    return error;
                  }
                }}
                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              >
                {arrStatus?.map((status, index) => {
                  return (
                    <option key={index} value={status.statusId}>
                      {status.statusName}
                    </option>
                  );
                })}
              </select>
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Select a Status
              </label>
            </div>
            <div className="my-6 relative h-10 w-full">
              <select
                value={arrTaskDetail.priorityId}
                name="priorityId"
                onChange={async (e) => {
                  const formEditTask = {
                    listUserAsign: AssignUser,
                    taskId: arrTaskDetail.taskId,
                    taskName: arrTaskDetail.taskName,
                    description: content,
                    statusId: arrTaskDetail.statusId,
                    originalEstimate: arrTaskDetail.originalEstimate,
                    timeTrackingSpent: arrTaskDetail.timeTrackingSpent,
                    timeTrackingRemaining: arrTaskDetail.timeTrackingRemaining,
                    projectId: arrTaskDetail.projectId,
                    typeId: arrTaskDetail.typeId,
                    priorityId: e.target.value,
                  };
                  await dispatch(updateTask(formEditTask));
                  await dispatch(getTaskDetail(arrTaskDetail.taskId));
                  dispatch(getProjectDetail(arrTaskDetail.projectId));
                }}
                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              >
                {arrPriority?.map((priority, index) => {
                  return (
                    <option key={index} value={priority.priorityId}>
                      {priority.priority}
                    </option>
                  );
                })}
              </select>
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Select a priority
              </label>
            </div>

            <Row className="my-6">
              <div className="relative h-10 w-full">
                <input
                  type="number"
                  min={1}
                  name="originalEstimate"
                  Value={arrTaskDetail.originalEstimate}
                  onChange={async (e) => {
                    const formEditTask = {
                      listUserAsign: AssignUser,
                      taskId: arrTaskDetail.taskId,
                      taskName: arrTaskDetail.taskName,
                      description: content,
                      statusId: arrTaskDetail.statusId,
                      originalEstimate: e.target.value,
                      timeTrackingSpent: arrTaskDetail.timeTrackingSpent,
                      timeTrackingRemaining:
                        arrTaskDetail.timeTrackingRemaining,
                      projectId: arrTaskDetail.projectId,
                      typeId: arrTaskDetail.typeId,
                      priorityId: arrTaskDetail.priorityId,
                    };
                    await dispatch(updateTask(formEditTask));
                    await dispatch(getTaskDetail(arrTaskDetail.taskId));
                  }}
                  className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder=" "
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Original Estimate
                </label>
              </div>
            </Row>

            <p className="text-left mb-4">Assigness : </p>
            <Row>
              {arrTaskDetail.assigness?.map((item, i) => {
                return (
                  <div className="flex items-center" key={i}>
                    <Avatar
                      size={30}
                      style={{
                        marginRight: "4px",
                        marginLeft: "10px",
                        marginBottom: "2px",
                      }}
                      src={item.avatar}
                    ></Avatar>
                    {item.name}
                    <DeleteOutlined
                      onClick={() => {
                        const formAssgin = {
                          taskId: arrTaskDetail.taskId,
                          userId: item.id,
                        };
                        confirm({
                          title: "Bạn có chắc muốn xóa User name " + item.name,
                          icon: <ExclamationCircleFilled />,

                          okText: "Yes",
                          okType: "danger",
                          cancelText: "No",
                          async onOk() {
                            await dispatch(removeUserTask(formAssgin));
                            await dispatch(getTaskDetail(arrTaskDetail.taskId));
                            await dispatch(
                              getProjectDetail(arrTaskDetail.projectId)
                            );
                          },
                          onCancel() {
                            console.log("Cancel");
                          },
                        });
                      }}
                      className="text-red-500  cursor-pointer px-2"
                    />
                  </div>
                );
              })}
              <div className="relative mt-4 h-10 w-full">
                <Select
                  name="listUserAsign"
                  mode="multiple"
                  allowClear
                  style={{
                    width: "100%",
                  }}
                  placeholder="List User Assignes"
                  options={ArrProjectDetail.members
                    ?.filter((mem) => {
                      let index = arrTaskDetail.assigness?.findIndex(
                        (us) => us.id === mem.userId
                      );
                      if (index !== -1) {
                        return false;
                      }
                      return true;
                    })
                    .map((item, i) => {
                      return { label: item.name, value: item.userId, key: i };
                    })}
                  optionFilterProp="label"
                  onSelect={async (value) => {
                    AssignUser.push(value);
                    const formEditTask = {
                      listUserAsign: AssignUser,
                      taskId: arrTaskDetail.taskId,
                      taskName: arrTaskDetail.taskName,
                      description: content,
                      statusId: arrTaskDetail.statusId,
                      originalEstimate: arrTaskDetail.originalEstimate,
                      timeTrackingSpent: arrTaskDetail.timeTrackingSpent,
                      timeTrackingRemaining:
                        arrTaskDetail.timeTrackingRemaining,
                      projectId: arrTaskDetail.projectId,
                      typeId: arrTaskDetail.typeId,
                      priorityId: arrTaskDetail.priorityId,
                    };
                    await dispatch(updateTask(formEditTask));
                    await dispatch(getTaskDetail(arrTaskDetail.taskId));
                    await dispatch(getProjectDetail(arrTaskDetail.projectId));
                  }}
                />
              </div>
            </Row>
            {renderTimeTracking()}
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default ModalTask;
