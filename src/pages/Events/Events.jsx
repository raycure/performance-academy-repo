import React, { useState } from "react";
import "./Events.css";
import CalendarContainer from "../../components/CalendarContainer/CalendarContainer";
import CardCarousel from "../../components/Carousels/CardCarousel";
import EventExpandedItem from "../../components/EventItem/EventExpandedItem";
import PaginationContainer from "../../components/Containers/PaginationContainer";
import CalendarEventItem from "../../components/CalendarContainer/CalendarEventItem";
import { delay, motion } from "framer-motion";

function Events() {
  const testArray = ["afsad", "deneme ", "deneme3"];
  const myvar = {
    hidden: {
      //   y: 100,
      opacity: 0,
      x: -100,
    },
    show: (index) => ({
      opacity: 1,
      //   y: 0,
      x: 0,
      transition: {
        duration: 1,
        delay: 0.5 * index,
      },
    }),
  };
  return (
    <>
      <div className="event-page-poster-container">
        <img
          src="/ornek.jpg"
          alt="events page hero"
          className="background-image"
        />
        <p className="text-container"></p>
      </div>
      <CalendarContainer />
      <PaginationContainer />
      {/* <div className="flex">
        <motion.div
          className="mycard"
          variants={myvar}
          viewport={{ once: true, amount: 0.2 }}
          initial="hidden"
          whileInView="visible"
        ></motion.div>
        <motion.div
          className="mycard"
          variants={myvar}
          viewport={{ once: true, amount: 0.2 }}
          initial="hidden"
          whileInView="visible"
        ></motion.div>
        <motion.div
          className="mycard"
          variants={myvar}
          viewport={{ once: true, amount: 0.2 }}
          initial="hidden"
          whileInView="visible"
        ></motion.div>
      </div> */}
      <motion.ul className="flex">
        {/* <motion.li variants={item} className="mycard" size={50} /> */}
        {testArray.map((skill, index) => (
          <motion.li
            key={index}
            variants={myvar}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={index}
            className="mycard"
          >
            {skill}
          </motion.li>
        ))}
      </motion.ul>
    </>
  );
}
export default Events;

// <div className="containerr">
//         <motion.div
//           className="containerr"
//           initial="offscreen"
//           whileInView="onscreen"
//           viewport={{ once: true, amount: 0.8 }}
//         >
//           <motion.div className="divv" variants={cardVariants}>
//             {emoji}
//           </motion.div>
//           <motion.div className="divv" variants={cardVariants}>
//             {emoji}
//           </motion.div>
//           <motion.div className="divv" variants={cardVariants}>
//             {emoji}
//           </motion.div>
//         </motion.div>
//       </div>

//   const emoji = "🎉";

//   const cardVariants = {
//     offscreen: {
//       y: 100,
//       opacity: 0,
//     },
//     onscreen: {
//       y: 50,
//       opacity: 1,
//       transition: {
//         type: "spring",
//         staggerChildren: 5,
//         bounce: 0.4,
//         duration: 2,
//       },
//     },
//   };

//offset start end ise ilki means when the start of the target meets the end of the container.
