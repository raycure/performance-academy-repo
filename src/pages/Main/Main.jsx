import React from "react";
import "./Main.css";
import Container from "../../components/Containers/Container";
import isim from "/ornek.jpg";
import Card from "../../components/Cards/Card";
import { lesMillsPrograms } from "../../assets/LesmillsPrograms";
import Banner from "../../components/Banner/Banner";
import CardCarousel from "../../components/Carousels/CardCarousel";
import RegisterForm from "../../components/Forms/RegisterForm";
import TestInput from "./TestInput.jsx";
import { motion } from "framer-motion";

function Main() {
  const emoji = "🎉";

  const cardVariants = {
    offscreen: {
      y: 100,
      opacity: 0,
    },
    onscreen: {
      y: 50,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 2,
      },
    },
  };

  const cards = Object.keys(lesMillsPrograms).map((category, index) => {
    const backContent = (
      <div key={index}>
        <h2>cat {category}</h2>
        {lesMillsPrograms[category].map((program, subindex) => (
          <p key={subindex}>{program.title}</p>
        ))}
      </div>
    );
    return <Card backContent={backContent} />;
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
          azicik sakin kal
        </a>
      </div>

      <div className="containerr">
        <motion.div
          className="containerr"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.8 }}
        >
          <motion.div className="divv" variants={cardVariants}>
            {emoji}
          </motion.div>
        </motion.div>
        <motion.div
          className="containerr"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.8 }}
        >
          <motion.div className="divv" variants={cardVariants}>
            {emoji}
          </motion.div>
        </motion.div>
        <motion.div
          className="containerr"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.8 }}
        >
          <motion.div className="divv" variants={cardVariants}>
            {emoji}
          </motion.div>
        </motion.div>
      </div>
      {/* <RegisterForm /> */}

      <TestInput></TestInput>
    </>
  );
}
export default Main;
