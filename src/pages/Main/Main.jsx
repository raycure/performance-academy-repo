import React from "react";
import "./Main.css";
import Container from "../../components/Containers/Container";
import isim from "../../assets/ornek.jpg";
import Card from "../../components/Cards/Card";
import { lesMillsPrograms } from "../../assets/LesmillsPrograms";
function Main() {
  
const cards = lesMillsPrograms.map((category, index) => {
  const backContent = (
    <div key={index}>
      <h2>cat {category[0]}</h2>
      {category.slice(1).map((program, subIndex) => (
        <p key={subIndex}>{program}</p>
      ))}
    </div>
  );
  return <Card key={index} backContent={backContent}/>;
});

  return (
    <>
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


      <div className="banner">
        <div className="fs-secondary-heading center-item">
          DÜNYANIN EN İYİ ANTRENMANLARINI OLUŞTURUYORUZ.
        </div>
        <div className="space-between">
          <div>
            140.000 eğitmenden oluşan ekibimizi, kendi büyüklüklerini
            keşfederken ve diğerlerine ellerinden gelenin en iyisi olmaları için
            ilham verirken destekliyoruz.
          </div>
          <div>
            Dünya çapında 20.000 kulüple ortaklık yaparak, dünya lideri grup
            fitness'ı sunmayı kolaylaştırıyoruz ve üyelerin fitness'a aşık
            olmasına yardımcı oluyoruz.
          </div>
          <div>
            Dünyanın en iyi müziği, en iyi hareketleri ve en iyi eğitmenleri.
            Bilim tarafından şekillendirilen, yaşamı değiştiren fitness
            deneyimini oluşturmak için hepsini bir araya getiriyoruz.
          </div>
        </div>
      </div>

      <Container className="even-columns cardContent">
        {cards}
      </Container>

      {/* <Container>
        <video width="100%" controls >
          <source src="path-to-your-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Container> */}

      <>
      <div class="buttons">
  <button class="btn">
    Default
  </button>
  <button class="btn btn-primary">
    Primary
  </button>
  <button class="btn btn-secondary">
    Secondary
  </button>
  <button class="btn btn-success">
    Success
  </button>
  <button class="btn btn-info">
    Info
  </button>
  <button class="btn btn-warning">
    Warning
  </button>
  <button class="btn btn-danger">
    Danger
  </button>
  <button class="btn btn-primary btn-round">
    Round
  </button>
  <button class="btn btn-primary btn-circle">
    <i class="search-icon"></i>
  </button>
  <button class="btn btn-primary disabled">
    Disabled
  </button>
  <button class="btn btn-primary loading">Loading</button>
  <button class="btn btn-primary btn-ghost">Ghost</button>
  <button class="btn btn-primary">
    <div class="inline-flex items-center space-x-2">
      <i class="plus-icon"></i>
      <div>Icon</div>
    </div>
  </button>
  <button class="btn btn-primary btn-dashed">Dashed</button>
  <button class="btn btn-primary btn-link">Link</button>
  <button class="btn btn-primary btn-jittery">
    Click Me
  </button>
  <button class="btn btn-primary btn-jelly">
    Jelly
  </button>
  <button class="btn btn-primary btn-ghost btn-fill">
    Fill In
  </button>
  <button class="btn btn-primary btn-pulse">
    Pulse
  </button>
  <button class="btn btn-primary btn-ghost btn-open">
    Open
  </button>
  <button class="btn btn-primary btn-ghost btn-close">
    Close
  </button>
  <button class="btn btn-primary btn-ghost btn-slash">
    Slash
  </button>
  <button class="btn btn-primary btn-ghost btn-fill-up">
    Fill Up
  </button>
  <button class="btn btn-primary btn-ghost btn-slide">
    Slide
  </button>
  <button class="btn btn-primary btn-ghost btn-through">
    Through
  </button>
  <button class="btn btn-primary btn-ghost btn-offset">
    Offset
  </button>
  <button class="btn btn-primary btn-ghost btn-flip-down">
    Flip Down
    <div class="front">Flip Down</div>
    <div class="back">Flip Down</div>
  </button>
  <button class="btn btn-primary btn-round btn-marquee">
    <span data-text="Marquee">Marquee</span>
  </button>
  <button class="btn btn-primary btn-ghost btn-cross">
    Cross Bar
  </button>
  <button class="btn btn-primary btn-ghost btn-open-line">
    Line
  </button>
</div>
      </>
    </>

  );
}
export default Main;
