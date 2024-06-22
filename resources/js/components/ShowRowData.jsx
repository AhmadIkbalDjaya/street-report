import React from "react";

export default function ShowRowData({ name, value }) {
    return (
        <div className="grid grid-cols-12 gap-x-1 pb-2">
            <div className="col-span-5 flex justify-between">
                <p>{name}</p>
                <p>: </p>
            </div>
            <div className="col-span-7">{value}</div>
        </div>
    );
}
