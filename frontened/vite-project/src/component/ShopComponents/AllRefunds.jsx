import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSellerOrder } from "../../assets/redux/actions/order";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import Loader from "../layout/loader";
import { Button, Chip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const AllRefunds = () => {
  const dispatch = useDispatch();
  const { shopOrders, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);

  useEffect(() => {
    if (seller?._id) {
      dispatch(getSellerOrder(seller._id));
    }
  }, [dispatch, seller]);

  // Filter only refund-related orders
  const refundOrders =
    shopOrders &&
    shopOrders.filter(
      (item) =>
        item.status === "Refund Processing" || item.status === "Refund Success"
    );

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 160,
      flex: 0.8,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={
            params.value === "Refund Success"
              ? "success"
              : params.value === "Refund Processing"
              ? "warning"
              : "default"
          }
          variant="outlined"
        />
      ),
    },
    {
      field: "itemQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "total",
      headerName: "Total Amount",
      type: "string",
      minWidth: 160,
      flex: 0.8,
    },
    {
      field: "action",
      headerName: "Details",
      flex: 0.5,
      minWidth: 120,
      sortable: false,
      renderCell: (params) => (
        <Link to={`/order/${params.id}`}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            endIcon={<AiOutlineArrowRight />}
          >
            View
          </Button>
        </Link>
      ),
    },
  ];

  const rows = [];
  refundOrders &&
    refundOrders.forEach((order) => {
      rows.push({
        id: order._id,
        itemQty: order.cart.reduce((acc, curr) => acc + curr.count, 0),
        total: `$${order.totalPrice.toFixed(2)}`,
        status: order.status,
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full px-8 py-6 mt-16 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Refund Requests
          </h2>
          <DataGrid
            columns={columns}
            rows={rows}
            disableRowSelectionOnClick
            autoHeight
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#f3f4f6",
                color: "#374151",
                fontWeight: "bold",
              },
              "& .MuiDataGrid-row": {
                "&:nth-of-type(odd)": {
                  backgroundColor: "#fafafa",
                },
              },
            }}
          />
        </div>
      )}
    </>
  );
};

export default AllRefunds;
