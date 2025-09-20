import React, { useEffect, useState } from "react";
import {
  AiOutlineArrowRight,
  AiOutlineMoneyCollect,
  AiOutlineProduct,
} from "react-icons/ai";
import { MdBorderClear } from "react-icons/md";
import styles from "../../style/style";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSellerOrder } from "../../assets/redux/actions/order";
import { getAllProduct } from "../../assets/redux/actions/product";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { backned_Url } from "../../serverRoute";
import { toast } from "react-toastify";

const DashboardHero = () => {
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);
  const { shopOrders } = useSelector((state) => state.order);

  const [deliveredData, setDeliveredData] = useState(null);
  const [userBalance, setUserBalance] = useState(null);

  useEffect(() => {
    dispatch(getSellerOrder(seller?._id));
    dispatch(getAllProduct(seller?._id));

    const orderData =
      shopOrders && shopOrders?.filter((item) => item.status === "Delivered");
    setDeliveredData(orderData);
  }, [dispatch]);

  useEffect(() => {
    const getUserBalance = async () => {
      await axios
        .get(`${backned_Url}/api/shop/get-shop-info/${seller._id}`)
        .then((res) => {
          setUserBalance(res.data.sellerInfo.availableBalance);
        })
        .catch((err) => {
          toast.error(err.response.data?.message);
        });
    };
    getUserBalance();
  }, [seller]);

  const availableBalance = userBalance;

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) =>
        params.row.status === "Delivered" ? "greenColor" : "redColor",
    },
    {
      field: "itemQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      sortable: false,
      renderCell: (params) => (
        <Link to={`/order/${params.id}`}>
          <Button
            variant="contained"
            size="small"
            sx={{
              textTransform: "none",
              backgroundColor: "#1976d2",
              "&:hover": { backgroundColor: "#125ea5" },
            }}
          >
            <AiOutlineArrowRight size={18} />
          </Button>
        </Link>
      ),
    },
  ];

  const rows = [];
  deliveredData &&
    deliveredData?.forEach((item) =>
      rows.push({
        id: item._id,
        itemQty: item.cart.reduce((acc, curr) => acc + curr.count, 0),
        total: "US $" + item.totalPrice,
        status: item.status,
      })
    );

  return (
    <div className="w-full p-6 space-y-8 bg-gray-50 mt-15 min-h-screen">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-gray-800">📊 Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Balance Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
          <div className="flex items-center gap-3">
            <AiOutlineMoneyCollect size={28} className="text-blue-600" />
            <h3 className="text-lg font-medium text-gray-700">
              Account Balance
              <span className="block text-sm text-gray-500">
                (After 10% service charge)
              </span>
            </h3>
          </div>
          <p className="mt-4 text-2xl font-bold text-gray-900">
            ${availableBalance}
          </p>
          <Link to={"/dashboard-withdraw-money"}>
            <button className="mt-3 text-blue-600 font-medium hover:underline">
              Withdraw Money →
            </button>
          </Link>
        </div>

        {/* Orders Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
          <div className="flex items-center gap-3">
            <MdBorderClear size={28} className="text-green-600" />
            <h3 className="text-lg font-medium text-gray-700">All Orders</h3>
          </div>
          <p className="mt-4 text-2xl font-bold text-gray-900">
            {shopOrders?.length}
          </p>
          <Link to={"/dashboard-orders"}>
            <button className="mt-3 text-green-600 font-medium hover:underline">
              View Orders →
            </button>
          </Link>
        </div>

        {/* Products Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
          <div className="flex items-center gap-3">
            <AiOutlineProduct size={28} className="text-purple-600" />
            <h3 className="text-lg font-medium text-gray-700">All Products</h3>
          </div>
          <p className="mt-4 text-2xl font-bold text-gray-900">
            {products?.length}
          </p>
          <Link to={"/dashboard-products"}>
            <button className="mt-3 text-purple-600 font-medium hover:underline">
              View Products →
            </button>
          </Link>
        </div>
      </div>

      {/* Latest Orders */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          📦 Latest Orders
        </h3>
        <div className="w-full">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            disableSelectionOnClick
            autoHeight
            sx={{
              border: "none",
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#f3f4f6",
                color: "#374151",
                fontWeight: 600,
              },
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "#f9fafb",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardHero;
