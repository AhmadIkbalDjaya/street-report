import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function BaseLayout(props) {
    const { children } = props;
    return (
        <>
            <Navbar />
            <Sidebar />
            <div className="p-4 sm:ml-64 bg-[#F5F6FA] min-h-[100vh]">
                <div className="p-4 dark:border-gray-700 mt-14">{children}</div>
            </div>
        </>
    );
}
