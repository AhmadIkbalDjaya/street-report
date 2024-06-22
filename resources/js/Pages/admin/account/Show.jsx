import React, { useState } from "react";
import BaseLayout from "../../../layouts/BaseLayout";
import Breadcrumb from "../../../components/Breadcrumb";
import { MdDelete } from "react-icons/md";
import ShowRowData from "../../../components/ShowRowData";
import { router, usePage } from "@inertiajs/react";

export default function Show() {
    return (
        <BaseLayout>
            <Breadcrumb
                items={[
                    {
                        name: "Akun Admin",
                        route: "admin.account",
                    },
                    {
                        name: "Detail",
                        route: "admin.account",
                    },
                ]}
            />

            <div className="flex justify-between items-center mb-4">
                <h2 className="font-medium text-xl">Detail Akun</h2>
                <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex items-center gap-x-1"
                >
                    <MdDelete size={16} />
                    Hapus
                </button>
            </div>
        </BaseLayout>
    );
}
