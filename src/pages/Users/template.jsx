import React from "react";
import Sidebar from "../../components/organisms/Sidebar";
import Navbar from "../../components/organisms/Navbar";
import Breadcrumb from "../../components/molecules/Breadcrumb";
import { Link } from "react-router-dom";

export default function TemplateCategory({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full ">
        <Navbar />
        <div className="px-5 pt-5 ">
          <div className="bg-white p-5 shadow-card  rounded-lg ">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
