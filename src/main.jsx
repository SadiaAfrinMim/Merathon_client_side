import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {

  RouterProvider,
} from "react-router-dom";
import "./index.css";
import router from "./Router/router";
import AuthProvider from "./Authprovider/AuthProvider";
import { Typewriter } from "react-simple-typewriter";
import { Toaster } from "react-hot-toast";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
   <AuthProvider>
   <RouterProvider router={router} />
   <Toaster></Toaster>
   <Typewriter></Typewriter>
   </AuthProvider>
  </React.StrictMode>
);
