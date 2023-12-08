import React, { useEffect, useRef, useState } from "react";
import Breadcrumb from "../../components/molecules/Breadcrumb";
import RouteAdmin from "../Route";
import { useParams } from "react-router-dom";
import { getData, putData } from "../../utils/fetch";
import { NumberFormat } from "../../utils/formatCurrency";
import ButtonBack from "../../components/molecules/ButtonBack";

export default function TransactionsDetail() {
  const { id } = useParams();
  const [data, setData] = useState();
  const [valueOption, setValueOption] = useState("");
  console.log(valueOption);

  const fetchData = async () => {
    const res = await getData(`/orders/${id}`);
    setData(res.data.data);
  };

  const classOption = () => {
    switch (data?.statusOrder) {
      case "PENDING":
        return "bg-yellow-200";
        break;
      case "PROCESS":
        return "bg-orange-200";
        break;
      case "SHIPPED":
        return "bg-teal-200";
        break;
      case "DELIVERED":
        return "bg-green-200";
        break;
      case "FAILED":
        return "bg-red-200";
        break;
      default:
        return "bg-yellow-200";
        break;
    }
  };

  useEffect(() => {
    fetchData();
    classOption();
  }, [valueOption]);

  const handleChangeStatus = async (e) => {
    const res = await putData(`/orders/update-order/${id}`, {
      statusOrder: e.target.value,
    });
    console.log(res);
    setValueOption(res.data?.data?.statusOrder);
  };

  return (
    <RouteAdmin>
      <div className=" my-3 flex justify-between items-center">
        <h1 className=" font-bold text-xl">Transactions Detail Page</h1>
        <Breadcrumb
          firsttag={"Home"}
          secondtag={"Transactions"}
          thirdtag={"Detail"}
          urltag={"/transactions"}
        />
      </div>
      <div className="p-2 w-full">
        <div className="mb-10">
          <div className="grid md:grid-cols-5 grid-cols-2 mb-3">
            <div>Trx Id</div>
            <div>: {data?.trxId}</div>
          </div>
          <div className="grid md:grid-cols-5 grid-cols-2 mb-3">
            <div>total Items</div>
            <div>: {data?.cartData.length} Item</div>
          </div>
          <div className="grid md:grid-cols-5 grid-cols-2 mb-3">
            <div>Total Price</div>
            <div>
              : <NumberFormat number={data?.totalCartPrice} />
            </div>
          </div>
          <div className="grid md:grid-cols-5 grid-cols-2 mb-3">
            <div>Status Payment</div>
            <div>: {data?.statusPayment}</div>
          </div>
          <div className="grid md:grid-cols-5 grid-cols-2 mb-3 ">
            <div>Status Order</div>
            <div className="relative col-span-3 flex">
              :{" "}
              <select
                id="default"
                onChange={handleChangeStatus}
                class={`bg-gray-50 ms-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${classOption()}`}
              >
                <option
                  value="PENDING"
                  selected={data?.statusOrder === "PENDING"}
                >
                  PENDING
                </option>
                <option
                  value="PROCESS"
                  selected={data?.statusOrder === "PROCESS"}
                >
                  PROCESS
                </option>
                <option
                  value="SHIPPED"
                  selected={data?.statusOrder === "SHIPPED"}
                >
                  SHIPPED
                </option>
                <option
                  value="DELIVERED"
                  selected={data?.statusOrder === "DELIVERED"}
                >
                  DELIVERED
                </option>
                <option
                  value="FAILED"
                  selected={data?.statusOrder === "FAILED"}
                >
                  FAILED
                </option>
              </select>
            </div>
          </div>
          <div className="grid md:grid-cols-5 grid-cols-2 mb-3">
            <div>Payment Type</div>
            <div>: {data?.paymentType ?? "N/A"}</div>
          </div>
          <div className="grid md:grid-cols-5 grid-cols-2 mb-3">
            <div>Datetime Order</div>
            <div className="col-span-2">: {data?.created_at ?? "N/A"}</div>
          </div>

          {data?.detetimePayment ? (
            <div className="grid md:grid-cols-5 grid-cols-2 mb-3">
              <div>Datetime Payment</div>
              <div className="col-span-2">
                : {data?.detetimePayment ?? "N/A"}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        <table className="w-full  text-left text-gray-500 dark:text-gray-400">
          <thead className=" text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                No
              </th>
              <th scope="col" className="px-6 py-3">
                Items
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Total Price
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.cartData &&
              data?.cartData.map((item, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="w-4 p-4 ">{index + 1}</td>
                  <td className="px-6 py-4">{item?.item?.name}</td>
                  <td className="px-6 py-4">
                    <NumberFormat number={item?.item?.price} />
                  </td>
                  <td className="px-6 py-4">{item?.quantity}</td>
                  <td className="px-6 py-4">
                    <NumberFormat number={item?.totalprice} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <ButtonBack />
    </RouteAdmin>
  );
}
