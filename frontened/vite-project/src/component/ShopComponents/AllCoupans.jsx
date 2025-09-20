import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getAllProduct,
} from "../../assets/redux/actions/product";
import Loader from "../layout/loader";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineDelete } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "../../style/style";
import { backned_Url } from "../../serverRoute";

const AllCoupans = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [value, setValue] = useState("");
  const [coupans, setCoupans] = useState([]);
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const { products } = useSelector((state) => state.products);
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();

  useEffect(() => {
    if (seller._id) {
      dispatch(getAllProduct(seller._id));
    }

    const isGetCoupan = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `${backned_Url}/api/coupan/get-coupans/${seller._id}`,
          { withCredentials: true }
        );
        setCoupans(res.data.coupans);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        toast.error("Failed to load coupons");
      }
    };

    if (seller._id) {
      isGetCoupan();
    }
  }, [seller, dispatch]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${backned_Url}/api/coupan/delete-coupan/${id}`,
        { withCredentials: true }
      );
      toast.success("Coupon deleted successfully");
      window.location.reload();
    } catch (error) {
      toast.error("Failed to delete coupon");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${backned_Url}/api/coupan/create-coupan`,
        { name, minAmount, maxAmount, value, seller, selectedProduct },
        { withCredentials: true }
      );
      toast.success("Coupon created successfully 🎉");
      setOpen(false);
      window.location.reload();
    } catch (error) {
      toast.error("Failed to create coupon");
    }
  };

  const columns = [
    { field: "id", headerName: "ID", minWidth: 150, flex: 0.7 },
    { field: "name", headerName: "Coupon Name", minWidth: 180, flex: 1.4 },
    { field: "price", headerName: "Value", minWidth: 100, flex: 0.6 },
    {
      field: "Delete",
      headerName: " ",
      minWidth: 120,
      flex: 0.6,
      sortable: false,
      renderCell: (params) => (
        <Button
          onClick={() => handleDelete(params.id)}
          variant="outlined"
          color="error"
          size="small"
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

  const rows = coupans.map((item) => ({
    id: item._id,
    name: item.name,
    price: item.value + " %",
  }));

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full px-6 py-4 mt-15 bg-gray-50 min-h-screen">
          <div className="bg-white rounded-2xl shadow-md p-6">
            {/* Header + Create Button */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                🎟️ All Coupons
              </h2>
              <div
                onClick={() => setOpen(true)}
                className={`${styles.button} !w-max !h-[45px] px-5 py-2 rounded-lg shadow-md text-white bg-gradient-to-r from-blue-600 to-indigo-600 cursor-pointer hover:opacity-90`}
              >
                <span>Create Coupon</span>
              </div>
            </div>

            {/* DataGrid */}
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

          {/* Modal */}
          {open && (
            <div className="fixed top-0 left-0 w-full h-screen bg-[#00000065] z-[200] flex items-center justify-center">
              <div className="w-[95%] md:w-[40%] bg-white rounded-xl shadow-xl p-6 relative">
                {/* Close */}
                <button
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                  onClick={() => setOpen(false)}
                >
                  <RxCross1 size={25} />
                </button>

                {/* Title */}
                <h5 className="text-center text-2xl font-semibold text-gray-800 mb-6">
                  Create Coupon Code
                </h5>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      placeholder="Enter coupon code..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Discount Percentage <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      value={value}
                      placeholder="Enter discount value..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      onChange={(e) => setValue(e.target.value)}
                    />
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Min Amount
                      </label>
                      <input
                        type="number"
                        value={minAmount}
                        placeholder="Min amount"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        onChange={(e) => setMinAmount(e.target.value)}
                      />
                    </div>

                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Max Amount
                      </label>
                      <input
                        type="number"
                        value={maxAmount}
                        placeholder="Max amount"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        onChange={(e) => setMaxAmount(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Selected Product
                    </label>
                    <select
                      value={selectedProduct}
                      onChange={(e) => setSelectedProduct(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="">Choose a Product</option>
                      {products?.map((i) => (
                        <option key={i._id} value={i.name}>
                          {i.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-md hover:opacity-90"
                  >
                    Create Coupon
                  </button>
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
