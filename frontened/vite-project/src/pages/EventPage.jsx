import React from "react";
import { BiHeading } from "react-icons/bi";
import Header from "../component/layout/Header";
import styles from "../style/style";
import Card from "../component/Route/Card/Cards";
import Loader from "../component/layout/loader";
import { useSelector } from "react-redux";

const EventPage = () => {
  const { allevents, isLoading } = useSelector((state) => state.events);
  // console.log(allevents);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={4} />
          {allevents &&
            allevents.map((i, index) => (
               <Card key={index} active={true} data={i} />
            ))}

          <div className={`${styles.section}`}></div>
        </div>
      )}
    </>
  );
};

export default EventPage;
