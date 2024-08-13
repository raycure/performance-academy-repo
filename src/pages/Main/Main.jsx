import React from "react";
import "./Main.css";
import Container from "../../components/Containers/Container";
import isim from "../../assets/ornek.jpg";
import Card from "../../components/Cards/Card";
function Main() {
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
      {/* write the content first
       */}

       
      <Container className="banner" > 
      <div className="fs-secondary-heading">DÜNYANIN EN İYİ ANTRENMANLARINI OLUŞTURUYORUZ.</div>
      <div>140.000 eğitmenden oluşan ekibimizi, kendi büyüklüklerini keşfederken ve diğerlerine ellerinden gelenin en iyisi olmaları için ilham verirken destekliyoruz.</div>

<div>fdaga</div>
<div>fdaga</div>

      </Container>
      <Container className="even-columns">
        <Card></Card>
        <Card></Card>
        <Card></Card>
      </Container>

      <Container>
        <video width="100%" controls>
          <source src="path-to-your-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Container>
    </>
  );
}
export default Main;
