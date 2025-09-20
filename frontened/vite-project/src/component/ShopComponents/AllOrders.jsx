import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSellerOrder } from "../../assets/redux/actions/order";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import Loader from "../layout/loader";
import { Button, Chip, Typography, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const AllOrders = () => {
  const dispatch = useDispatch();
  const { shopOrders, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);

  useEffect(() => {
    if (seller?._id) {
      dispatch(getSellerOrder(seller._id));
    }
  }, [dispatch, seller]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.8,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={
            params.value === "Delivered"
              ? "success"
              : params.value === "Processing"
              ? "warning"
              : "error"
          }
          size="small"
          variant="outlined"
        />
      ),
    },
    {
      field: "itemQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "total",
      headerName: "Total",
      type: "string",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: " ",
      flex: 0.5,
      minWidth: 80,
      headerName: "Action",
      sortable: false,
      renderCell: (params) => (
        <Link to={`/order/${params.id}`}>
          <Button variant="contained" size="small" color="primary">
            <AiOutlineArrowRight size={18} />
          </Button>
        </Link>
      ),
    },
  ];

  const rows = shopOrders?.map((order) => ({
    id: order._id,
    itemQty: order.cart.reduce((acc, curr) => acc + curr.count, 0),
    total: `$${order.totalPrice.toFixed(2)}`,
    status: order.status,
  }));

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Box className="w-full mx-8 pt-6  mt-15 bg-white rounded-lg shadow-md p-6">
          <Typography variant="h6" className="mb-4 font-semibold text-gray-800">
            All Orders
          </Typography>
          <DataGrid
            columns={columns}
            rows={rows || []}
            disableRowSelectionOnClick
            autoHeight
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#f5f5f5",
                fontWeight: "bold",
                fontSize: "0.95rem",
              },
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "#fafafa",
              },
              "& .MuiDataGrid-cell": {
                padding: "10px",
              },
            }}
          />
        </Box>
      )}
    </>
  );
};

export default AllOrders;
