import React from "react";
import BaseLayout from "../../../layouts/BaseLayout";
import { MdOutlineReport } from "react-icons/md";
import { IoMdEye } from "react-icons/io";

export default function Index({ reports, counts }) {
    console.log(counts);
    return (
        <BaseLayout>
            <h1 className="font-medium text-2xl">Dashboard</h1>
            <div className="grid grid-cols-12 gap-x-2 my-5">
                <div className="col-span-3 p-3 cursor-pointer bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <div className="flex justify-between items-start">
                        <div className="">
                            <div className="font-medium text-gray-600">
                                Laporan Baru
                            </div>
                            <div className="font-medium text-xl">
                                {counts.new_report_count}
                            </div>
                        </div>
                        <div className="bg-amber-200 rounded-lg">
                            <MdOutlineReport
                                size={40}
                                className="text-amber-600"
                            />
                        </div>
                    </div>
                    <a
                        href={route("admin.report")}
                        className="text-blue-500 mt-3 text-xs text-gray-700 font-medium"
                    >
                        Lihat selengkapnya
                    </a>
                </div>
                <div className="col-span-3 p-3 cursor-pointer bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <div className="flex justify-between items-start">
                        <div className="">
                            <div className="font-medium text-gray-600">
                                Laporan Jalanan
                            </div>
                            <div className="font-medium text-xl">{counts.road_report_count}</div>
                        </div>
                        <div className="bg-blue-200 rounded-lg">
                            <MdOutlineReport
                                size={40}
                                className="text-blue-600"
                            />
                        </div>
                    </div>
                    <a
                        href={route("admin.report")}
                        className="text-blue-500 mt-3 text-xs text-gray-700 font-medium"
                    >
                        Lihat selengkapnya
                    </a>
                </div>
                <div className="col-span-3 p-3 cursor-pointer bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <div className="flex justify-between items-start">
                        <div className="">
                            <div className="font-medium text-gray-600">
                                Laporan Trotoar
                            </div>
                            <div className="font-medium text-xl">{counts.troto_report_count}</div>
                        </div>
                        <div className="bg-green-200 rounded-lg">
                            <MdOutlineReport
                                size={40}
                                className="text-green-600"
                            />
                        </div>
                    </div>
                    <a
                        href={route("admin.report")}
                        className="text-blue-500 mt-3 text-xs text-gray-700 font-medium"
                    >
                        Lihat selengkapnya
                    </a>
                </div>
                <div className="col-span-3 p-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <div className="flex justify-between items-start">
                        <div className="">
                            <div className="font-medium text-gray-600">
                                Laporan Rambu
                            </div>
                            <div className="font-medium text-xl">{counts.rambu_report_count}</div>
                        </div>
                        <div className="bg-red-200 rounded-lg">
                            <MdOutlineReport
                                size={40}
                                className="text-red-600"
                            />
                        </div>
                    </div>
                    <a
                        href={route("admin.report")}
                        className="text-blue-500 mt-3 text-xs text-gray-700 font-medium"
                    >
                        Lihat selengkapnya
                    </a>
                </div>
            </div>

            <div className="p-3 cursor-pointer bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <p className="font-medium text-lg">Laporan Terbaru</p>
                <div className="overflow-x-auto py-2">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
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
                                                href={route(
                                                    "admin.report.show",
                                                    { report: report.id }
                                                )}
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
                    <div className="flex justify-end text-blue-500 font-medium pt-3">
                        <a href={route("admin.report")} className="">
                            Lihat Lainnya {">"}
                        </a>
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
}
