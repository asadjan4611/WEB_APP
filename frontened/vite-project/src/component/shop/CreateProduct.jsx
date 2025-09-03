import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { categoriesData } from "../../static/data";
import { createProduct } from "../../assets/redux/actions/product";
import { useEffect } from "react";
import { toast } from "react-toastify";
const CreateProduct = () => {
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.products);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [stock, setStock] = useState();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Product created Successfully");
       navigate("/dashboard");
       window.location.reload();
    }
  }, [dispatch, error, success]);

  const handleImageChange = (e) => {
    e.preventDefault();

    let files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleSubmitt = (e) => {
    e.preventDefault();

    const newForm = new FormData();
    images.forEach((image) => {
      newForm.append("images", image);
    });

    newForm.append("name", name);
    newForm.append("description", description);
    newForm.append("category", category);
    newForm.append("tags", tags);
    newForm.append("originalPrice", originalPrice);
    newForm.append("discountPrice", discountPrice);
    newForm.append("stock", stock);
    newForm.append("shopeId", seller._id);
    //  console.log(newForm)
    dispatch(createProduct(newForm));
   
  };

  return (
    <div className="w-[90%] md:w-[50%] shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-[600]">Create Product</h5>
      <form onSubmit={handleSubmitt}>
        <br />
        <div>
          <label className="pb-2">
            Name <span className="text-red-700">*</span>
          </label>
          <input
            type="text"
            id="name"
            required
            value={name}
            placeholder="Enter your product name..."
            className="mt-3 appearance-none block w-full px-3 py-2 sm:text-sm border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Description <span className="text-red-700">*</span>
          </label>
          <textarea
            type="text"
            cols="30"
            rows="8"
            id="description"
            required
            value={description}
            placeholder="Enter your product description..."
            className="mt-3 appearance-none block w-full pt-3 py-2 sm:text-sm border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            onChange={(e) => setDescription(e.target.value)}
          /><textarea/>
        </div>
        <br />

        <div>
          <label className=" pb-2">
            Category <span className="text-red-700">*</span>
          </label>
          <select
            value={category}
            className="w-full mt-2 h-[35px] rounded-[5px] "
            onChange={(e) => setCategory(e.target.value)}
            id="category"
          >
            <option value="Choose a category">Choose an Category</option>
            {categoriesData &&
              categoriesData.map((i) => (
                <option key={i.title} value={i.title}>
                  {i.title}
                </option>
              ))}
          </select>
        </div>

        <br />

        <div>
          <label className="pb-2">
            Tags <span className="text-red-700"></span>
          </label>
          <input
            type="text"
            id="tags"
            required
            value={tags}
            placeholder="Enter your product Tags..."
            className="mt-3 appearance-none block w-full px-3 py-2 sm:text-sm border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        <br />
        <div>
          <label className="pb-2">
            Original Price <span className="text-red-700"></span>
          </label>
          <input
            type="number"
            id="originalprice"
            required
            value={originalPrice}
            placeholder="Enter your product  original price..."
            className="mt-3 appearance-none block w-full px-3 py-2 sm:text-sm border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            onChange={(e) => setOriginalPrice(e.target.value)}
          />
        </div>

        <br />
        <div>
          <label className="pb-2">
            Discount Price <span className="text-red-700">*</span>
          </label>
          <input
            type="number"
            id="discountPrice"
            required
            value={discountPrice}
            placeholder="Enter your product discount price..."
            className="mt-3 appearance-none block w-full px-3 py-2 sm:text-sm border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            onChange={(e) => setDiscountPrice(e.target.value)}
          />
        </div>

        <br />
        <div>
          <label className="pb-2">
            Product Stock <span className="text-red-700">*</span>
          </label>
          <input
            type="text"
            id="stock"
            required
            value={stock}
            placeholder="Enter your product stock..."
            className="mt-3 appearance-none block w-full px-3 py-2 sm:text-sm border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            onChange={(e) => setStock(e.target.value)}
          />
        </div>

        <br />

        <div>
          <label className="pb-2">
            Uploads Images <span className="text-red-700">*</span>
          </label>
          <input
            type="file"
            id="upload"
            className="hidden"
            multiple
            onChange={handleImageChange}
          />
          <div className="flex flex-wrap items-center w-full ">
            <label htmlFor="upload">
              <AiOutlinePlusCircle
                size={25}
                className="mt-3 cursor-pointer"
                color="#555"
              />
            </label>
            {images &&
              images.map((i, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(i)}
                  className="h-[120px] w-[120px] rounded-[2px] m-2 object-cover"
                  alt=""
                />
              ))}
          </div>
          <br />
          <div>
            <input
              type="submit"
              className="mt-3 cursor-pointer appearance-none block w-full px-3 py-2 sm:text-sm border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              value="Create"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
