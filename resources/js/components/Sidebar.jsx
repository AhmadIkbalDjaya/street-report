import React from "react";
import { BsMailbox2 } from "react-icons/bs";
import { TbLayoutDashboardFilled } from "react-icons/tb";

export default function Sidebar() {
    return (
        <aside
            id="logo-sidebar"
            className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white sm:translate-x-0 dark:bg-gray-800"
            aria-label="Sidebar"
        >
            <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                <ul className="space-y-2 font-medium">
                    <SidebarItem
                        name="Dashboard"
                        route_name="admin.home"
                        icon={
                            <TbLayoutDashboardFilled className="w-full h-full" />
                        }
                    />
                    <SidebarItem
                        name="Laporan"
                        route_name="admin.report"
                        icon={<BsMailbox2 className="w-full h-full" />}
                        count={3}
                    />
                    <SidebarItem
                        name="Akun Admin"
                        route_name="admin.account"
                        icon={
                            <TbLayoutDashboardFilled className="w-full h-full" />
                        }
                    />
                </ul>
            </div>
        </aside>
    );
}

const SidebarItem = ({
    route_name = "admin.home",
    name = "Dashboard",
    icon,
    count = 0,
}) => {
    return (
        <li>
            <a
                href={route(route_name)}
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                    route().current(`${route_name}*`) && "bg-gray-100"
                }`}
            >
                <span
                    className={`flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white ${
                        route().current(`${route_name}*`) && "text-gray-900"
                    }`}
                >
                    {icon}
                </span>
                <span className="flex-1 ms-3 whitespace-nowrap">{name}</span>
                {count > 0 && (
                    <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                        {count}
                    </span>
                )}
            </a>
        </li>
    );
};
