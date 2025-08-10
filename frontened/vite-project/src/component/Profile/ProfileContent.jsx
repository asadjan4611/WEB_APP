import React, { useState } from "react";
import { useSelector } from "react-redux";
import { backned_Url } from "../../server";
import { AiOutlineArrowRight, AiOutlineCamera, AiOutlineDelete } from "react-icons/ai";
import styles from "../../style/style";
import { Button } from "@mui/material";
import { MdOutlineAudiotrack, MdOutlineTrackChanges } from "react-icons/md";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
const ProfileContent = ({ active }) => {
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [number, setNumber] = useState();
  const [zipCode, setZipCode] = useState();
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const handleSubmitt = (e) => {
    e.preventDefault();
  };

  // console.log(user)
  return (
    // Active 1 profile
    <div className="w-full">
      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                className="h-[150px] w-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
                src={`${backned_Url}/uploads/${user?.avatar.url}`}
                alt="asad jan"
              />

              <div className="w-[30px] h-[30px] bg-[#e3e9ee] rounded-full flex items-center justify-center absolute bottom-[5px] right-[5px]">
                <AiOutlineCamera />
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="w-full px-5">
            <form onSubmit={handleSubmitt} aria-required={true}>
              <div className="w-full flex flex-wrap gap-2 pb-3">
                <div className=" w-[48%] pt-3">
                  <label className="block pb-2 ">Full Name</label>
                  <input
                    required
                    defaultValue={name || ""}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    className={`${styles.input}`}
                  />
                </div>

                <div className=" w-[48%] pt-3">
                  <label className="block pb-2">Email Address</label>
                  <input
                    required
                    value={email || " "}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    className={`${styles.input}`}
                  />
                </div>
                <div className=" w-[48%] pt-3">
                  <label className="block pb-2">Contact Number</label>
                  <input
                    required
                    value={number || " "}
                    onChange={(e) => setNumber(e.target.value)}
                    type="text"
                    className={`${styles.input}`}
                  />
                </div>

                <div className=" w-[48%] pt-3">
                  <label className="block pb-2">Zip Code</label>
                  <input
                    required
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    type="text"
                    className={`${styles.input}`}
                  />
                </div>

                <div className=" w-[48%] pt-3">
                  <label className="block pb-2">Address 1</label>
                  <input
                    required
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                    type="text"
                    className={`${styles.input}`}
                  />
                </div>
                <div className=" w-[48%] pt-3">
                  <label className="block pb-2">Address 2</label>
                  <input
                    required
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                    type="text"
                    className={`${styles.input}`}
                  />
                </div>
                <div className="">
                  <input
                    className=" mt-5 w-[250px] h-[40px] border text-center border-[#3a24db] text-[#3a24db] rounded-[3px] cursor-pointer hover:opacity-45 "
                    required
                    value={"update"}
                    type="submit"
                  />
                </div>
              </div>
            </form>
          </div>
        </>
      )}
      {/* Active 2   track order*/}

      {active === 2 && (
        <div>
          <AllOrders />
        </div>
      )}

      {/* Active 3   Refund order*/}

      {active === 3 && (
        <div>
          <AllRefundOrders />
        </div>
      )}

      {/* Active 5   Refund order*/}

      {active === 5 && (
        <div>
          <TrackOrders />
        </div>
      )}

      {/* Active 6 Payment Method*/}

      {active === 6 && (
        <div>
          <PaymentMethod />
        </div>
      )}

{/* Active 7 Address*/}

      {active === 7 && (
        <div>
          <Address />
        </div>
      )}

    </div>


    
  );
};

const AllOrders = () => {
  const orders = [
    {
      _id: "873681723873213hwjkdh786",
      orderItems: [
        {
          name: "Iphone 14 SSD 256",
        },
      ],
      totalPrice: 120,
      orderStatus: "Processing",
    },
  ];

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

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemQty: item.orderItems.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
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

const AllRefundOrders = () => {
  const orders = [
    {
      _id: "873681723873213hwjkdh786",
      orderItems: [
        {
          name: "Iphone 14 SSD 256",
        },
      ],
      totalPrice: 120,
      orderStatus: "Processing",
    },
  ];

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

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemQty: item.orderItems.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        columns={columns}
        rows={row}
        pageSize={10}
        autoHeight
        disableSelectionOnClick
      />
    </div>
  );
};

const TrackOrders = () => {
  const orders = [
    {
      _id: "873681723873213hwjkdh786",
      orderItems: [
        {
          name: "Iphone 14 SSD 256",
        },
      ],
      totalPrice: 120,
      orderStatus: "Processing",
    },
  ];

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
              <MdOutlineTrackChanges size={20} />
            </Button>
          </Link>
        ) : (
          <Button disabled>No ID</Button>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemQty: item.orderItems.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
      });
    });
  return (
    <div className="pl-8 pt-1">
      <DataGrid
        columns={columns}
        rows={row}
        pageSize={10}
        autoHeight
        disableSelectionOnClick
      />
    </div>
  );
};

const PaymentMethod = () => {
  return (
    <div className="w-full px-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
          Payment Method
        </h1>

        <div className={`${styles.button} rounded-md`}>
          <span className="text-[#fff]">Add New</span>
        </div>
      </div>
      <br />
      <div className="w-full bg-white rounded-[4px] flex items-center justify-between px-3 shadow pr-10">
        <div className="flex items-center">
          <img
          className="h-[75px] w-[75px] object-cover rounded-md"
            src="data:image/jpeg;base64,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"
            alt=""
          />
          <h5 className="font-[500] pl-5">Dummy Name</h5>
        </div>
        <div className="flex flex-wrap">
          <h3>126 *** **** ***</h3>
          <h4 className="pl-6">12/28</h4>
        </div>

        <div className="w-[10px] pl-8 cursor-pointer">
          <AiOutlineDelete size={20}/>
        </div>
      </div>
    </div>
  );
};


const Address = ()=>{
    return (
    <div className="w-full px-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
          My Address
        </h1>

        <div className={`${styles.button} rounded-md`}>
          <span className="text-[#fff]">Add New</span>
        </div>
      </div>
      <br />
      <div className="w-full bg-white rounded-[4px] h-[80px] flex items-center justify-between px-3 shadow pr-10">
        <div className="flex items-center">
          <h5 className="font-[500] pl-5 ">Default</h5>
        </div>
        <div className="flex flex-wrap">
          <h3>52 Block B-2 Johar Town PK</h3>
        </div>

        <div className="flex flex-wrap">
          <h3>+92 324........</h3>
        </div>

        <div className="w-[10px] pl-8 cursor-pointer">
          <AiOutlineDelete size={20}/>
        </div>
      </div>
    </div>
  );  
}

export default ProfileContent;
