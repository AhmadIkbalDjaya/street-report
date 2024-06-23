import React, { useState, useEffect, useRef } from "react";
import BaseLayout from "../../../layouts/BaseLayout";
import Breadcrumb from "../../../components/Breadcrumb";
import { MdDelete } from "react-icons/md";
import ShowRowData from "../../../components/ShowRowData";
import { Head, router, usePage } from "@inertiajs/react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export default function Show({ report, statuses }) {
    const { url } = usePage().props;
    const [statusId, setStatusId] = useState(report.status_id);
    const [point, setPoint] = useState(report.point);
    const [selectedImage, setSelectedImage] = useState(
        report.media.length > 0 ? report.media[0].path : ""
    );
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng] = useState(report.longitude);
    const [lat] = useState(report.latitude);
    const [zoom] = useState(14);
    const [API_KEY] = useState("59l19GYa3vqXGGIlpAez");

    useEffect(() => {
        if (map.current) return;

        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
            center: [lng, lat],
            zoom: zoom,
        });
        map.current.addControl(new maplibregl.NavigationControl(), "top-right");
        new maplibregl.Marker({ color: "#FF0000" })
            .setLngLat([lng, lat])
            .addTo(map.current);
    }, [API_KEY, lng, lat, zoom]);

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    const handleSetStatus = () => {
        router.post(route("admin.report.set_status", { report: report.id }), {
            status_id: statusId,
        });
    };

    const handleSetPoint = () => {
        router.post(route("admin.report.set_point", { report: report.id }), {
            point: point,
        });
    };
    return (
        <>
            <Head title="Detail Laporan" />

            <BaseLayout>
                <Breadcrumb
                    items={[
                        {
                            name: "Laporan",
                            route: "admin.report",
                        },
                        {
                            name: "Detail",
                            route: "admin.report",
                        },
                    ]}
                />

                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-medium text-xl">Detail Laporan</h2>
                    {/* <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex items-center gap-x-1"
                >
                    <MdDelete size={16} />
                    Hapus
                </button> */}
                </div>
                <div className="block pb-6 px-0 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div className="px-6 py-3 flex justify-between border-b-2 border-solid border-gray-50">
                        <div className="font-medium">{report.name}</div>
                        <div className="flex items-center">
                            {Array.from({ length: report.damage_level }).map(
                                (_, index) => {
                                    return (
                                        <svg
                                            key={index}
                                            className="w-4 h-4 text-yellow-300 ms-1"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 22 20"
                                        >
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                    );
                                }
                            )}
                            {Array.from({
                                length: 5 - report.damage_level,
                            }).map((_, index) => {
                                return (
                                    <svg
                                        key={index}
                                        className="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 22 20"
                                    >
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>
                                );
                            })}
                        </div>
                    </div>
                    <div className="px-6 py-3">
                        <ShowRowData name={"Nama Jalan"} value={report.name} />
                        <ShowRowData
                            name={"Pelapor"}
                            value={report.reporter_name}
                        />
                        <ShowRowData
                            name={"Jenis Laporan"}
                            value={report.type}
                        />
                        {/* <ShowRowData
                        name={"Status Laporan"}
                        value={report.status}
                    /> */}
                        <div className="grid grid-cols-12 gap-x-1 pb-2">
                            <div className="col-span-5 flex justify-between">
                                <p>Status Laporan</p>
                                <p>: </p>
                            </div>
                            <div className="col-span-7 flex flex-wrap gap-x-2">
                                <select
                                    id="countries"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={statusId}
                                    onChange={(e) => {
                                        setStatusId(e.target.value);
                                    }}
                                >
                                    {statuses.map((status, index) => {
                                        return (
                                            <option
                                                key={index}
                                                value={status.id}
                                            >
                                                {status.name}
                                            </option>
                                        );
                                    })}
                                </select>
                                <button
                                    onClick={handleSetStatus}
                                    type="button"
                                    className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Ubah Status
                                </button>
                            </div>
                        </div>
                        <ShowRowData
                            name={"Provinsi"}
                            value={report.province}
                        />
                        <ShowRowData
                            name={"Kabupaten"}
                            value={report.regency}
                        />
                        <ShowRowData
                            name={"Deskripsi"}
                            value={report.description}
                        />
                        <ShowRowData
                            name={"Tanggal Laporan"}
                            value={report.date}
                        />
                        {/* <ShowRowData name={"Berikan Point"} value={"10"} /> */}
                        <div className="grid grid-cols-12 gap-x-1 pb-2">
                            <div className="col-span-5 flex justify-between">
                                <p>Berikan Point</p>
                                <p>: </p>
                            </div>
                            <div className="col-span-7 flex flex-wrap gap-x-2">
                                <input
                                    type="number"
                                    id="first_name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={point}
                                    required
                                    onChange={(e) => {
                                        setPoint(e.target.value);
                                    }}
                                />
                                <button
                                    onClick={handleSetPoint}
                                    type="button"
                                    className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Ubah Status
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <h1 className="font-medium mb-3 text-xl">Lokasi Laporan</h1>
                    <div className="map-wrap relative w-full h-60">
                        <div
                            ref={mapContainer}
                            className="map absolute w-full h-full"
                        />
                        <a
                            href={`https://maps.google.com/?q=${report.latitude},${report.longitude}`}
                            className="absolute bottom-0 flex gap-x-1 bg-white rounded-sm pt-1 pe-1 font-medium text-xs"
                        >
                            <img
                                src={`${url}/images/google-maps.png`}
                                alt=""
                                srcset=""
                                className="w-5"
                            />
                            Gmaps
                        </a>
                    </div>
                </div>

                <div className="mt-6 mb-5">
                    <p className="font-medium text-2xl pb-1">Foto Laporan</p>
                    <div className="grid gap-4">
                        <div className="mx-auto">
                            {selectedImage && (
                                <img
                                    className="w-auto max-h-60 rounded-lg cursor-pointer"
                                    src={selectedImage}
                                    alt=""
                                    // onClick={() => setSelectedImage("")}
                                />
                            )}
                            {!selectedImage && (
                                <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 pb-3">
                                    <div className="grid place-item-center">
                                        <img
                                            className="w-3/12 mx-auto rounded-lg "
                                            src={`${url}/images/no-pictures.png`}
                                            alt=""
                                        />
                                        <h1 className="text-center font-medium text-gray-500">
                                            Gambar Tidak Tersedia
                                        </h1>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="grid grid-cols-5 gap-4">
                            {report.media.map((image, index) => (
                                <div key={index}>
                                    <img
                                        className="h-14 md:h-28 w-full rounded-lg cursor-pointer"
                                        src={`${image.path}`}
                                        alt=""
                                        onClick={() =>
                                            handleImageClick(image.path)
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </BaseLayout>
        </>
    );
}
