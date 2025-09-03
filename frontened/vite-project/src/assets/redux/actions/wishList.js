

// add to wishList

export const addToWishList = (data)=>async(dispatch,getState)=>{
    dispatch({
        type:"addToWishList",
        payload:data,
    })

    localStorage.setItem("wishList",JSON.stringify(getState().wishList.wishList));
    return data;
}


///remove from wishList

export const removeFromWishList = (data)=>async(dispatch,getState)=>{
    dispatch({
        type:"removeFromWishList",
        payload:data,
    })

    localStorage.setItem("wishList",JSON.stringify(getState().wishList.wishList));
    return data;
}