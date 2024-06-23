import React, { useRef, useState } from "react";
import BaseLayout from "../../../layouts/BaseLayout";
import Breadcrumb from "../../../components/Breadcrumb";
import pickBy from "lodash.pickby";
import { router } from "@inertiajs/react";
import { IoMdEye } from "react-icons/io";

export default function Report({ reports, statuses, meta }) {
    const search = useRef(meta.search);
    const page = useRef(meta.page);
    // const [statusFilter, setStatusFilter] = useState([]);
    const statusFilter = useRef([]);
    const handleStatusFilterChange = (statusId) => {
        if (statusFilter.current.includes(statusId)) {
            statusFilter.current = statusFilter.current.filter(
                (id) => id !== statusId
            );
        } else {
            statusFilter.current = [...statusFilter.current, statusId];
        }
        getData();
    };

    const handleChangeSearch = (e) => {
        search.current = e.target.value;
        if (meta.search == "" && search.current != "") {
            page.current = 1;
        }
        getData();
    };
    const handleChangePage = (e, value) => {
        if (value >= 0 && value <= meta.total_page) {
            page.current = value;
            getData();
        }
    };

    const getData = () => {
        // setloading(true);
        router.get(
            route(route().current()),
            pickBy({
                search: search.current,
                page: page.current != 1 ? page.current : undefined,
                statusFilter: statusFilter.current.length
                    ? statusFilter.current
                    : undefined,
            }),
            {
                preserveScroll: true,
                preserveState: true,
                // onFinish: () => setloading(false),
            }
        );
    };
    if (page.current > meta.total_page) {
        page.current = meta.total_page;
        getData();
    }
    return (
        <BaseLayout>
            <Breadcrumb
                items={[
                    {
                        name: "Laporan",
                        route: "admin.report",
                    },
                ]}
            />

            <p className="text-xl font-medium">Laporan</p>

            <div className="mt-3 bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                    <div className="w-full md:w-1/2">
                        <form className="flex items-center">
                            <label htmlFor="simple-search" className="sr-only">
                                Search
                            </label>
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg
                                        aria-hidden="true"
                                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    id="simple-search"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Search"
                                    name="search"
                                    defaultValue={""}
                                    onChange={handleChangeSearch}
                                />
                            </div>
                        </form>
                    </div>
                    <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                        <div className="flex items-center space-x-3 w-full md:w-auto">
                            {/* <button
                                id="actionsDropdownButton"
                                data-dropdown-toggle="actionsDropdown"
                                className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                type="button"
                            >
                                <svg
                                    className="-ml-1 mr-1.5 w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                >
                                    <path
                                        clipRule="evenodd"
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    />
                                </svg>
                                Actions
                            </button>
                            <div
                                id="actionsDropdown"
                                className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                            >
                                <ul
                                    className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                    aria-labelledby="actionsDropdownButton"
                                >
                                    <li>
                                        <a
                                            href="#"
                                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            Mass Edit
                                        </a>
                                    </li>
                                </ul>
                                <div className="py-1">
                                    <a
                                        href="#"
                                        className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                    >
                                        Delete all
                                    </a>
                                </div>
                            </div> */}
                            <button
                                id="filterDropdownButton"
                                data-dropdown-toggle="filterDropdown"
                                className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                type="button"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                    className="h-4 w-4 mr-2 text-gray-400"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Filter
                                <svg
                                    className="-mr-1 ml-1.5 w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                >
                                    <path
                                        clipRule="evenodd"
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    />
                                </svg>
                            </button>
                            <div
                                id="filterDropdown"
                                className="z-10 hidden w-48 p-3 bg-white rounded-lg shadow dark:bg-gray-700"
                            >
                                <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                                    Pilih Status
                                </h6>
                                <ul
                                    className="space-y-2 text-sm"
                                    aria-labelledby="filterDropdownButton"
                                >
                                    {statuses.data.map((status, index) => {
                                        return (
                                            <li
                                                key={index}
                                                className="flex items-center"
                                            >
                                                <input
                                                    id={status.id}
                                                    type="checkbox"
                                                    value={status.id}
                                                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                    checked={statusFilter.current.includes(
                                                        status.id
                                                    )}
                                                    onChange={() =>
                                                        handleStatusFilterChange(
                                                            status.id
                                                        )
                                                    }
                                                />
                                                <label
                                                    htmlFor={status.id}
                                                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                                                >
                                                    {status.name} (
                                                    {status.report_count})
                                                </label>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="p-4">
                                    <div className="flex items-center">
                                        <input
                                            id="checkbox-all-search"
                                            type="checkbox"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label
                                            htmlFor="checkbox-all-search"
                                            className="sr-only"
                                        >
                                            checkbox
                                        </label>
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Nama Lokasi
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Nama Pelapor
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Jenis
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Tanggal
                                </th>
                                <th scope="col" className="px-3 py-3"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.data.map((report, index) => {
                                return (
                                    <tr
                                        key={index}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                    >
                                        <td className="w-4 p-4">
                                            <div className="flex items-center">
                                                <input
                                                    id="checkbox-table-search-1"
                                                    type="checkbox"
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                />
                                                <label
                                                    htmlFor="checkbox-table-search-1"
                                                    className="sr-only"
                                                >
                                                    checkbox
                                                </label>
                                            </div>
                                        </td>
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {report.location_name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {report.reporter_name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {report.report_type}
                                        </td>
                                        <td className="px-6 py-4">
                                            {report.report_status}
                                        </td>
                                        <td className="px-6 py-4">
                                            {report.date}
                                        </td>
                                        <td className="px-3 py-4">
                                            <a
                                                href={route("admin.report.show", {report: report.id})}
                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                            >
                                                <IoMdEye size={20} />
                                            </a>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <nav
                className="flex items-center flex-column flex-wrap md:flex-row justify-center md:justify-between pt-3 px-0 pb-3"
                aria-label="Table navigation"
            >
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full hidden md:inline md:w-auto">
                    Showing{" "}
                    <span className="font-semibold text-gray-900 dark:text-white">
                        {meta.start_item}-{meta.end_item}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-gray-900 dark:text-white">
                        {meta.total_item}
                    </span>
                </span>
                <ul className="flex items-center -space-x-px h-8 text-sm">
                    <li>
                        <span
                            onClick={(e) => {
                                handleChangePage(e, page.current - 1);
                            }}
                            className="cursor-pointer flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            <span className="sr-only">Previous</span>
                            <svg
                                className="w-2.5 h-2.5 rtl:rotate-180"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 6 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 1 1 5l4 4"
                                />
                            </svg>
                        </span>
                    </li>
                    {Array.from(
                        { length: meta.total_page },
                        (_, i) => i + 1
                    ).map((pageItem, index) => {
                        return (
                            <li key={index}>
                                <span
                                    onClick={(e) => {
                                        handleChangePage(e, pageItem);
                                    }}
                                    className={
                                        pageItem == page.current
                                            ? "cursor-pointer z-10 flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                                            : "cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    }
                                >
                                    {pageItem}
                                </span>
                            </li>
                        );
                    })}
                    <li>
                        <span
                            onClick={(e) => {
                                handleChangePage(e, page.current + 1);
                            }}
                            className="cursor-pointer flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            <span className="sr-only">Next</span>
                            <svg
                                className="w-5 h-5"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </span>
                    </li>
                </ul>
            </nav>
        </BaseLayout>
    );
}
