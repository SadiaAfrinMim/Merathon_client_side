import { createBrowserRouter } from "react-router-dom";

import Mainlayout from "../Mainlayout/Mainlayout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Registration from "../Pages/Registration";
import AddMarathon from "../Pages/Addmarathon";
import Marathons from "../Pages/Marathons"
import MarathonDetails from "../Pages/MarathonDetails";

import Mymerathonlist from "../Pages/Mymerathonlist";

import Mylist from "../Pages/Mylist";
import Update from "../Pages/Update";
import Dashboard from "../Pages/Dashboard";
// import Login from "../Pages/Login";
// import Registration from "../Pages/Registration";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Mainlayout></Mainlayout>,
      children:[{
        path: '/',
        element:<Home></Home>


      },
      {
        path:'/marathons',
        element:<Marathons></Marathons>

      },
      {
        path:'/marathon/:id',
        element:<MarathonDetails></MarathonDetails>

      },
      {
        path:'/Add-Marathons',
        element:<AddMarathon></AddMarathon>
      },
      {
        path:'/dashboard',
        element:<Dashboard></Dashboard>
      },
      {
        path:'/My-Marathons',
        element:<Mymerathonlist></Mymerathonlist>
      },
      {
        path:'/update/:id',
        element:<Update></Update>
      },
      {
        path:'/My-list',
        element:<Mylist></Mylist>

      },
      
    {
        path:'/login',
        element:<Login></Login>
    },
    { 
        path:'/register',
        element:<Registration></Registration>

    }
    ]
    },

  ]);


  export default router