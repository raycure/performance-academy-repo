import React, { useEffect, useRef, useState } from "react";
import "./ClassList.css";
import Button from "../Button/Button";
import { lesMillsPrograms } from "../../assets/LesmillsPrograms";
import { MdOutlineDoubleArrow } from "react-icons/md";
import name from "/ornek.jpg";
import { Link, redirect } from "react-router-dom";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { leftToRightForClasses } from "../animations/AnimationValues.jsx";
import { accordion } from "../animations/AnimationValues.jsx";

function ClassList({ classType }) {
  const elementRef = useRef(null);
  const controls = useAnimation();

  const handleScroll = () => {
    if (elementRef.current) {
      window.scrollTo({
        top: elementRef.current.offsetTop,
        behavior: "smooth",
      });
    }
  };
  const [activeClass, setActiveClass] = useState(null);

  function classClickHandler(id) {
    setActiveClass(id);

    // boyut degistikten sonra calisiyor cunku classclickhandler boyut degistiriyo
    requestAnimationFrame(() => {
      const element = document.getElementById(id);
      if (element) {
        const elementRect = element.getBoundingClientRect(); //uzaklık ve uzunluklari obje halinde donduruyor
        const elementTop = elementRect.top + window.scrollY; //pageYOffset deprecated scrollY kullan
        const elementHeight = element.scrollHeight;
        element.style.height = elementHeight;
        const header = document.querySelector(".nav-container"); //i guess this has to be the way cunku oburleri olmadı
        const headerHeight = header ? header.offsetHeight : 0; //0 default bulamazsa diye
        const middle =
          elementTop -
          window.innerHeight / 2 +
          elementHeight / 2 -
          headerHeight / 2;
        window.scrollTo({
          top: elementTop - headerHeight, // Subtract the header height if there is one
          behavior: "smooth",
        });
      }
    });
  }

  const classes = Object.keys(lesMillsPrograms).map((category) => {
    // if (category !== classType && classType !== "all") {
    //   return;
    // }

    return lesMillsPrograms[category].map((program, subIndex) => {
      const isActive = activeClass === program.id;
      return (
        <motion.div
          variants={leftToRightForClasses}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          custom={subIndex}
        >
          <div
            key={subIndex}
            className="class-item-container text-container top-border-light"
            id={program.id}
          >
            <img
              aria-label="program pic"
              className="img class-img"
              src={name}
            />
            <div>
              <img
                aria-label="logo"
                className="img class-logo"
                src={program.logo}
              />
              <p className="slogan">{program.sum}</p>

              <AnimatePresence>
                {isActive && (
                  <motion.div
                    variants={accordion}
                    initial="hidden"
                    animate="animate"
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <p>{program.description}</p>
                    <p>{program.whyMember}</p>
                    <p>{program.whyYou}</p>
                    <Link
                      onClick={() => {
                        setActiveClass(null);
                      }}
                    >
                      Daha az göster
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="more-button-container top-border-light">
              <div>
                <p>Egzersiz Tipi: {program.type}</p>
                <p>Ekipman: {program.equipment}</p>
                <p>Kime Yönelik: {program.for}</p>
              </div>
              <Button onClick={() => classClickHandler(program.id)}>
                {!isActive ? "Daha Fazlası" : "Programa Katılın"}
                <MdOutlineDoubleArrow color="white" />
              </Button>
            </div>
            <div className="background-image class-background-shape"></div>
          </div>
        </motion.div>
      );
    });
  });
  return (
    <>
      {classes}

      <div style={{ backgroundColor: "red", width: 300, height: 300 }}>
        <motion.div
          ref={elementRef}
          initial={{ opacity: 0 }}
          animate={controls}
          transition={{ duration: 0.5 }}
        >
          <h1>Scroll to me!</h1>
        </motion.div>
        <button onClick={handleScroll}>Scroll to Top</button>
      </div>
    </>
  );
}
export default ClassList;
