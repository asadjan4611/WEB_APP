import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../layout/loader';
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import {Link} from "react-router-dom"
import { deleteEvent, getAllEvennts } from '../../assets/redux/actions/event';

const AllEvents = () => {
  const {isLoading,events}= useSelector((state)=>state.events);
    const {seller}= useSelector((state)=>state.seller);

//  console.log("events  is ", events);

  const dispatch = useDispatch();
  useEffect(()=>{
   dispatch(getAllEvennts(seller._id))
  },[dispatch]);

  const handleDelete = (params)=>{
    // console.log(params);
    dispatch(deleteEvent(params));
  window.location.reload();
  }
  
   const columns=[
    {
      field:"id",
      headerName:"Product Id",
      minWidth:150 ,
      flex:0.7 
    },{
      field:"name",
      headerName:"Name",
      minWidth:180 ,
      flex:1.4 
    },
    {
      field:"price",
      headerName:"Price",
      minWidth:100 ,
      flex:0.6 
    },{
      field:"Stock",
      headerName:"Stock",
      type:"number",
      minWidth:80 ,
      flex:0.5 
    },
    {
      field:"sold",
      headerName:"Sold Out",
      minWidth:130 ,
      flex:0.6 ,
      type:"number" 

    },
    {
      field:"status",
      headerName:"Status",
      minWidth:130 ,
      flex:0.6 ,
      type:"string" 

    },
    {
      field:"Preview",
      headerName:" ",
      minWidth:100 ,
      flex:0.8,
      type:"number" ,
      sortable:false,
      renderCell:(params)=>{
        return (
          <>
          <Link to={`/product/${params.id}`}>
          <Button>
            <AiOutlineEye size={20}/>
          </Button>
          </Link>
          </>
        );
      }
    },
    {
      field:"Delete",
      headerName:" ",
      minWidth:120 ,
      flex:0.8 ,
      type:"number",
      sortable:false,
      renderCell:(params)=>{
        return(
          <>
          <Button onClick={()=>{handleDelete(params.id)}}>
            <AiOutlineDelete size={20}/>
          </Button>
          </>
        );
      }
    },
   ]


   const row=[];
   events && events.forEach((item)=>{
   row.push({
    id:item._id,
    name:item.name,
    price:"US $" + item.discountPrice,
    Stock:item.stock,
    status:item.status,
    sold:item?.sold_out,
   })
   });

  return (
   <>
   {
    isLoading ? <Loader/>:(
      <div className='w-full mx-8 pt-1 bg-white'>
    <DataGrid
     rows={row}
     columns={columns}
     pageSize={10}
     disableRowSelectionOnClick
      autoHeight
     />
   </div>
    )
   }
   </>
  )
}

export default AllEvents
