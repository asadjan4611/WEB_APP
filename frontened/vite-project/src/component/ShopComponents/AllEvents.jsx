import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/loader";
import { Button, Chip, Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { deleteEvent, getAllEvennts } from "../../assets/redux/actions/event";

const AllEvents = () => {
  const { isLoading, events } = useSelector((state) => state.events);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

  const [active, setActive] = useState(false);

  useEffect(() => {
    if (seller?._id) {
      dispatch(getAllEvennts(seller._id));
    }
  }, [dispatch, seller]);

  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 70);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteEvent(id)).then(() => {
      dispatch(getAllEvennts(seller._id)); // ✅ refresh events instead of reload
    });
  };

  const columns = [
    { field: "id", headerName: "Event ID", minWidth: 180, flex: 1 },
    { field: "name", headerName: "Name", minWidth: 180, flex: 1.2 },
    { field: "price", headerName: "Price", minWidth: 100, flex: 0.6 },
    { field: "Stock", headerName: "Stock", type: "number", minWidth: 80, flex: 0.5 },
    { field: "sold", headerName: "Sold", type: "number", minWidth: 100, flex: 0.6 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 120,
      flex: 0.7,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={
            params.value === "Running"
              ? "success"
              : params.value === "Ended"
              ? "error"
              : "warning"
          }
          size="small"
          variant="outlined"
        />
      ),
    },
    {
      field: "Preview",
      headerName: "Preview",
      minWidth: 120,
      flex: 0.6,
      sortable: false,
      renderCell: (params) => (
        <Link to={`/product/${params.id}`}>
          <Button variant="outlined" color="primary" size="small">
            <AiOutlineEye size={18} />
          </Button>
        </Link>
      ),
    },
    {
      field: "Delete",
      headerName: "Delete",
      minWidth: 120,
      flex: 0.6,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={() => handleDelete(params.id)}
        >
          <AiOutlineDelete size={18} />
        </Button>
      ),
    },
  ];

  const rows =
    events?.map((item) => ({
      id: item._id,
      name: item.name,
      price: "US $" + item.discountPrice,
      Stock: item.stock,
      status: item.status,
      sold: item?.sold_out,
    })) || [];

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Box className="w-full mx-8 pt-6 mt-15 bg-white rounded-lg shadow-md p-6">
          <Typography variant="h6" className="mb-4 font-semibold text-gray-800">
            All Events
          </Typography>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
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

export default AllEvents;
