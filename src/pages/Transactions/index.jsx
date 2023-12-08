import React, { useEffect, useState } from "react";
import Breadcrumb from "../../components/molecules/Breadcrumb";
import Pagination from "../../components/molecules/Pagination";
import RouteAdmin from "../Route";
import TableItems from "./table";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../redux/transaction/actions";

export default function Transactions() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.transaction.data);
  const currentPage = useSelector((state) => state.transaction.currentPage);
  const currentItems = useSelector((state) => state.transaction.currentItems);
  const [keyword, setKeyword] = useState("");

  const limit = 5 || 1;
  const page = Math.ceil(currentItems / limit);

  const [toPage, setToPage] = useState(currentPage);

  // Invoke when user click to request another page.
  const handlePageClick = ({ selected }) => {
    setToPage(selected + 1);
  };

  useEffect(() => {
    dispatch(fetchOrders(toPage, limit, keyword));
  }, [dispatch, toPage, keyword]);

  return (
    <RouteAdmin>
      <div className=" my-3 flex justify-between items-center">
        <h1 className=" font-bold text-xl">Transactions Page</h1>
        <Breadcrumb firsttag={"Home"} secondtag={"Transactions"} />
      </div>
      <div className="flex flex-wrap justify-between mb-5 items-center">
        <div className="bg-white dark:bg-gray-900">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative mt-1 max-w-fit">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg max-w-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
              placeholder="Search for items"
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
        </div>
      </div>
      <TableItems currentItems={items} page={currentPage} limit={limit} />
      <div className="mt-3 text-center">
        <Pagination pages={page} handlePageClick={handlePageClick} />
      </div>
    </RouteAdmin>
  );
}
