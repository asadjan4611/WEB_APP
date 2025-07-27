import React, { useState } from "react";
import { productsData } from "../../static/data";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filterData =
      productsData &&
      productsData.filter((filters) =>
        filters.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filterData);
  };

   return (
    
    <div className=" 800px:h-[80px] 800px:my-[20px] relative flex justify-between items-center">
      {/* Logo */}
      <div>
        <Link to={"/"}>
          <img
          className="h-[60px] rounded-lg"
            src="https://images.unsplash.com/photo-1626002860244-0907b3be82ff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2hvcHN8ZW58MHx8MHx8fDA%3D"
            alt="Logo"
          />
        </Link>
      </div>

      {/* Search bar */}
      <div className="w-50% ">
        <input
          type="text"
          placeholder="Search Product...... "
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full h-[40px] px-2 border-[2px] rounded-md"
        />
          <AiOutlineSearch size={35} className="p-2 w-full cursor-pointer absolute" />

        {/* Search Results Dropdown */}
        {searchData && searchData.length !== 0 && (
          <div className="absolute min-h-[40vh] bg-slate-50 shadow-sm z-[9] p-4">
            {searchData.map((i, index) => {
              const d = i.name;
              const product_name = d.replace(/\s+/g, "-");
              return (
                <Link to={`/products/${product_name}`} key={index}>
                  <div className="w-full flex items-start py-3">
                    <img
                      src={i.image_Url[0].url}
                      alt=""
                      className="h-[40px] w-[40px] mr-10"
                    />
                    <h1>{i.name}</h1>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
