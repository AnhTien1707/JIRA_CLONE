import { useRoutes } from "react-router-dom";

import Login from "../pages/Login/login";
import Register from "../pages/Register/Register";

import ProjectManagement from "../pages/ProjectManagement/ProjectManagement";
import CyberJira from "../Layouts/CyberJira";
import CreateProject from "../pages/CreateProject/CreateProject";
import MyProfile from "../pages/MyProfile/MyProfile";
import ProjectDetail from "../pages/ProjectDetail/ProjectDetail";




const Router = () => {
  const elements = useRoutes([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path : '/',
      element: <CyberJira/>,
      children : [
        {
          path:'/',
          element:<ProjectManagement/>,
        },
        {
          path:'/projectManagement',
          element:<ProjectManagement/>,
        },
        {
          path:'/createProject',
          element:<CreateProject/>
        },
        {
          path:'/myProfile',
          element:<MyProfile/>,
        },
        {
          path:"/projectDetail/:id",
          element:<ProjectDetail/>
        }
      ]
    }
  ]);
  return elements;
};
export default Router;
