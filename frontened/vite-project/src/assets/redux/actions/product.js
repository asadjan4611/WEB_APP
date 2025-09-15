
import axios from "axios"


///create products



export const createProduct =(newForm)=>async(dispatch)=>{
     try {
        dispatch({
            type:"productCreateRequest"
        })
        const config = {headers:{"Content-type":"multipart/form-data"}};
        const data= axios.post(`http://localhost:8000/api/product/create-product`,newForm,config);
        // console.log("data  from backened is",data);
        dispatch({
            type:"productCreateSuccess",
            payload:data.product
        });
     } catch (error) {
        console.log(error);
        dispatch({
            type:"productCreateFailure",
            payload:error.message
        })
     }
}



//get all products  of a specific shop

export const getAllProduct = (id)=>async(dispatch)=>{
  // console.log(id)
  try {
     dispatch({
       type: "getAllProductsRequest"
  });

  const {data} = await axios.get(`http://localhost:8000/api/product/get-all-products-shop/${id}`);
  //  console.log(data)
  dispatch({
    type:"getAllProductsSuccess",
    payload:data.products
  });
  } catch (error) {
    dispatch({
            type:"getAllProductsFailure",
            payload:error.response?.data?.message
        })
  console.log(error);
  }
}


// delete products

export const deleteProduct=(id) =>async(dispatch)=>{
  try {
     dispatch({
      type:"deleteProductRequest"
     });


     const {data} =await axios.delete(`http://localhost:8000/api/product/delete-shop-product/${id}`);
      dispatch({
      type:"deleteProductSucessfully",
      payload:data.message
    })
  } catch (error) {
    console.log(error);
    dispatch({
      type:"deleteProductFailure",
      payload:error.response.data?.message
    })
  }
}


// get all products of all shops


export const getAllProductss = ()=>async(dispatch)=>{
  try {
     dispatch({
       type: "getAllProductssRequest"
  });

  const {data} = await axios.get(`http://localhost:8000/api/product/get-all-products`);
  dispatch({
    type:"getAllProductssSuccess",
    payload:data.products
  });
  } catch (error) {
    dispatch({
            type:"productssCreateFailure",
            payload:error.response.data.message
        })
  console.log(error);
  }
}