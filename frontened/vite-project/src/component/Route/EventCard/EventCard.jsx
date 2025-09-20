import React from "react";
import styles from "../../../style/style";
import Card from "../ProductCard/Card";
import { useSelector } from "react-redux";
import { Sparkles } from "lucide-react"; // icon library
import { Link } from "react-router-dom";

const EventCard = () => {
  const { allevents } = useSelector((state) => state.events);

  return (
    <div className={`${styles.section} mt-10`}>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Sparkles className="text-yellow-500 w-6 h-6" />
          <h1 className="text-2xl font-bold text-gray-800">Popular Events</h1>
        </div>

        <Link to={"/events"}>
        
        <span className="text-sm text-gray-500 cursor-pointer hover:text-indigo-600 transition">
          View All →
        </span></Link>
      </div>

      {/* Event Card */}
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-4">
        {allevents && allevents[0] ? (
          <Card data={allevents[0]} active={true} />
        ) : (
          <p className="text-gray-500 text-center py-10">
            No events available right now.
          </p>
        )}
      </div>
    </div>
  );
};

export default EventCard;
