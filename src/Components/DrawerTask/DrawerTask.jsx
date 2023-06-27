import React, { useEffect, useRef, useState } from "react";
import { Slider, Col, Drawer, Row, Select, InputNumber } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { QuanLyModalAction } from "../../store/QuanLyModal/slice";
import { Editor } from "@tinymce/tinymce-react";

import {
  createTask,
  getAllPriority,
  getAllStatus,
  getAllTaskType,
  getUserTask,
} from "../../store/QuanLyTask/thunkAction";
import { useFormik } from "formik";
import { getUser } from "../../store/QuanlyUser/thunkAction";
import {  getProjectDetail } from "../../store/QuanLyProject/thunkAction";


const DrawerTask = () => {
  const { isDrawerTask } = useSelector((state) => state.QuanLyModal);
  const { ArrProjectManagement,ArrProjectDetail  } = useSelector((state) => state.QuanLyProject);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllStatus());
    dispatch(getAllTaskType());
    dispatch(getAllPriority());
    dispatch(getUser(""));
  }, [dispatch]);
  const { arrStatus, arrTaskType, arrPriority , arrValueCreateTask,arrGetUserTask } = useSelector(
    (state) => state.QuanLyTask
  );

  const CloseDrawerTask = () => {
    dispatch(QuanLyModalAction.CloseDrawerTask());
  };
  const editorRef = useRef(null);
  const [timeTracking, setTimeTracking] = useState({
    timeTrackingSpent:0,
    timeTrackingRemaining:0,
  });

  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {
      listUserAsign: "",
      description: "",
      taskName: "",
      statusId: arrValueCreateTask?.statusId,
      originalEstimate: arrValueCreateTask?.originalEstimate,
      timeTrackingSpent: arrValueCreateTask?.timeTrackingSpent,
      timeTrackingRemaining:arrValueCreateTask?.timeTrackingRemaining,
      projectId: 0,
      typeId: arrValueCreateTask?.typeId,
      priorityId: arrValueCreateTask?.priorityId,
    },
    onSubmit: async (values) => {
    await dispatch(createTask(values))
    await  dispatch(getProjectDetail(ArrProjectDetail.id))
    await dispatch(QuanLyModalAction.CloseDrawerTask())
    },
  });
  return (
    <>
      <Drawer
        title="Create a New Task"
        width={720}
        onClose={CloseDrawerTask}
        open={isDrawerTask}
        bodyStyle={{
          paddingBottom: 80,
        }}
      >
        <form onSubmit={formik.handleSubmit} layout="vertical">
          <Row gutter={16}>
            <Col span={24}>
              <div className="relative h-10 w-full min-w-[200px]">
                <select
                  name="projectId"
                  onChange={
                    (e)=>{
                      let {value} = e.target
                      dispatch(getUserTask(value))
                      formik.setFieldValue('projectId',e.target.value)
                    }
                  }
                  className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                >
                  {ArrProjectManagement?.map((project, index) => {
                    return (
                      <option key={index} value={project.id}>
                        {project.projectName}
                      </option>
                    );
                  })}
                </select>
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Select a Project
                </label>
              </div>
            </Col>
          </Row>
          <Row className="my-4" gutter={16}>
            <Col span={24}>
              <div className="w-full">
                <div className="relative h-10 w-full">
                  <input
                    name="taskName"
                    onChange={formik.handleChange}
                    className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder=""
                  />
                  <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Task Name
                  </label>
                </div>
              </div>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={6}>
              <div className="relative h-10 w-full">
                <input
                  type="number"
                  min={1}
                  name="originalEstimate"
                  onChange={formik.handleChange}
                  className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder=" "
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Original Estimate
                </label>
              </div>
            </Col>
            <Col span={6}>
              <div className="relative h-10 w-full">
                <select
                  name="statusId"
                  onChange={formik.handleChange}
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
            </Col>
            <Col span={6}>
              <div className="relative h-10 w-full">
                <select
                  name="priorityId"
                  onChange={formik.handleChange}
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
            </Col>
            <Col span={6}>
              <div className="relative h-10 w-full">
                <select
                  name="typeId"
                  onChange={formik.handleChange}
                  className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                >
                  {arrTaskType?.map((type, index) => {
                    return (
                      <option key={index} value={type.id}>
                        {type.taskType}
                      </option>
                    );
                  })}
                </select>
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Select a type
                </label>
              </div>
            </Col>
          </Row>
          <Row className="my-4" gutter={16}>
            <Col span={24}>
              <div className="relative h-10 w-full">
                <Select
                  name="listUserAsign"
                  mode="multiple"
                  allowClear
                  style={{
                    width: "100%",
                  }}
                  placeholder="Select Users assign"
                  onChange={(values) => {
                    formik.setFieldValue("listUserAsign", values);
                  }}
                  options={arrGetUserTask?.map((item, i) => {
                    return { label: item.name, value: item.userId, key: i };
                  })}
                  optionFilterProp="label"
                />
              </div>
            </Col>
          </Row>
          <Row className="flex items-center" gutter={16}>
            
            <Col span={12}>
            <p className="text-base font-medium">Time tracking</p>
              <Slider
                min={1}
                max={Number(timeTracking.timeTrackingSpent)+Number(timeTracking.timeTrackingRemaining)}
                
                value={timeTracking.timeTrackingSpent}
                
              />
              <div className="flex justify-between">
              <div>{timeTracking.timeTrackingSpent}h logged</div>
              <div >{timeTracking.timeTrackingRemaining}h estimated</div>
              </div>
             
            </Col>
            <Col span={6}>
              <p style={{
                color:'rgb(94, 108, 132)',
              }}>Time spent (hours)</p>
            <input
                  type="number"
                  min={1}
                  name="timeTrackingSpent"
                  onChange={(e)=>{
                    setTimeTracking({
                      ...timeTracking,
                      timeTrackingSpent:e.target.value
                    })
                    formik.setFieldValue('timeTrackingSpent',e.target.value)
                  }}
                  className="peer h-10 w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder=" "

                />
                
            </Col>
            <Col span={6}>
              <p style={{
                color:'rgb(94, 108, 132)',
              }}>Time remaining (hours) </p>
            <input
                  type="number"
                  min={1}
                  name="timeTrackingRemaining"
                  onChange={(e)=>{
                    setTimeTracking({
                      ...timeTracking,
                      timeTrackingRemaining:e.target.value
                    })
                    formik.setFieldValue('timeTrackingRemaining',e.target.value * 1)
                  }}
                  className="peer h-10 w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder=" "

                />
                
            </Col>
          </Row>
          <Row className="mt-4" gutter={16}>
            <Col span={24}>
              <Editor
                apiKey="your-api-key"
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue=""
                name="description"
                init={{
                  height: 300,
                  menubar: false,
                  plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                  ],
                  toolbar:
                    "undo redo | blocks | " +
                    "bold italic forecolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; }",
                }}
                onEditorChange={(content, editor) => {
                  formik.setFieldValue("description", content);
                }}
              />
          
            </Col>
          </Row>

          <button type="submit" className="mt-10  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Create Task</button>
        </form>
      </Drawer>
    </>
  );
};
export default DrawerTask;
