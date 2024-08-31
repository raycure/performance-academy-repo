import React from "react";
import "./Main.css";
import Container from "../../components/Containers/Container";
import isim from "/ornek.jpg";
import Card from "../../components/Cards/Card";
import { lesMillsPrograms } from "../../assets/LesmillsPrograms";
import Banner from "../../components/Banner/Banner";
import CardCarousel from "../../components/Carousels/CardCarousel";
import { motion } from "framer-motion";
import { downToUp } from "../../components/animations/AnimationValues.jsx";
import { button } from "../../components/animations/AnimationValues.jsx";

import { useState } from "react";

function Main() {
  const [classType, setClassType] = useState("all");

  const cards = Object.keys(lesMillsPrograms).map((category, index) => {
    const backContent = (
      <div key={index} className="card-inner-container">
        <img
          src={
            category === "GRUP FITNESS PROGRAMLARI"
              ? "/ornek.jpg"
              : category === "ÇOCUK VE GENÇ PROGRAMLARI"
              ? "/ornek.jpg"
              : "/ornek.jpg"
          }
          alt="events page hero"
          className="background-image opacity-low"
        />
        {lesMillsPrograms[category].map((program, subindex) => (
          <>
            <p key={subindex}>{program.title}</p>
            <hr />
            {program.subTitles &&
              program.subTitles.map((subtitle, subindex) => (
                <>
                  <p key={subindex + subindex}>{subtitle}</p>
                  <hr className="opacity-low" />
                </>
              ))}
          </>
        ))}
      </div>
    );
    const frontContent = (
      <div className="card-inner-container">
        <h2 className="fs-650">{category}</h2>
        <img
          src={
            category === "GRUP FITNESS PROGRAMLARI"
              ? "/ornek.jpg"
              : category === "ÇOCUK VE GENÇ PROGRAMLARI"
              ? "/ornek.jpg"
              : "/ornek.jpg"
          }
          alt="events page hero"
          className="background-image opacity-low"
        />
      </div>
    );
    return (
      <motion.div
        key={index}
        variants={downToUp}
        viewport={{ once: true }}
        custom={index}
      >
        <Card backContent={backContent} frontContent={frontContent} />
      </motion.div>
    );
  });

  return (
    <>
      {/* <Banner /> */}
      <Container className="even-columns">
        <div>
          {/* <div className="fs-primary-heading">Lesmills Nedir?</div> */}
          <div className="fs-primary-heading">Lesmills Eğitmeni Olun</div>
          <p>
            İnsanlara hayatlarını değiştirmeleri için ilham vermeye ve motive
            etmeye hazır mısınız? İster yıllardır Eğitmenlik yapıyor olun, ister
            yolculuğunuza yeni başlıyor olun, Les Mills Eğitmeni olarak başarılı
            bir kariyer için ihtiyacınız olan her şeyi size vereceğiz.
            Programlarımızdan herhangi birinde Eğitmen olarak eğitim alın -
            seçim sizin!
          </p>
          <p>
            Lesmills farklı tarzlarda Grup Fitness Programları yapan dünyaca
            ünlü bir Eğitim Firmasıdır. Lesmills Programları 130 ülkede çoşkulu
            bir şekilde yapılmaktadır. Bir çok Eğitmen bu programlardan ilham
            alıp kendilerini dünya standarlarında star bir Eğitmen haline
            getirmişlerdir. Eğitimlere katıldığınız ve Sertifikanızı aldığınız
            taktirde Dünyanın her ülkesinde geçerli olan bu sertifika ile ders
            verebilirsiniz. O zaman bu eğitimlere nasıl katılabilir ve bu
            Sertifikayı nasıl alabilirsiniz? Sorusunu genel olarak bir gözden
            geçirelim.
          </p>
        </div>
        <img src={isim} className="image"></img>
      </Container>

      <Container className="even-columns cardContent" style={{ gap: "0px" }}>
        {cards}
      </Container>
      <div className="carousel-container">
        <CardCarousel />
      </div>
      {/* <Container>
        <video width="100%" controls >
          <source src="path-to-your-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Container> */}

      <div className="btn-container center-item">
        {" "}
        <a href="#" className="btn-shine">
          LESMILLS
        </a>
      </div>

      {/* <RegisterForm /> */}
    </>
  );
}
export default Main;
