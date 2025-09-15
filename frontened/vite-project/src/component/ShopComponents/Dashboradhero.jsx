import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight, AiOutlineMoneyCollect, AiOutlineProduct } from "react-icons/ai";
import styles from "../../style/style";
import { Link } from "react-router-dom";
import { MdBorderClear } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getSellerOrder } from "../../assets/redux/actions/order";
import { getAllProduct } from "../../assets/redux/actions/product";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
const Dashboradhero = () => {
    const dispatch = useDispatch();
    const {seller} = useSelector((state)=>state.seller);
    const {products}= useSelector((state)=>state.products);
    const {shopOrders} =  useSelector((state)=>state.order);
    const [deliveredData,setDeliveredData] = useState(null);

    useEffect(()=>{
    dispatch(getSellerOrder(seller?._id));
    dispatch(getAllProduct(seller?._id));


    const orderData = shopOrders && shopOrders?.filter((item)=>item.status === "Delivered");
    setDeliveredData(orderData);


    },[dispatch]);

    const totalEarningwithOutTax = shopOrders && shopOrders?.reduce((acc,item)=> acc+ item.totalPrice,0);
    const serviecCharges = totalEarningwithOutTax*0.1;
     const availableBalance =  totalEarningwithOutTax-serviecCharges;;

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
          <Button>
            <AiOutlineArrowRight size={20} />
          </Button>
        </Link>
      ),
    },
  ];

  const rows=[];

  deliveredData && deliveredData?.forEach((item)=>(
    rows.push({
      id: item._id,
      itemQty: item.cart.reduce((acc, curr) => acc + curr.count, 0),
      total: "US $" + item.totalPrice,
      status:item.status,
    })
  ));


  return (
    <div className="w-full p-8 overflow-y-scroll">
      <h1 className="pb-2 text-[22px]"> Overview</h1>

      <div className="md:flex justify-between items-center block">
        <div className="w-full mb-4 md:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <AiOutlineMoneyCollect
              size={25}
              className="mr-2"
              fill="#000000005"
            />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#000085]`}
            >
              Account Balance{" "}
              <span className="text-[16px]">(with 10% service Charge)</span>
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500px] ">
            ${availableBalance}
          </h5>
          <Link to={"/dashboard-withdram-money"}>
          <h5 className="pt-4 pl-2 text-[#077f9c]">
            WithDraw Money
          </h5>
          </Link>
        </div>



         <div className="w-full mb-4 md:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <MdBorderClear
              size={25}
              className="mr-2"
              fill="#000000005"
            />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#000085]`}
            >
              All  Orders{" "}
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500px] ">
            {shopOrders?.length}
          </h5>
          <Link to={"/dashboard-orders"}>
          <h5 className="pt-4 pl-2 text-[#077f9c]">
            View Orders
          </h5>
          </Link>
        </div>

         <div className="w-full mb-4 md:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <AiOutlineProduct
              size={25}
              className="mr-2"
              fill="#000000005"
            />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#000085]`}
            >
              All Products{" "}
               </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500px] ">
            {products?.length}
          </h5>
          <Link to={"/dashboard-products"}>
          <h5 className="pt-4 pl-2 text-[#077f9c]">
            View Products
          </h5>
          </Link>
        </div>

        <br />
      </div>
        <h3 className="text-[22px] pt-6">
            Latest Order
        </h3>

        <div className= "pt-8 w-full shadow bg-white min-h-[55vh] rounded">
             <div className="w-full min-h-[45vh] bg-white rounded">
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
      </div>
        </div>
    </div>
  );
};

export default Dashboradhero;
