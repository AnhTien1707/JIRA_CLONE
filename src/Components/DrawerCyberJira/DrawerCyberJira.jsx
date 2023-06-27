import { Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { QuanLyModalAction } from "../../store/QuanLyModal/slice";
import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useRef } from "react";
import { useFormik } from "formik";
import { AllProject, ProjectCategory, UpdateProject } from "../../store/QuanLyProject/thunkAction";
import {useNavigate } from "react-router-dom";
const DrawerCyberJira = () => {
  const { InfoProject, ArrProjectCategory } = useSelector(
    (state) => state.QuanLyProject
  );
  const dispatch = useDispatch();
    const navigate = useNavigate()
  // Formik
 
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id : InfoProject?.id,
      projectName: InfoProject?.projectName,
      alias: InfoProject?.alias,
      description: InfoProject?.description,
      categoryId: InfoProject?.projectCategory?.id,
     
    },

    onSubmit: async (values) => {
      await dispatch(UpdateProject(values));
      await dispatch(AllProject())
      await dispatch(QuanLyModalAction.closeModal());
       navigate("/projectManagement")
    },
  });
  // Editor
  const editorRef = useRef(null);
  const { isModal } = useSelector((state) => state.QuanLyModal);



  useEffect(() => {
    dispatch(ProjectCategory());
    dispatch(AllProject())
  }, [dispatch]);
  const onClose = () => {
    dispatch(QuanLyModalAction.closeModal());
  };
  return (
    <>
      <Drawer
        title="Edit Project"
        width={600}
        onClose={onClose}
        open={isModal}
        bodyStyle={{
          paddingBottom: 80,
        }}
      >
        <form onSubmit={formik.handleSubmit}>
        <div className="relative z-0 w-full mb-6 group">
            <input
              
              value={formik.values.id}
              type="text"
              id="id"
              name="id"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              disabled
            />
            <label
              htmlFor="id"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              ID
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              onChange={formik.handleChange}
              value={formik.values.projectName}
              type="text"
              id="projectName"
              name="projectName"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="projectName"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Project Name
            </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <p className="mb-2 text-sm text-gray-500">Description</p>
            <Editor
              apiKey="your-api-key"
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue={formik.values.description}
              name="description"
              onChange={formik.handleChange}
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
              onEditorChange={(content, editor) => {}}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="categoryId"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select an option
            </label>
            <select
              value={formik.values.projectCategory}
              onChange={formik.handleChange}
              id="categoryId"
              name="categoryId"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {/* <option value="">Choose a project</option> */}
              {ArrProjectCategory.map((category, index) => {
                return (
                  <option key={index} value={category.id}>
                    {category.projectCategoryName}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              onChange={formik.handleChange}
              value={formik.values.alias}
              type="text"
              name="alias"
              id="alias"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="alias"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Alias
            </label>
          </div>

          <div>
            <button
              type="submit"
              className="focus:outline-none text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-8 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Edit
            </button>
          </div>
        </form>
      </Drawer>
    </>
  );
};
export default DrawerCyberJira;
