
import axios from "axios"


///create products



export const createProduct =(newForm)=>async(dispatch)=>{
    console.log(newForm);
     try {
        dispatch({
            type:"productCreateRequest"
        })
        const config = {headers:{"Content-type":"multipart/form-data"}};
        const {data}= axios.post(`http://localhost:8000/api/product/create-product`,newForm,config);
        console.log("data  from backened is",data);
        dispatch({
            type:"productCreateSuccess",
            payload:data.product
        });
     } catch (error) {
        console.log(error);
        // dispatch({
        //     type:"productCreateFailure",
        //     payload:error.response.data?.message
        // })
     }
}



//get all products

export const getAllProduct = (id)=>async(dispatch)=>{
  try {
     dispatch({
       type: "getAllProductsRequest"
  });

  const {data} = await axios.get(`http://localhost:8000/api/product/get-all-products-shop/${id}`)
  } catch (error) {
    dispatch({
            type:"productCreateFailure",
            payload:error.response.data?.message
        })
  }
}