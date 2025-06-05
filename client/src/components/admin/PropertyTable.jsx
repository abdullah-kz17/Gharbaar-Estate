import React from "react";

const PropertyTable = ({ headers, rows }) => {
    return (
        <div className="overflow-x-auto rounded-xl shadow-xl border border-purple-300 bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 p-4">
            <table className="min-w-full table-auto border-collapse">
                <thead>
                <tr className="bg-gradient-to-r from-purple-600 via-indigo-700 to-pink-600 text-white text-sm uppercase tracking-widest">
                    {headers.map((header, idx) => (
                        <th
                            key={idx}
                            className="py-3 px-6 text-left select-none whitespace-nowrap"
                            style={{ userSelect: "none" }}
                        >
                            {header}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {rows.length === 0 ? (
                    <tr>
                        <td
                            colSpan={headers.length}
                            className="py-10 text-center text-purple-400 font-semibold italic"
                        >
                            No data to display
                        </td>
                    </tr>
                ) : (
                    rows.map((row, idx) => {
                        const isEven = idx % 2 === 0;
                        return (
                            <tr
                                key={idx}
                                className={`transition-all duration-300 cursor-pointer ${
                                    isEven
                                        ? "bg-gradient-to-r from-white to-purple-50"
                                        : "bg-gradient-to-r from-purple-50 to-white"
                                } hover:from-pink-100 hover:via-purple-100 hover:to-indigo-100 hover:shadow-md rounded-lg`}
                                style={{ borderRadius: "0.75rem" }}
                            >
                                {row.map((cell, cidx) => (
                                    <td
                                        key={cidx}
                                        className={`py-4 px-6 align-middle text-gray-800 text-sm ${
                                            cidx === headers.length - 1 ? "flex gap-4 items-center" : ""
                                        } whitespace-nowrap`}
                                    >
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        );
                    })
                )}
                </tbody>
            </table>
        </div>
    );
};

export default PropertyTable;
