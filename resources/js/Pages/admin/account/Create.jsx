import React, { useState } from "react";
import BaseLayout from "../../../layouts/BaseLayout";
import Breadcrumb from "../../../components/Breadcrumb";
import { router, usePage } from "@inertiajs/react";
import LabelRequired from "../../../components/LabelRequired";

export default function Create({ provinces }) {
    const { errors } = usePage().props;
    console.log(errors);
    const [formValues, setFormValues] = useState({
        username: "",
        password: "",
        email: "",
        province_id: "",
    });
    function handleChangeForm(e, index = null) {
        const name = e.target.name;
        const value = e.target.value;
        setFormValues((values) => ({
            ...values,
            [name]: value,
        }));
    }
    function handleSubmitForm(e) {
        router.post(route("admin.account.store"), formValues);
    }
    return (
        <BaseLayout>
            <Breadcrumb
                items={[
                    {
                        name: "Akun",
                        route: "admin.account",
                    },
                    {
                        name: "Tambah",
                        route: "admin.account",
                    },
                ]}
            />
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-medium text-xl">Tambah Akun</h2>
                <button
                    onClick={handleSubmitForm}
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex items-center gap-x-1"
                >
                    Simpan
                </button>
            </div>

            <div className="block p-6 px-0 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="px-6 pb-3 flex justify-between border-b-2 border-solid border-gray-50">
                    <div className="font-medium">Tambah Data</div>
                </div>
                <div className="px-6 py-3">
                    <div className="grid grid-cols-12 gap-x-1 pb-3">
                        <div className="col-span-5 flex justify-between pt-1">
                            <p className="flex gap-x-1">
                                Email <LabelRequired />
                            </p>
                            <p>: </p>
                        </div>
                        <div className="col-span-7">
                            <input
                                type="text"
                                id="first_name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Email"
                                required
                                name="email"
                                value={formValues.email}
                                onChange={handleChangeForm}
                            />
                            {errors.email && (
                                <p class=" text-sm text-red-500 dark:text-gray-400">
                                    {errors.email}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-x-1 pb-3">
                        <div className="col-span-5 flex justify-between pt-1">
                            <p className="flex gap-x-1">
                                Username <LabelRequired />
                            </p>
                            <p>: </p>
                        </div>
                        <div className="col-span-7">
                            <input
                                type="text"
                                id="first_name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Username"
                                required
                                name="username"
                                value={formValues.username}
                                onChange={handleChangeForm}
                            />
                            {errors.username && (
                                <p class=" text-sm text-red-500 dark:text-gray-400">
                                    {errors.username}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-x-1 pb-3">
                        <div className="col-span-5 flex justify-between pt-1">
                            <p className="flex gap-x-1">
                                Password <LabelRequired />
                            </p>
                            <p>: </p>
                        </div>
                        <div className="col-span-7">
                            <input
                                type="text"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Password"
                                required
                                name="password"
                                value={formValues.password}
                                onChange={handleChangeForm}
                            />
                            {errors.password && (
                                <p class=" text-sm text-red-500 dark:text-gray-400">
                                    {errors.password}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-x-1 pb-3">
                        <div className="col-span-5 flex justify-between pt-1">
                            <p className="flex gap-x-1">
                                Provinsi <LabelRequired />
                            </p>
                            <p>: </p>
                        </div>
                        <div className="col-span-7">
                            <select
                                id="countries"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                name="province_id"
                                value={formValues.province_id}
                                defaultValue={""}
                                onChange={handleChangeForm}
                            >
                                <option value={""}>Pilih Provinsi</option>
                                {provinces.data.map((province, index) => {
                                    return (
                                        <option key={index} value={province.id}>
                                            {province.name}
                                        </option>
                                    );
                                })}
                            </select>
                            {errors.province_id && (
                                <p class=" text-sm text-red-500 dark:text-gray-400">
                                    {errors.province_id}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
}
