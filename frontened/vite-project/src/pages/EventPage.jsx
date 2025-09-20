import React from "react";
import { CalendarDays } from "lucide-react"; // modern icon for events
import Header from "../component/layout/Header";
import styles from "../style/style";
import Card from "../component/Route/Card/Cards";
import Loader from "../component/layout/loader";
import { useSelector } from "react-redux";

const EventPage = () => {
  const { allevents, isLoading } = useSelector((state) => state.events);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={4} />

          <div className={`${styles.section}`}>
            {/* Heading with icon */}
            <div className="flex items-center justify-center mb-8">
              <CalendarDays className="text-blue-600 w-8 h-8 mr-3" />
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Upcoming Events
              </h1>
            </div>

            {/* Event grid */}
            
              {allevents && allevents.length > 0 ? (
                allevents.map((i, index) => (
                  <div
                    key={index}
                    className="transform transition duration-300 hover:scale-105"
                  >
                    <Card active={true} data={i} />
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <p className="text-gray-500 text-lg">
                    🚫 No events available at the moment.
                  </p>
                </div>
              )}
            </div>

        </div>
      )}
    </>
  );
};

export default EventPage;
