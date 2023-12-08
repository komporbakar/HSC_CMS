import React, { useEffect, useState } from "react";
import Breadcrumb from "../../components/molecules/Breadcrumb";
import RouteAdmin from "../Route";
import { useParams } from "react-router-dom";
import { getData } from "../../utils/fetch";
import { config } from "../../config";
import ButtonBack from "../../components/molecules/ButtonBack";
import { NumberFormat } from "../../utils/formatCurrency";

export default function ItemsDetail() {
  const { id } = useParams();
  const [data, setData] = useState();

  const fetchData = async () => {
    const res = await getData(`/items/${id}`);
    console.log(res);
    setData(res.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <RouteAdmin>
      <div className=" my-3 flex justify-between items-center">
        <h1 className=" font-bold text-xl">Items Detail Page</h1>
        <Breadcrumb
          firsttag={"Home"}
          secondtag={"Items"}
          thirdtag={"Detail"}
          // urltag={"/transactions"}
        />
      </div>
      <div className="p-2 w-full relative">
        <div className="mb-10">
          <div className="grid md:grid-cols-5 grid-cols-2 mb-3">
            <div>Name</div>
            <div>: {data?.name}</div>
          </div>
          <div className="grid md:grid-cols-5 grid-cols-2 mb-3">
            <div>Slug</div>
            <div>: {data?.slug}</div>
          </div>
          <div className="grid md:grid-cols-5 grid-cols-2 mb-3">
            <div>Category</div>
            <div>: {data?.category?.name}</div>
          </div>
          <div className="grid md:grid-cols-5 grid-cols-2 mb-3">
            <div>Position Latitude</div>
            <div>: {data?.positionlat}</div>
          </div>
          <div className="grid md:grid-cols-5 grid-cols-2 mb-3">
            <div>Position Langitude</div>
            <div>: {data?.positionlng}</div>
          </div>
          <div className="grid md:grid-cols-5 grid-cols-2 mb-3">
            <div>Address</div>
            <div className="col-span-3">: {data?.address}</div>
          </div>
          <div className="grid md:grid-cols-5 grid-cols-2 mb-3">
            <div>Description</div>
            <div className="col-span-3">: {data?.description}</div>
          </div>
          <div className="grid md:grid-cols-5 grid-cols-2 mb-3">
            <div>Datetime Create</div>
            <div className="col-span-2">: {data?.created_at ?? "N/A"}</div>
          </div>
          {data?.price ? (
            <div className="grid md:grid-cols-5 grid-cols-2 mb-3">
              <div>Price</div>
              <div className="col-span-2">
                : <NumberFormat number={data?.price ?? "N/A"} />
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="grid md:grid-cols-5 grid-cols-2 mb-3">
            <div>Image</div>
            <div className="col-span-2 flex">
              :{" "}
              <img
                src={`${config.api_host}/${data?.image}`}
                alt={data?.name}
                className="ms-1 max-h-24"
              />
            </div>
          </div>
        </div>
        <ButtonBack />
      </div>
    </RouteAdmin>
  );
}
