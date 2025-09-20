import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import styles from "../../style/style";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  MdOutlineAudiotrack,
  MdOutlineTrackChanges,
  MdTrackChanges,
} from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { backned_Url } from "../../serverRoute";
import {
  deleteAddress,
  updateUserAddress,
  updateUserInfo,
} from "../../assets/redux/actions/user";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { Country, State, City } from "country-state-city";
import { getUserOrder } from "../../assets/redux/actions/order";

// ... your imports stay the same

const ProfileContent = ({ active }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { user, updateSuccessMessage, error } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(getUserOrder(user?._id));
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    if (updateSuccessMessage) {
      toast.success(updateSuccessMessage.updateSuccessMessage);
      dispatch({ type: "clearMessage" });
    }
  }, [error, updateSuccessMessage, user]);

  const [name, setName] = useState(user && user.name);
  const { userOrders } = useSelector((state) => state.order);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);

  const handleImage = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setAvatar(file);

    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    await axios
      .put(`${backned_Url}/api/user/update-user-avatar`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then(() => window.location.reload(true))
      .catch((error) => toast.error(error));
  };

  const handleSubmitt = (e) => {
    e.preventDefault();
    dispatch(updateUserInfo(email, name, password, phoneNumber));
  };

  return (
    <div className="w-full">
      {/* Profile */}
      {active === 1 && (
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                className="h-36 w-36 rounded-full object-cover border-4 border-blue-500 shadow"
                src={user?.avatar.url}
                alt="User Avatar"
              />
              <label
                htmlFor="image"
                className="absolute bottom-2 right-2 bg-gray-200 p-2 rounded-full cursor-pointer shadow hover:bg-gray-300"
              >
                <AiOutlineCamera />
              </label>
              <input
                type="file"
                id="image"
                className="hidden"
                onChange={handleImage}
              />
            </div>
            <form
              onSubmit={handleSubmitt}
              className="w-full mt-4 grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Full Name
                </label>
                <input
                  required
                  defaultValue={user?.name || ""}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className={`${styles.input}`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Email
                </label>
                <input
                  required
                  value={user?.email || ""}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className={`${styles.input}`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Contact Number
                </label>
                <input
                  required
                  value={user?.phoneNumber || ""}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  type="text"
                  className={`${styles.input}`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Password
                </label>
                <input
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className={`${styles.input}`}
                />
              </div>
              <div className="col-span-2 flex justify-center mt-3">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Orders */}
      {active === 2 && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">My Orders</h2>
          <AllOrders userOrders={userOrders} />
        </div>
      )}

      {/* Refunds */}
      {active === 3 && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Refund Requests
          </h2>
          <AllRefundOrders userOrders={userOrders} />
        </div>
      )}

      {/* Track Orders */}
      {active === 5 && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Track Orders
          </h2>
          <TrackOrders userOrders={userOrders} />
        </div>
      )}

      {/* Change Password */}
      {active === 6 && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <ChangePassword />
        </div>
      )}

      {/* Address */}
      {active === 7 && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <Address />
        </div>
      )}
    </div>
  );
};


