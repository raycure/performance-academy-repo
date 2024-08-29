import React, { useState } from "react";
import "./Events.css";
import CalendarContainer from "../../components/CalendarContainer/CalendarContainer";
import CardCarousel from "../../components/Carousels/CardCarousel";
import EventExpandedItem from "../../components/EventItem/EventExpandedItem";
import PaginationContainer from "../../components/Containers/PaginationContainer";
import CalendarEventItem from "../../components/CalendarContainer/CalendarEventItem";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Events() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <div className="event-page-poster-container bottom-space">
        <img
          src="/ornek.jpg"
          alt="events page hero"
          className="background-image"
        />
        <p className="text-container"></p>
      </div>
      <CalendarContainer />
      <PaginationContainer />
    </>
  );
}
export default Events;
