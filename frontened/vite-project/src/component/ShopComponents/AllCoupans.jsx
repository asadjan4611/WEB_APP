import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getAllProduct,
} from "../../assets/redux/actions/product";
import Loader from "../layout/loader";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from "../../style/style";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { toast } from "react-toastify";
import { TbRuler3 } from "react-icons/tb";

const AllCoupans = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [value, setValue] = useState(null);
  const [coupans, setCoupans] = useState([]);
  const [minAmount, setMinAmount] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);
  const { products } = useSelector((state) => state.products);
  const { seller } = useSelector((state) => state.seller);
  //   console.log(products)
  const dispatch = useDispatch();
  useEffect(() => {
    const isGetCoupan = async () => {
      // console.log(seller._id);
      setIsLoading(true);
      // console.log("hi");
      await axios
        .get(`http://localhost:8000/api/coupan/get-coupans/${seller._id}`, {
          withCredentials: true,
        })
        .then((res) => {
          setIsLoading(false);
          toast.success("sucessfully getting all coupans  ");
          setCoupans(res.data.coupans);
        })
        .catch((err) => {
          setIsLoading(true);
          toast.error(err);
        });
    };
    if (seller._id) {
      isGetCoupan();
    }
  }, [seller]);

  const handleDelete = async (params) => {
    window.location.reload(TbRuler3);
    // console.log(params);
    await axios
      .delete(`http://localhost:8000/api/coupan/delete-coupan/${params}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.message(res.message);
      })
      .catch((error) => {
        toast.error(error);
      });
    window.location.reload();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `http://localhost:8000/api/coupan/create-coupan`,
        {
          name,
          minAmount,
          maxAmount,
          value,
          seller,
          selectedProduct,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
        toast.success("Coupan is Successfully Created");
        setOpen(false);
        window.location.reload();
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "name",
      headerName: "Coupan Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Value",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Delete",
      headerName: " ",
      minWidth: 120,
      flex: 0.8,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button
              onClick={() => {
                handleDelete(params.id);
              }}
            >
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];
  coupans &&
    coupans.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: item.value + " %",
        sold: 10,
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 bg-white">
          <div className="w-full flex justify-end">
            <div
              onClick={() => setOpen(true)}
              className={`${styles.button} !w-max !h-[45px] px-3 !rounded-[5px] mr-3 mb-3 text-white`}
            >
              <span>Create Coupons</span>
            </div>
          </div>
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableRowSelectionOnClick
            autoHeight
          />
          {open && (
            <div className="fixed top-0 left-0 w-full h-screen bg-[#00000065] z-[200] flex items-center justify-center ">
              <div className="W-[90%] md:w-[40%] h-[90vh] bg-white rounded-md shadow p-4 ">
                <div className=" w-full flex justify-end">
                  <RxCross1
                    className="cursor-pointer"
                    onClick={() => {
                      setOpen(false);
                    }}
                    size={25}
                  />
                </div>
                <h5 className="text-center text-[25px]">Create Coupon Code</h5>
                {/* //create Coupon code  */}
                <form onSubmit={handleSubmit} aria-required={true}>
                  <br />
                  <div>
                    <label className="pb-2">
                      Name <span className="text-red-700">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={name}
                      placeholder="Enter your Coupan Code..."
                      className="mt-1 appearance-none block w-full px-3 py-2 sm:text-sm border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  {/* <br /> */}
                  <div>
                    <label className="pb-2">
                      Discount Percentage
                      <span className="text-red-700">*</span>
                    </label>
                    <input
                      type="Number"
                      id="value"
                      required
                      value={value}
                      placeholder="Enter your Coupan Code value..."
                      className=" appearance-none block w-full px-3 py-2 sm:text-sm border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                      onChange={(e) => setValue(e.target.value)}
                    />
                  </div>
                  {/* <br /> */}
                  <div>
                    <label className="pb-2">Min Amount</label>
                    <input
                      type="Number"
                      id="minAmount"
                      value={minAmount}
                      placeholder="Enter your product Min Amount..."
                      className="mt-1 appearance-none block w-full px-3 py-2 sm:text-sm border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                      onChange={(e) => setMinAmount(e.target.value)}
                    />
                  </div>

                  {/* <br /> */}
                  <div>
                    <label className="pb-2">Max Amoun</label>
                    <input
                      type="Number"
                      id="maxAmount"
                      value={maxAmount}
                      placeholder="Enter your product Max Amount..."
                      className="mt-1 appearance-none block w-full px-3 py-2 sm:text-sm border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                      onChange={(e) => setMaxAmount(e.target.value)}
                    />
                  </div>
                  {/* <br /> */}
                  <div>
                    <label className=" pb-2">Selected Product</label>
                    <select
                      value={selectedProduct}
                      className="w-full mt-2 h-[35px] rounded-[5px] "
                      onChange={(e) => setSelectedProduct(e.target.value)}
                      id="selectedProduct"
                    >
                      <option value="Choose your Selected Products">
                        Choose your Selected Product
                      </option>
                      {products &&
                        products.map((i) => (
                          <option key={i.name} value={i.name}>
                            {i.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <br />
                  <div>
                    <input
                      type="submit"
                      className="mt-1   cursor-pointer appearance-none block w-full px-3 py-2 sm:text-sm border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    />
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AllCoupans;
