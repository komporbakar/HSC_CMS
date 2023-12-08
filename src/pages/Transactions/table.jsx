import React from "react";
import { Link } from "react-router-dom";
import { Eye } from "@phosphor-icons/react";

export default function TableTransactions({ currentItems, page, limit }) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              No
            </th>
            <th scope="col" className="px-6 py-3">
              Trx Id
            </th>
            <th scope="col" className="px-6 py-3">
              Total Items
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Status Order
            </th>
            <th scope="col" className="px-6 py-3">
              Payment Date
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems &&
            currentItems.map((item, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="w-4 p-4 ">{index + 1 + (page - 1) * limit}</td>
                <td className="px-6 py-4">{item.trxId}</td>
                <td className="px-6 py-4">{item.cartData.length}</td>
                <td className="px-6 py-4">{item.totalCartPrice}</td>
                <td className="px-6 py-4">{item.statusOrder}</td>
                <td className="px-6 py-4">
                  {new Date(item.detetimePayment).toLocaleString() ??
                    "Belum Bayar"}
                </td>
                <td className="px-6 py-4 flex flex-row space-x-2">
                  <Link to={`/transactions/${item.id}`}>
                    <button
                      type="button"
                      className="bg-blue-500 rounded-full p-2"
                    >
                      <Eye size={16} color="#fafafa" />
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
