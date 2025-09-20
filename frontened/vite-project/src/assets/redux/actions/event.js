import axios from "axios";
import { backned_Url } from "../../../serverRoute";



//create event
export const createEvent =(newForm)=>async(dispatch)=>{
    // console.log(newForm);
     try {
        dispatch({
            type:"eventCreateRequest"
        })
        const config = {headers:{"Content-type":"multipart/form-data"}};
        const data= axios.post(`${backned_Url}/api/event/create-event`,newForm,config);
        // console.log("data  from backened is",data);
        dispatch({
            type:"eventCreateSuccess",
            payload:data.event
        });
     } catch (error) {
        console.log(error);
        dispatch({
            type:"eventCreateFailure",
            payload:error.response.data
        })
     }
}

//getALlEvents
export const getAllEvennts = (id)=>async(dispatch)=>{
  try {
     dispatch({
       type: "getAllEventRequest"
  });

  const {data} = await axios.get(`${backned_Url}/api/event/get-all-events-shop/${id}`);
  //  console.log(data);
  dispatch({
    type:"getAllEventsSuccess",
    payload:data.events
  });
  } catch (error) {
    dispatch({
            type:"getAllEventsFailure",
            payload:error.response.data,
        })
  console.log(error);
  }
}


// delete events

export const deleteEvent=(id) =>async(dispatch)=>{
  try {
     dispatch({
      type:"deleteEventRequest"
     });


     const {data} =await axios.delete(`${backned_Url}/api/event/delete-shop-event/${id}`);
      dispatch({
      type:"deleteEventSucessfully",
      payload:data.message
    })
  } catch (error) {
    console.log(error);
    dispatch({
      type:"deleteEventFailure",
      payload:error.response.data
    })
  }
}



// get all events of all shops

export const getAllShopsEvennts = (id)=>async(dispatch)=>{
  try {
     dispatch({
       type: "getAllShopEventRequest"
  });

  const {data} = await axios.get(`${backned_Url}/api/event/get-all-events-shop`);
  //  console.log(data);
  dispatch({
    type:"getAllShopEventsSuccess",
    payload:data.events
  });
  } catch (error) {
    dispatch({
            type:"getAllShopEventsFailure",
            payload:error.response.data,
        })
  console.log(error);
  }
}