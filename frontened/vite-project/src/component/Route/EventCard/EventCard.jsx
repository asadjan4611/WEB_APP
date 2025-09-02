import React from "react";
import styles from "../../../style/style";
import Card from "../ProductCard/Card";
import { useSelector } from "react-redux";
const EventCard = () => {
  const { allevents } = useSelector((state) => state.events);
  // console.log(allevents[0]);
  return (
    <div>
      <div className={`${styles.section} mt-5`}>
        <div className={`${styles.heading}`}>
          <h1>Popular Events</h1>
          <Card  data ={allevents && allevents[0]}/>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
