import React from "react";

const PropertyTable = ({ headers, rows }) => {
    return (
        <div className="overflow-x-auto rounded-xl shadow-xl border border-purple-300 dark:border-gray-700 bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 p-4">
            <table className="min-w-full table-auto border-collapse text-sm text-gray-800 dark:text-gray-200">
                <thead>
                <tr className="bg-gradient-to-r from-purple-600 via-indigo-700 to-pink-600 dark:from-indigo-800 dark:via-purple-900 dark:to-pink-800 text-white uppercase tracking-widest text-xs">
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
                            className="py-10 text-center text-purple-400 dark:text-gray-500 font-semibold italic"
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
                                className={`transition-all duration-300 ${
                                    isEven
                                        ? "bg-gradient-to-r from-white to-purple-50 dark:from-gray-900 dark:to-gray-800"
                                        : "bg-gradient-to-r from-purple-50 to-white dark:from-gray-800 dark:to-gray-900"
                                } hover:from-pink-100 hover:via-purple-100 hover:to-indigo-100 dark:hover:from-gray-700 dark:hover:via-gray-800 dark:hover:to-gray-700 hover:shadow-md`}
                            >
                                {row.map((cell, cidx) => (
                                    <td
                                        key={cidx}
                                        className={`py-4 px-6 align-middle ${
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
