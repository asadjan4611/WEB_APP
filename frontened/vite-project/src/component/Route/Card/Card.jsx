import React from "react";
import styles from "../../../style/style";
import  CountDown from "../CountDown/CountDown"
const Card = ({active,data}) => {
  // console.log(data)
  return (
    <>
      <div className={`w-full p-2 bg-white ${active? "unset":"mb-12"} block lg:flex`}>
        <div className="w-full lg:w-[50%] m-auto">
          <img
            src="https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg"
            alt=""
          />
        </div>
        <div className="w-full lg:w-[50%] flex flex-col justify-center ">
          <h2 className={`${styles.productTitle}`}>Iphone 14pro max </h2>
          <p className="text-[15px] mt-3 mr-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut aut qui
            dicta iusto quas, praesentium modi impedit quod, doloremque
            inventore a facere accusantium saepe quo, fuga rem autem veritatis
            deserunt. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Minima ipsa vel delectus culpa unde, consectetur quas asperiores
            officiis distinctio non voluptate vitae laborum impedit ducimus.
            Quis doloribus quod beatae qui? Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Nobis sunt doloremque perspiciatis
            incidunt quae tempore cupiditate, voluptatem, eius debitis
            asperiores tenetur ducimus placeat totam assumenda non repudiandae
            praesentium nihil nisi.
          </p>
          <div className="flex py-2 justify-between">
            <div className="flex">

            <h3 className="font-[500] text-[18px]  text-[#d55b45] pr-3 line-through">
              1090$
            </h3>

            <h4 className="font-bold text-[20px] text-[#333] ">
                999$
            </h4>
            </div>
            <span className="pr-3 font-[400] text-[17px]  text-[#44a55e]">120 sold</span>
          </div>
          <CountDown/>
        </div>
      </div>
    </>
  );
};

export default Card;
