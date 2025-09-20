import React from "react";
import styles from "../../../style/style";
import { brandingData } from "../../../static/data";
import { categoriesData } from "../../../static/data";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigation = useNavigate();

  return (
    <>
      {/* --- Branding Section --- */}
      <div className={`${styles.section} sm:block`}>
        <div className="branding my-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full bg-white p-6 rounded-lg shadow-md">
          {brandingData &&
            brandingData.map((i, index) => (
              <div
                className="flex items-start gap-3 hover:translate-y-[-2px] transition"
                key={index}
              >
                <div className="text-indigo-600 text-3xl">{i.icon}</div>
                <div>
                  <h3 className="font-semibold text-base md:text-lg text-gray-800">
                    {i.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500">
                    {i.Description}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* --- Categories Section --- */}
      <div
        className={`${styles.section} bg-white shadow-md rounded-lg py-8 px-6 mb-12`}
        id="categories"
      >
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
          Shop by Categories
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {categoriesData &&
            categoriesData.map((i, index) => {
              const handleSubmitt = (i) => {
                navigation(`/product?categorie=${i.title}`);
              };
              return (
                <div
                  onClick={() => handleSubmitt(i)}
                  key={index}
                  className="cursor-pointer bg-gray-50 hover:bg-gray-100 rounded-lg shadow-sm border hover:shadow-md transition p-4 flex flex-col items-center text-center"
                >
                  <img
                    className="w-[100px] h-[100px] object-contain mb-3"
                    src={i.image_Url}
                    alt={i.title}
                  />
                  <h5 className="text-[16px] font-medium text-gray-700">
                    {i.title}
                  </h5>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Categories;
