import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCommentTask,
  getTaskDetail,
  postCommentTask,
} from "../store/QuanLyTask/thunkAction";
import { Avatar } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";
const { confirm } = Modal;
const Comment = () => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const { arrTaskDetail } = useSelector((state) => state.QuanLyTask);
  console.log("arr", arrTaskDetail);

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="max-w-2xl mx-auto ">
        <form className="mb-6" action="#">
          <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              id="comment"
              rows={6}
              className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
              placeholder="Write a comment..."
              required
              defaultValue={""}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
          </div>
          <button
            onClick={async () => {
              const postComment = {
                taskId: arrTaskDetail.taskId,
                contentComment: comment,
              };
              await dispatch(postCommentTask(postComment));
              await dispatch(getTaskDetail(arrTaskDetail.taskId));
            }}
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white  bg-sky-500 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          >
            Post comment
          </button>
        </form>
        {arrTaskDetail.lstComment?.map((comment, index) => {
          return (
            <article
              key={index}
              className="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900"
            >
              <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                    <Avatar src={comment.avatar} />
                  </p>
                  <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                    {comment.name}
                  </p>
                </div>
                <div>
                  <DeleteOutlined
                    onClick={() => {
                      confirm({
                        title: "Bạn có chắc xóa comment này ?",
                        icon: <ExclamationCircleFilled />,

                        async onOk() {
                          await dispatch(deleteCommentTask(comment.id));
                          await dispatch(getTaskDetail(arrTaskDetail.taskId));
                        },
                        onCancel() {},
                      });
                    }}
                    className="text-base text-red-500 cursor-pointer"
                  />
                  <EditOutlined
                    onClick={() => {
                      toast.error("Không thể sửa!");
                    }}
                    className="text-base text-green-500 ml-2 cursor-pointer"
                  />
                </div>
              </footer>
              <p className="text-gray-500 dark:text-gray-400 mt-4">
                {comment.commentContent}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Comment;