const AllOrders = ({ userOrders }) => {
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.value === "Delivered" ? "greenColor" : "redColor";
      },
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
      type: "number",
      sortable: false,
      renderCell: (params) => {
        const orderId = params.row?.id;
        return orderId ? (
          <Link to={`/user/order/${params.id}`}>
            <Button>
              <AiOutlineArrowRight size={20} />
            </Button>
          </Link>
        ) : (
          <Button disabled>No ID</Button>
        );
      },
    },
  ];

  const row = [];

  userOrders &&
    userOrders.forEach((item, i) => {
      row.push({
        id: item._id,
        itemQty: item.cart[0]?.count,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });
  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const AllRefundOrders = ({ userOrders }) => {
  const eligibleProducts =
    userOrders &&
    userOrders.filter((item) => item.status === "Refund Processing" || item.status === "Refund Success");
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.value === "Delivered" ? "greenColor" : "redColor";
      },
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
      type: "number",
      sortable: false,
      renderCell: (params) => {
        const orderId = params.row?.id;
        return orderId ? (
          <Link to={`/user/order/${params.id}`}>
            <Button>
              <AiOutlineArrowRight size={20} />
            </Button>
          </Link>
        ) : (
          <Button disabled>No ID</Button>
        );
      },
    },
  ];

  const row = [];

  eligibleProducts &&
    eligibleProducts.forEach((item, i) => {
      row.push({
        id: item._id,
        itemQty: item.cart[0]?.count,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });
  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const TrackOrders = ({ userOrders }) => {
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.value === "Delivered" ? "greenColor" : "redColor";
      },
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
      type: "number",
      sortable: false,
      renderCell: (params) => {
        const orderId = params.row?.id;
        return orderId ? (
          <Link to={`/user/track/order/${params.id}`}>
            <Button>
              <MdTrackChanges size={20} />
            </Button>
          </Link>
        ) : (
          <Button disabled>No ID</Button>
        );
      },
    },
  ];

  const row = [];

  userOrders &&
    userOrders.forEach((item, i) => {
      row.push({
        id: item._id,
        itemQty: item.cart[0]?.count,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });
  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confPassword, setConfPassowrd] = useState("");
  const [visible, setVisible] = useState(false);

  const passowrdChangeHandler = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${backned_Url}/api/user/updatePassword`,
        { oldPassword, newPassword, confPassword },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        toast.success("Updated Passowrd Successfully");
        setConfPassowrd("");
        setNewPassword("");
        setOldPassword("");
      })
      .catch((error) => {
        toast.error(error.response?.data?.message);
        setConfPassowrd("");
        setNewPassword("");
        setOldPassword("");
      });
  };

  return (
    <div className="w-full px-5">
      <h1 className=" block   text-center text-[25px] font-[600] text-[#000000ba] pb-2">
        Change Password
      </h1>
      <div className="w-full">
        <form
          onSubmit={passowrdChangeHandler}
          aria-required
          className="flex flex-col items-center"
        >
          <div className=" w-[100%] md:w-[50%] pt-3 mt-3">
            <label className="block pb-2 ">Enter your old Passowrd</label>
            <div className="relative justify-between flex">
              <input
                required
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                type={visible ? "text" : "password"}
                className={`${styles.input} !w-[95%] mb-3 md:mb-0`}
              />
              {visible ? (
                <AiOutlineEye
                  className="absolute right-5 top-2.5 cursor-pointer"
                  size={20}
                  onClick={() => setVisible(false)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className="absolute right-5 top-2.5 cursor-pointer"
                  size={20}
                  onClick={() => setVisible(true)}
                />
              )}
            </div>
          </div>

          <div className=" w-[100%] md:w-[50%] pt-3 mt-3">
            <label className="block pb-2 ">Enter your new Passowrd</label>
            <div className="relative">
              <input
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                type={visible ? "text" : "password"}
                className={`${styles.input} !w-[95%] mb-3 md:mb-0`}
              />
              {visible ? (
                <AiOutlineEye
                  className="absolute right-5 top-2.5 cursor-pointer"
                  size={20}
                  onClick={() => setVisible(false)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className="absolute right-5 top-2.5 cursor-pointer"
                  size={20}
                  onClick={() => setVisible(true)}
                />
              )}
            </div>
          </div>

          <div className=" w-[100%] md:w-[50%] pt-3 mt-3">
            <label className="block pb-2 ">Enter your Confirm Passowrd</label>
            <div className="relative">
              <input
                required
                value={confPassword}
                onChange={(e) => setConfPassowrd(e.target.value)}
                type={visible ? "text" : "password"}
                className={`${styles.input} !w-[95%] mb-3 md:mb-0`}
              />

              {visible ? (
                <AiOutlineEye
                  className="absolute right-5 top-2.5 cursor-pointer"
                  size={20}
                  onClick={() => setVisible(false)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className="absolute right-5 top-2.5 cursor-pointer"
                  size={20}
                  onClick={() => setVisible(true)}
                />
              )}
            </div>
          </div>

          <div className=" w-[100%] md:w-[50%] pt-3 mt-5">
            <input
              required
              value={"Update"}
              type="submit"
              className={`${styles.input} cursor-pointer !w-[95%] mb-4 md:mb-0`}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

const Address = () => {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState();
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [addressType, setAddressType] = useState("");
  const { user, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // console.log("country is ",country);

  const AddressTypData = [
    {
      name: "defualt",
    },
    {
      name: "Home",
    },
    {
      name: "Office",
    },
  ];

  const handleSubmitt = (e) => {
    e.preventDefault();

    if (addressType === "" || country === "" || city === "") {
      toast.error("please fill all fields");
    } else {
      dispatch(
        updateUserAddress(
          country,
          city,
          address1,
          address2,
          zipCode,
          addressType
        )
      );
      if (error) {
        toast.error(error);
      }
      setOpen(false);
      setAddress1("");
      setAddress2("");
      setCity("");
      setCountry("");
      setZipCode("");
      setAddressType("");
    }

    window.location.reload(true);
  };

  const deleteAddressController = (id) => {

    dispatch(deleteAddress(id));
        window.location.reload(true);
  };
  return (
    <div className="w-full px-5">
      {open && (
        <div className=" fixed h-full w-full bg-[#00000027] flex  top-0 left-0 items-center justify-center">
          <div className="w-[35%] h-[80vh] bg-white rounded shadow relative overflow-y-scroll">
            <div className="w-full flex justify-end p-3">
              <RxCross1
                className="cursor-pointer"
                onClick={() => setOpen(false)}
                size={25}
              />
            </div>

            <div className=" flex justify-center">
              <h5 className="text-[25px]">Add new Address</h5>
            </div>

            <form aria-required onSubmit={handleSubmitt}>
              <div className="block w-full p-4">
                {/* //country */}
                <div className="w-full pb-2">
                  <label className="block pb-2"> Country</label>
                  <select
                    className="w-[95%] h-[45%] rounded-[5px] border"
                    name=""
                    id=""
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    <option className="block pb-2">Choose your Country</option>
                    {Country &&
                      Country.getAllCountries().map((item) => (
                        <option
                          className="block pb-2"
                          key={item.isoCode}
                          value={item.isoCode}
                        >
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>

                {/* //city */}
                <div className="w-full pb-2">
                  <label className="block pb-2">City</label>
                  <select
                    className="w-[95%] h-[45%] rounded-[5px] border"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  >
                    <option value="">Choose your City</option>
                    {country &&
                      State.getStatesOfCountry(country).map((item) => (
                        // console.log(item),
                        <option
                          className="block pb-2"
                          key={item.isoCode}
                          value={item.isoCode} // or value={item.isoCode}
                        >
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>

                {/* address1 */}

                <div className="w-full pb-2">
                  <label className="block pb-2"> Address 1</label>
                  <input
                    required
                    id="address1"
                    className={`${styles.input}`}
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                    type="text"
                  />
                </div>

                {/* address 2 */}
                <div className="w-full pb-2">
                  <label className="block pb-2"> Address 2</label>
                  <input
                    required
                    id="address2"
                    className={`${styles.input}`}
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                    type="text"
                  />
                </div>

                {/* zipCode */}

                <div className="w-full pb-2">
                  <label className="block pb-2">ZipCode</label>
                  <input
                    required
                    id="zipCode"
                    className={`${styles.input}`}
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    type="number"
                  />
                </div>

                {/* //address type */}

                <div className="w-full pb-2">
                  <label className="block pb-2">Address type</label>
                  <select
                    className="w-[95%] h-[45%] rounded-[5px] border"
                    value={addressType}
                    onChange={(e) => setAddressType(e.target.value)}
                  >
                    <option value="">Address type</option>
                    {AddressTypData &&
                      AddressTypData.map((item) => (
                        // console.log(item),
                        <option
                          className="block pb-2"
                          key={item.name}
                          value={item.name} // or value={item.isoCode}
                        >
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>

                {/* submitt */}

                <div className="w-full pb-2">
                  <input
                    required
                    readOnly
                    className={`${styles.input}  cursor-pointer text-center text-bold mt-5`}
                    type="submit"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
          My Addresses
        </h1>

        <div
          onClick={() => setOpen(true)}
          className={`${styles.button} rounded-md`}
        >
          <span className="text-[#fff]">Add New</span>
        </div>
      </div>
      <br />
      {user &&
        user.addresses.map((item, index) => (
          <div className="w-full bg-white rounded-[4px] h-[80px] flex items-center justify-between px-3 shadow pr-10">
            <div className="flex items-center">
              <h5 className="font-[500] pl-5 ">{item.addressType}</h5>
            </div>
            <div className="flex flex-wrap">
              <h3>{item.address1 + "," + item.address2}</h3>
            </div>

            <div className="flex flex-wrap">
              <h3>{user.phoneNumber}</h3>
            </div>

            <div
              onClick={() => deleteAddressController(item)}
              className="w-[10px] pl-8 cursor-pointer"
            >
              <AiOutlineDelete size={20} />
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProfileContent;
