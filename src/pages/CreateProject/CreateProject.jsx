import React, { useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Breadcrumb } from "antd";
import { ProjectCategory } from "../../store/QuanLyProject/thunkAction";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { quanLyProjectServices } from "../../services/quanLyProject.services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// import { useFormik } from "formik";
// import * as Yup from "yup";
const CreateProject = () => {
  // UseForm
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  // Kéo state Từ QuanLyProject
  const { ArrProjectCategory } = useSelector((state) => state.QuanLyProject);
  // console.log('projectCategory',ArrProjectCategory)

  // Editor
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  // Call API
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ProjectCategory());
  }, [dispatch]);
  const Navigate = useNavigate();

  return (
    <div>
      <Breadcrumb
        style={{
          color: "rgb(94, 108, 132)",
          fontSize: "14px",
        }}
      >
        <Breadcrumb.Item>Cyber Jira Clone</Breadcrumb.Item>
        <Breadcrumb.Item>Create Project</Breadcrumb.Item>
      </Breadcrumb>
      <div className="mb-4">
        <h1 className="mt-3 text-2xl font-medium ">Create Project</h1>
      </div>

      <form
        onSubmit={handleSubmit(async (values) => {
          console.log(values);
          try {
            const res = await quanLyProjectServices.CreateProject(values);
            console.log(res.data);
            if (res.data.statusCode === 200) {
              toast.success("Bạn đã tạo thành công project");
              Navigate("/projectManagement");
            }
          } catch (error) {
            toast.error("Tên Project đã tồn tại !");
          }
        })}
      >
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            {...register("projectName", {
              required: "Bạn không được để trống !",
              pattern: {
                value:
                  /[^a-z0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/u,
                message: "Bạn phải nhập vào là chữ !",
              },
            })}
            id="projectName"
            className="block py-2.5 px-0 w-full text-sm text-black  font-medium bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="projectName"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Project Name
          </label>
          <p className="text-red-500 my-2">{errors?.projectName?.message}</p>
        </div>

        <div className="relative z-0 w-full mb-6 group">
          <p className="mb-2 text-sm text-gray-500">Description</p>
          <Editor
            {...register("description", {
              required: "Bạn không được để trống !",
            })}
            apiKey="your-api-key"
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue=""
            init={{
              height: 250,
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
              setValue("description", content);
            }}
          />
          <p className="text-red-500 my-2">{errors?.description?.message}</p>
        </div>

        <div className="mb-6">
          <label
            htmlFor="categoryId"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select an option
          </label>
          <select
            id="categoryId"
            {...register("categoryId", {
              required: "Bạn cần chọn dự án !",
            })}
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Choose a project</option>
            {ArrProjectCategory.map((category, index) => {
              return (
                <option key={index} value={category.id}>
                  {category.projectCategoryName}
                </option>
              );
            })}
          </select>
          <p className="text-red-500 my-2">{errors?.categoryId?.message}</p>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            {...register("alias", {
              required: "Bạn không được để trống !",
              pattern: {
                value: /^[a-z A-Z]+$/,
                message: "Bạn phải nhập vào là chữ !",
              },
            })}
            id="alias"
            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="alias"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Alias
          </label>
          <p className="text-red-500 my-2">{errors?.alias?.message}</p>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Create Project
        </button>
      </form>
    </div>
  );
};

export default CreateProject;
