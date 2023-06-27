import { Avatar, Breadcrumb, Input } from "antd";
import React, { useEffect } from "react";
import "./StyleProjectDetail.css";
import { useDispatch, useSelector } from "react-redux";
import { QuanLyModalAction } from "../../store/QuanLyModal/slice";
import { getTaskDetail } from "../../store/QuanLyTask/thunkAction";
import { useParams } from "react-router-dom";
import { getProjectDetail } from "../../store/QuanLyProject/thunkAction";

const ProjectDetail = () => {
  const { Search } = Input;
  const { ArrProjectDetail } = useSelector((state) => state.QuanLyProject);
  const dispatch = useDispatch();
  const param = useParams();

  useEffect(() => {
    dispatch(getProjectDetail(param.id));
  }, []);
  return (
    <div>
      <Breadcrumb
        style={{
          color: "rgb(94, 108, 132)",
          fontSize: "14px",
        }}
      >
        <Breadcrumb.Item>Cyber Jira Clone</Breadcrumb.Item>
        <Breadcrumb.Item>Project Detail</Breadcrumb.Item>
        <Breadcrumb.Item>{ArrProjectDetail.projectName}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="mb-4">
        <p className="mt-4">{ArrProjectDetail.projectName}</p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Search
            placeholder="input search text"
            style={{
              width: 200,
            }}
            className="mr-6"
          />
          {ArrProjectDetail.members?.map((member, index) => {
            return (
              <Avatar className="" key={index} src={member.avatar}></Avatar>
            );
          })}
        </div>
        <div>
          <button
            onClick={() => {
              dispatch(QuanLyModalAction.openDrawerTask());
            }}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Create Task
          </button>
        </div>
      </div>

      <div className="board">
        <div className="lanes">
          {ArrProjectDetail.lstTask?.map((task, index) => {
            return (
              <div key={index} className="swim-lane" id="todo-lane">
                <h3 className="heading">{task.statusName}</h3>
                {task.lstTaskDeTail.map((taskDetail, index) => {
                  return (
                    <div
                      className="bg-white"
                      style={{
                        boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.15)",
                        padding: "12px",
                        borderRadius: "8px",
                      }}
                      onClick={() => {
                        dispatch(getTaskDetail(taskDetail.taskId));
                        dispatch(QuanLyModalAction.openModalTask());
                      }}
                      key={index}
                    >
                      <p className="task" draggable="true">
                        {taskDetail.taskName}
                      </p>
                      <div className="mt-4 flex justify-between items-center  ">
                        <p>{taskDetail.priorityTask.priority}</p>
                        <div>
                          {taskDetail.assigness?.map((assigness, index) => {
                            return (
                              <Avatar
                                size={25}
                                key={index}
                                src={assigness.avatar}
                              ></Avatar>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
