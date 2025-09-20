import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { backned_Url } from "../../serverRoute";
import { AiOutlineCamera } from "react-icons/ai";
import styles from "../../style/style";
import axios from "axios";
import { toast } from "react-toastify";
import { loadSeller } from "../../assets/redux/actions/user";

const ShopSetting = () => {
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const [name, setName] = useState(seller?.name || "");
  const [description, setDescription] = useState(seller?.description || "");
  const [address, setAddress] = useState(seller?.address || "");
  const [phoneNumber, setPhoneNumber] = useState(seller?.phoneNumber || "");
  const [zipCode, setZipcode] = useState(seller?.zipCode || "");
  const [avavtar, setAvatar] = useState(null);
  const handleImage = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setAvatar(file);

    const formData = new FormData();
    formData.append("image", file);
    await axios
      .put(`${backned_Url}/api/shop/update-seller-avatar`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },

        withCredentials: true,
      })
      .then((res) => {
        toast.success("Image Upadte sucessfully");
        dispatch(loadSeller());
      })
      .catch((err) => {
        toast.error(err.response?.data?.message);
      });
  };

  const updateHandler = async (e) => {
    e.preventDefault();
    await axios
      .put(
        `${backned_Url}/api/shop/updateSellerInfo`,
        {
          name,
          address,
          zipCode,
          phoneNumber,
          description,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Shop info updated succesfully!");
        dispatch(loadSeller());
      })
      .catch((error) => {
        toast.error(error.response?.data?.message);
      });
  };

  return (
    <div className="w-full min-h-screen">
      <div className="flex w-full md:w-[80%] flex-col justify-center">
        <div className="w-full flex items-center justify-center ">
          <div className="relative">
            <img
              className="w-[200px] h-[200px] cursor-pointer relative rounded-full object-fit"
              src={
                avavtar
                  ? URL.createObjectURL(avavtar)
                  : `${seller?.avatar.url}`
              }
              alt=""
            />
            <div className="w-[30px] h-[30px] bg-[#e3e9ee] rounded-full flex items-center cursor-pointer justify-center absolute bottom-[5px] right-[20px]">
              <input
                type="file"
                id="image"
                className="hidden"
                onChange={handleImage}
              />
              <label className="cursor-pointer" htmlFor="image">
                <AiOutlineCamera />
              </label>
            </div>
          </div>
        </div>

        {/* shop info */}

        <form
          aria-required={true}
          className="flex flex-col w-[55%] md:w-full ml-12  items-center"
          onSubmit={updateHandler}
        >
          <div className="w-[100%] flex items-center flex-col md:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop Name</label>
            </div>
            <input
              type="name"
              placeholder={`${seller.name}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
          </div>
          <div className="w-[100%] flex items-center flex-col md:w-[50%] mt-2">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop description</label>
            </div>
            <input
              type="name"
              placeholder={`${
                seller?.description
                  ? seller.description
                  : "Enter your shop description"
              }`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
            />
          </div>
          <div className="w-[100%] flex items-center flex-col md:w-[50%] mt-2">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop Address</label>
            </div>
            <input
              type="name"
              placeholder={seller?.address}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
          </div>

          <div className="w-[100%] flex items-center flex-col md:w-[50%] mt-2">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop Phone Number</label>
            </div>
            <input
              type="number"
              placeholder={seller?.phoneNumber}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
          </div>

          <div className="w-[100%] flex items-center flex-col md:w-[50%] mt-2">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop Zip Code</label>
            </div>
            <input
              type="number"
              placeholder={seller?.zipCode}
              value={zipCode}
              onChange={(e) => setZipcode(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
          </div>

          <div className="w-[100%] flex items-center flex-col md:w-[50%] mt-2">
            <input
              type="submit"
              value="Update Shop"
              color="#00FF00"
              className={`${styles.input} !w-[95%]  cursor-pointer mb-4 md:mb-0`}
              required
              readOnly
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShopSetting;
