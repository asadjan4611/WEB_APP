import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAllProduct } from "../../assets/redux/actions/product";
import Loader from "../layout/loader";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const { isLoading, products } = useSelector((state) => state.products);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

  useEffect(() => {
    if (seller?._id) {
      dispatch(getAllProduct(seller._id));
    }
  }, [dispatch, seller]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    window.location.reload();
  };

  const columns = [
    {
      field: "id",
      headerName: "Product ID",
      minWidth: 180,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      flex: 1.5,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 120,
      flex: 0.7,
    },
    {
      field: "Stock",
      headerName: "Stock",
      type: "number",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "sold",
      headerName: "Sold",
      minWidth: 100,
      flex: 0.6,
      type: "number",
    },
    {
      field: "Preview",
      headerName: "Preview",
      minWidth: 120,
      flex: 0.6,
      sortable: false,
      renderCell: (params) => (
        <Link to={`/product/${params.id}`}>
          <Button
            variant="outlined"
            size="small"
            sx={{
              borderRadius: "10px",
              textTransform: "none",
              borderColor: "#1976d2",
              color: "#1976d2",
              "&:hover": { backgroundColor: "#e3f2fd" },
            }}
          >
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
          onClick={() => handleDelete(params.id)}
          variant="outlined"
          size="small"
          color="error"
          sx={{
            borderRadius: "10px",
            textTransform: "none",
            "&:hover": { backgroundColor: "#fee2e2" },
          }}
        >
          <AiOutlineDelete size={18} />
        </Button>
      ),
    },
  ];

  const rows = [];
  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        price: "US $" + item.discountPrice,
        Stock: item.stock,
        sold: item?.sold_out,
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full px-6 py-4 bg-gray-50  mt-15 min-h-screen">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              📦 All Products
            </h2>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={8}
              disableRowSelectionOnClick
              autoHeight
              sx={{
                border: "none",
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#f9fafb",
                  color: "#374151",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                },
                "& .MuiDataGrid-row:hover": {
                  backgroundColor: "#f3f4f6",
                },
                "& .MuiDataGrid-cell": {
                  fontSize: "0.9rem",
                },
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AllProducts;
