import {BrowserRouter } from "react-router-dom"

import './App.css';
import Router from "./router";
import DrawerCyberJira from "./Components/DrawerCyberJira/DrawerCyberJira";
import DrawerTask from "./Components/DrawerTask/DrawerTask";
import ModalTask from "./Components/ModalTask/ModalTask";
import Loading from "./Components/Loading/loading"

function App() {
  return (
    
   
   <BrowserRouter>
   <Router />
   <DrawerCyberJira/>
    <DrawerTask/>
    <ModalTask/>
    <Loading/>
   </BrowserRouter>
   
  );
}

export default App;
